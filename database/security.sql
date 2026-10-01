alter table public.admins
enable row level security;

alter table public.plans
enable row level security;

alter table public.content
enable row level security;

alter table public.site_settings
enable row level security;

alter table public.leads
enable row level security;

alter table public.enrollments
enable row level security;


revoke all
on table public.admins
from anon, authenticated;

revoke all
on table public.plans
from anon, authenticated;

revoke all
on table public.content
from anon, authenticated;

revoke all
on table public.site_settings
from anon, authenticated;

revoke all
on table public.leads
from anon, authenticated;

revoke all
on table public.enrollments
from anon, authenticated;


update storage.buckets
set public=true
where id='site-media';