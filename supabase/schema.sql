create type public.user_role as enum ('FARMER', 'AGENT', 'SUPPLIER', 'BUYER', 'ADMIN', 'EDITOR');

create table public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  full_name text not null,
  phone text,
  role public.user_role not null default 'FARMER',
  location text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

alter table public.profiles enable row level security;

create policy "Profiles are visible to their owners"
on public.profiles for select
using (auth.uid() = id);

create policy "Profiles can be created by their owners"
on public.profiles for insert
with check (auth.uid() = id);

create policy "Profiles can be updated by their owners"
on public.profiles for update
using (auth.uid() = id);

create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer set search_path = ''
as $$
begin
  insert into public.profiles (id, full_name, phone, role, location)
  values (
    new.id,
    coalesce(new.raw_user_meta_data ->> 'full_name', ''),
    new.raw_user_meta_data ->> 'phone',
    coalesce((new.raw_user_meta_data ->> 'role')::public.user_role, 'FARMER'),
    new.raw_user_meta_data ->> 'location'
  );
  return new;
end;
$$;

create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();
