-- Stringline site tables. Paste into the Supabase SQL editor and run once.
-- Row level security is on with no policies, so only the server (secret key) can read or write.

create table if not exists public.applications (
  id uuid primary key,
  submitted_at timestamptz not null default now(),
  source text not null default 'website',
  name text not null,
  role text not null,
  email text not null,
  phone text,
  company text not null,
  city text,
  state text not null,
  crew_size text,
  services text[] not null default '{}',
  project_size text,
  leads_per_month text not null,
  lead_sources text[] not null default '{}',
  who_answers text,
  what_slips text[] not null default '{}',
  problem text,
  status text not null default 'new',
  notes text
);

create index if not exists applications_submitted_at_idx on public.applications (submitted_at desc);

create table if not exists public.contact_messages (
  id uuid primary key,
  received_at timestamptz not null default now(),
  name text not null,
  email text not null,
  phone text,
  company text,
  message text not null
);

alter table public.applications enable row level security;
alter table public.contact_messages enable row level security;
