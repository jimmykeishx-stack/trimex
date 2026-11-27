import { notFound } from "next/navigation";
import { createClient } from "@supabase/supabase-js";
import { MarketplaceProductCard } from "@/components/marketplace-product-card";
import { demoCategories } from "@/lib/mock-data";

export const dynamic = "force-dynamic";

export function generateStaticParams() { return demoCategories.map((category) => ({ category: category.slug })); }

export default async function CategoryPage({ params }: { params: Promise<{ category: string }> }) {
  const { category: slug } = await params;
  const category = demoCategories.find((item) => item.slug === slug);
  if (!category) notFound();
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY;
  if (!url || !key) throw new Error("Marketplace configuration is unavailable.");
  const client = createClient(url, key, { auth: { persistSession: false } });
  const { data, error } = await client.from("products").select("id,name,category,unit,price,image_url,availability").eq("is_active", true).eq("category", category.name).order("name");
  if (error) throw new Error("Unable to load this category. Please try again later.");
  const products = (data ?? []).map((product) => ({ id: product.id, name: product.name, category: product.category, unit: product.unit, price: Number(product.price), image: product.image_url || "/white-maize.png", viewHref: "/marketplace", availability: product.availability as "AVAILABLE" | "LOW_STOCK" | "UNAVAILABLE" }));

  return <main className="categoryPage"><nav className="shopNav"><a className="brand" href="/">TRIMEX <small>INC.</small></a><div><a href="/marketplace">Marketplace</a><a href="/about">About Us</a><a href="/auth">Account</a></div><a className="cart" href="/marketplace">Cart (0)</a></nav><header><p>Marketplace / {category.name}</p><h1>{category.name}</h1><span>Browse products available through the Trimex network.</span><form action="/marketplace"><input name="search" placeholder={`Search ${category.name.toLowerCase()}...`} /><button>Search</button></form></header><section><div className="categoryToolbar"><strong>{products.length} products</strong><a href="/marketplace">All products ↗</a></div>{products.length ? <div className="productGrid">{products.map((product) => <MarketplaceProductCard key={product.id} product={product} />)}</div> : <div className="catalogueState"><strong>No products available yet</strong><p>We are adding verified products to this category. Browse the full marketplace in the meantime.</p><a className="productButton primary" href="/marketplace">Browse marketplace</a></div>}</section></main>;
}
