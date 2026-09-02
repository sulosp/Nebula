-- Run this in the Supabase SQL editor once.

create table if not exists public.clients (
  id uuid primary key default gen_random_uuid(),
  clerk_user_id text not null unique,
  name text not null default 'Support',
  color text not null default '#9184d9',
  public_key text not null unique,
  stripe_customer_id text,
  stripe_subscription_id text,
  subscription_status text not null default 'inactive',
  created_at timestamptz not null default now()
);

create table if not exists public.faq_entries (
  id uuid primary key default gen_random_uuid(),
  client_id uuid not null references public.clients(id) on delete cascade,
  question text not null,
  answer text not null,
  created_at timestamptz not null default now()
);

create index if not exists faq_entries_client_id_idx on public.faq_entries (client_id);

alter table public.clients enable row level security;
alter table public.faq_entries enable row level security;

-- No anon/authenticated policies: the Next.js server uses the service role key.
