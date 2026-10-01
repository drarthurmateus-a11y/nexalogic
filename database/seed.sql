insert into plans(
    name,
    description,
    price,
    features,
    highlight,
    active,
    sort_order
)
select
    'Start',
    'Para começar a colocar o treino na rotina.',
    89.90,
    '[
        "Musculação",
        "Área cardio",
        "Avaliação inicial"
    ]'::jsonb,
    false,
    true,
    1
where not exists(
    select 1
    from plans
    where lower(name)=lower('Start')
);

insert into plans(
    name,
    description,
    price,
    features,
    highlight,
    active,
    sort_order
)
select
    'Prime',
    'Mais possibilidades para uma rotina completa.',
    129.90,
    '[
        "Musculação",
        "Cardio",
        "Funcional",
        "Avaliação física"
    ]'::jsonb,
    true,
    true,
    2
where not exists(
    select 1
    from plans
    where lower(name)=lower('Prime')
);

insert into plans(
    name,
    description,
    price,
    features,
    highlight,
    active,
    sort_order
)
select
    'Performance',
    'Para quem quer acompanhamento mais próximo.',
    179.90,
    '[
        "Todos os benefícios",
        "Personal",
        "Acompanhamento individual"
    ]'::jsonb,
    false,
    true,
    3
where not exists(
    select 1
    from plans
    where lower(name)=lower('Performance')
);