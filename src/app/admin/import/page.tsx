"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabase";

type Row = Record<string, string>;
type Item = { row: Row; name: string; slug: string; reasons: string[] };

function parseCsv(text: string): Row[] {
  const rows: string[][] = []; let fields: string[] = [], value = "", quoted = false;
  for (let i = 0; i < text.length; i++) {
    const char = text[i];
    if (quoted && char === '"' && text[i + 1] === '"') { value += '"'; i++; }
    else if (char === '"') quoted = !quoted;
    else if (!quoted && char === ',') { fields.push(value); value = ''; }
    else if (!quoted && (char === '\n' || char === '\r')) { if (char === '\r' && text[i + 1] === '\n') i++; fields.push(value); if (fields.some(Boolean)) rows.push(fields); fields = []; value = ''; }
    else value += char;
  }
  if (quoted) throw new Error('The CSV has an unclosed quoted field.');
  if (value || fields.length) { fields.push(value); rows.push(fields); }
  const headers = (rows.shift() ?? []).map((header) => header.replace(/^\uFEFF/, ''));
  return rows.map((values) => Object.fromEntries(headers.map((header, i) => [header, values[i] ?? ''])));
}
const normalize = (value: string) => value.trim().toLowerCase().replace(/[^a-z0-9]+/g, ' ').trim();

export default function ImportPage() {
  const [file, setFile] = useState<File | null>(null);
  const [images, setImages] = useState<File[]>([]);
  const [items, setItems] = useState<Item[]>([]);
  const [message, setMessage] = useState('Select the reviewed CSV and, optionally, its product images.');
  const [busy, setBusy] = useState(false);
  const [previewed, setPreviewed] = useState(false);

  async function preview() {
    if (!file) return;
    setBusy(true); setPreviewed(false);
    try {
      const { data: { user }, error: authError } = await supabase.auth.getUser();
      if (authError || !user) throw new Error('Sign in with your administrator account first.');
      const { data: profile, error: roleError } = await supabase.from('profiles').select('role').eq('id', user.id).single();
      if (roleError || profile?.role !== 'ADMIN') throw new Error('Administrator access is required.');
      const existing: { name: string; slug: string }[] = [];
      for (let start = 0; ; start += 1000) {
        const { data, error } = await supabase.from('products').select('name,slug').range(start, start + 999);
        if (error) throw error;
        existing.push(...data); if (data.length < 1000) break;
      }
      const names = new Set(existing.map((item) => normalize(item.name)));
      const slugs = new Set(existing.map((item) => item.slug));
      const rows = parseCsv(await file.text());
      const next = rows.map((row) => {
        const name = (row.name ?? '').trim(); const slug = normalize(name).replace(/ /g, '-'); const reasons: string[] = [];
        if (row.approved?.trim().toLowerCase() !== 'yes') reasons.push('Not approved');
        if (!name || !slug || name.length > 140) reasons.push('Invalid name');
        if (!row.trimex_category?.trim()) reasons.push('Category missing');
        if (!row.pack_hint?.trim()) reasons.push('Pack size missing');
        if (!row.proposed_trimex_price?.trim() || !Number.isFinite(Number(row.proposed_trimex_price)) || Number(row.proposed_trimex_price) < 0) reasons.push('Final price missing');
        if (row.regulated_review?.toLowerCase() === 'true' && row.regulatory_approved?.trim().toLowerCase() !== 'yes') reasons.push('Regulatory review required');
        if (names.has(normalize(name)) || slugs.has(slug)) reasons.push('Possible duplicate');
        if (row.image_file && !images.some((image) => image.name === row.image_file.split(/[\\/]/).pop())) reasons.push('Image not selected');
        if (!reasons.length) { names.add(normalize(name)); slugs.add(slug); }
        return { row, name, slug, reasons };
      });
      setItems(next); setPreviewed(true); setMessage(`Preview complete: ${next.filter((item) => !item.reasons.length).length} ready; ${next.filter((item) => item.reasons.length).length} need review.`);
    } catch (error) { setMessage(error instanceof Error ? error.message : 'Preview failed.'); }
    setBusy(false);
  }

  async function importReady() {
    setBusy(true); let created = 0, failed = 0;
    for (const item of items.filter((entry) => !entry.reasons.length)) {
      // Re-check just before writing; the unique slug constraint is the final race safeguard.
      const { data: existing, error: checkError } = await supabase.from('products').select('id').eq('slug', item.slug).limit(1);
      if (checkError || existing.length) { failed++; continue; }
      let imageUrl: string | null = null;
      const image = images.find((candidate) => candidate.name === item.row.image_file?.split(/[\\/]/).pop());
      if (image) {
        if (!['image/jpeg', 'image/png', 'image/webp'].includes(image.type) || image.size > 5 * 1024 * 1024) { failed++; continue; }
        const objectPath = `catalogue-import/${crypto.randomUUID()}-${image.name.replace(/[^a-zA-Z0-9.-]/g, '-')}`;
        const { error } = await supabase.storage.from('product-images').upload(objectPath, image, { contentType: image.type, upsert: false });
        if (error) { failed++; continue; }
        imageUrl = supabase.storage.from('product-images').getPublicUrl(objectPath).data.publicUrl;
      }
      const { error } = await supabase.from('products').insert({ name: item.name, slug: item.slug, category: item.row.trimex_category, unit: item.row.pack_hint, price: Number(item.row.proposed_trimex_price), image_url: imageUrl, availability: 'UNAVAILABLE', is_active: false, featured: false, description: `Source: ${item.row.source_url}. Imported for review.` });
      if (error) failed++; else created++;
    }
    setPreviewed(false); setMessage(`${created} products saved as hidden; ${failed} skipped or failed. Run the preview again before retrying.`); setBusy(false);
  }

  return <main className="adminProducts"><nav className="shopNav"><a className="brand" href="/">TRIMEX <small>INC.</small></a><a href="/admin/products">Product manager</a></nav><header><p className="eyebrow">Catalogue administration</p><h1>Import products</h1><p>Review a batch, then save approved products as hidden for final checks.</p></header><section className="adminProductLayout"><div className="productForm"><label>Reviewed CSV<input type="file" accept=".csv,text/csv" onChange={(event) => { setFile(event.target.files?.[0] ?? null); setPreviewed(false); }} /></label><label>Product images<input type="file" accept="image/jpeg,image/png,image/webp" multiple onChange={(event) => { setImages(Array.from(event.target.files ?? [])); setPreviewed(false); }} /></label><p>CSV rows need approved=yes, a final price and pack size. Regulated rows also need regulatory_approved=yes. Existing products are never overwritten.</p><p aria-live="polite">{message}</p><div className="adminActions"><button className="button dark" disabled={!file || busy} onClick={preview}>Preview batch</button><button className="button lime" disabled={!previewed || busy || !items.some((item) => !item.reasons.length)} onClick={importReady}>Save ready products as hidden</button></div></div><div className="adminProductList"><p className="eyebrow">Review results</p>{items.slice(0, 100).map((item, index) => <article key={`${item.slug}-${index}`}><div><b>{item.name || 'Unnamed product'}</b><span>{item.reasons.length ? item.reasons.join(' · ') : 'Ready to save as hidden'}</span></div></article>)}{items.length > 100 && <p>Showing the first 100 of {items.length} rows.</p>}</div></section></main>;
}
