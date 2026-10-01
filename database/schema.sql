create table if not exists admins(
    id uuid primary key default gen_random_uuid(),
    name text not null,
    email text not null unique,
    password_hash text not null,
    role text not null default 'admin',
    active boolean not null default true,
    created_at timestamptz not null default now(),
    updated_at timestamptz not null default now(),

    constraint admins_role_check
    check(role in ('admin'))
);

create table if not exists plans(
    id uuid primary key default gen_random_uuid(),
    name text not null,
    description text,
    price numeric(10,2) not null default 0,
    features jsonb not null default '[]'::jsonb,
    highlight boolean not null default false,
    active boolean not null default true,
    sort_order integer not null default 0,
    created_at timestamptz not null default now(),
    updated_at timestamptz not null default now()
);

create table if not exists content(
    id uuid primary key default gen_random_uuid(),
    type text not null,
    title text not null,
    subtitle text,
    description text,
    image_url text,
    extra_data jsonb not null default '{}'::jsonb,
    active boolean not null default true,
    sort_order integer not null default 0,
    created_at timestamptz not null default now(),
    updated_at timestamptz not null default now(),

    constraint content_type_check
    check(
        type in (
            'modality',
            'professional',
            'gallery',
            'testimonial',
            'faq'
        )
    )
);

create table if not exists site_settings(
    id smallint primary key default 1,
    name text,
    phone text,
    whatsapp text,
    email text,
    address text,
    instagram text,
    facebook text,
    youtube text,
    business_hours text,
    updated_at timestamptz not null default now(),

    constraint site_settings_single_row
    check(id=1)
);

create table if not exists leads(
    id uuid primary key default gen_random_uuid(),
    name text not null,
    phone text not null,
    email text not null,
    goal text,
    message text,
    status text not null default 'new',
    created_at timestamptz not null default now(),

    constraint leads_status_check
    check(status in ('new','contacted','closed'))
);

create table if not exists enrollments(
    id uuid primary key default gen_random_uuid(),
    name text not null,
    phone text not null,
    email text not null,
    plan_id uuid references plans(id) on delete set null,
    status text not null default 'pending',
    created_at timestamptz not null default now(),

    constraint enrollments_status_check
    check(status in ('pending','approved','cancelled'))
);

create index if not exists idx_content_type
on content(type);

create index if not exists idx_content_active
on content(active);

create index if not exists idx_leads_status
on leads(status);

create index if not exists idx_enrollments_status
on enrollments(status);