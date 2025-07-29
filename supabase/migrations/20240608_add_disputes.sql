create table disputes (
  id uuid primary key default gen_random_uuid(),
  project_id uuid references projects(id) not null,
  raised_by uuid references users(id) not null,
  against uuid references users(id) not null,
  type text check (type in ('payment', 'audit', 'other')) not null,
  description text not null,
  status text check (status in ('open', 'in_review', 'resolved', 'rejected')) not null default 'open',
  resolution_notes text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
); 