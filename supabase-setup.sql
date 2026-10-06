-- Run this whole file once in Supabase > SQL Editor.
create extension if not exists pgcrypto;

create table if not exists public.games (
  id uuid primary key default gen_random_uuid(),
  room_code text not null,
  host_name text not null,
  status text not null default 'lobby',
  round integer not null default 1,
  question_index integer,
  deadline timestamptz,
  created_at timestamptz not null default now()
);

create table if not exists public.players (
  id uuid primary key default gen_random_uuid(),
  game_id uuid not null references public.games(id) on delete cascade,
  name text not null,
  is_host boolean not null default false,
  score integer not null default 0,
  created_at timestamptz not null default now()
);

create table if not exists public.answers (
  id uuid primary key default gen_random_uuid(),
  game_id uuid not null references public.games(id) on delete cascade,
  round integer not null,
  player_id uuid not null references public.players(id) on delete cascade,
  answer_text text not null,
  matched_points integer not null default 0,
  scored boolean not null default false,
  created_at timestamptz not null default now(),
  unique(game_id, round, player_id)
);

alter table public.games enable row level security;
alter table public.players enable row level security;
alter table public.answers enable row level security;

drop policy if exists "game demo access" on public.games;
drop policy if exists "player demo access" on public.players;
drop policy if exists "answer demo access" on public.answers;

create policy "game demo access" on public.games for all using (true) with check (true);
create policy "player demo access" on public.players for all using (true) with check (true);
create policy "answer demo access" on public.answers for all using (true) with check (true);

alter publication supabase_realtime add table public.games;
alter publication supabase_realtime add table public.players;
alter publication supabase_realtime add table public.answers;
