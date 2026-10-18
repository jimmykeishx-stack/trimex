-- Run this in the Supabase SQL Editor after supabase/schema.sql.
-- It creates the production catalogue, public product image delivery, and admin-only writes.

create table if not exists public.products (
  id uuid primary key default gen_random_uuid(),
  name text not null check (char_length(name) between 2 and 140),
  slug text not null unique check (slug ~ '^[a-z0-9]+(?:-[a-z0-9]+)*$'),
  category text not null check (char_length(category) between 2 and 100),
  brand text,
  unit text not null check (char_length(unit) between 1 and 60),
  price numeric(12,2) not null check (price >= 0),
  image_url text,
  description text,
  applicable_crop text,
  availability text not null default 'AVAILABLE' check (availability in ('AVAILABLE', 'LOW_STOCK', 'UNAVAILABLE')),
  featured boolean not null default false,
  is_active boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists products_active_featured_idx on public.products (is_active, featured, created_at desc);
create index if not exists products_category_idx on public.products (category);

create or replace function public.is_admin()
returns boolean
language sql
stable
security definer
set search_path = public
as $$ select exists (select 1 from public.profiles where id = auth.uid() and role = 'ADMIN') $$;

alter table public.products enable row level security;

create policy "Anyone can view active products" on public.products
for select using (is_active = true or public.is_admin());

create policy "Admins can create products" on public.products
for insert with check (public.is_admin());

create policy "Admins can update products" on public.products
for update using (public.is_admin()) with check (public.is_admin());

create policy "Admins can delete products" on public.products
for delete using (public.is_admin());

insert into storage.buckets (id, name, public)
values ('product-images', 'product-images', true)
on conflict (id) do update set public = true;

create policy "Public can view product images" on storage.objects
for select using (bucket_id = 'product-images');

create policy "Admins can upload product images" on storage.objects
for insert with check (bucket_id = 'product-images' and public.is_admin());

create policy "Admins can update product images" on storage.objects
for update using (bucket_id = 'product-images' and public.is_admin()) with check (bucket_id = 'product-images' and public.is_admin());

create policy "Admins can delete product images" on storage.objects
for delete using (bucket_id = 'product-images' and public.is_admin());
