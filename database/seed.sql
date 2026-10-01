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

insert into content(
    type,
    title,
    description,
    image_url,
    active,
    sort_order
)
select
    'modality',
    'Musculação',
    'Estrutura completa para força e hipertrofia.',
    'https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?auto=format&fit=crop&w=1200&q=85',
    true,
    1
where not exists(
    select 1 from content
    where type='modality'
    and title='Musculação'
);

insert into content(
    type,title,description,image_url,active,sort_order
)
select
    'modality',
    'Funcional',
    'Movimento, condicionamento e variedade.',
    'https://images.unsplash.com/photo-1517963879433-6ad2b056d712?auto=format&fit=crop&w=900&q=85',
    true,
    2
where not exists(
    select 1 from content
    where type='modality'
    and title='Funcional'
);

insert into content(
    type,title,description,image_url,active,sort_order
)
select
    'modality',
    'Cardio',
    'Equipamentos para completar sua rotina.',
    'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?auto=format&fit=crop&w=900&q=85',
    true,
    3
where not exists(
    select 1 from content
    where type='modality'
    and title='Cardio'
);

insert into content(
    type,title,description,image_url,active,sort_order
)
select
    'modality',
    'Personal',
    'Orientação individual para objetivos específicos.',
    'https://images.unsplash.com/photo-1599058917212-d750089bc07e?auto=format&fit=crop&w=900&q=85',
    true,
    4
where not exists(
    select 1 from content
    where type='modality'
    and title='Personal'
);

insert into content(
    type,title,subtitle,image_url,active,sort_order
)
select
    'professional',
    'Carlos Mendes',
    'Personal Trainer',
    'https://images.unsplash.com/photo-1567013127542-490d757e51fc?auto=format&fit=crop&w=700&q=85',
    true,
    1
where not exists(
    select 1 from content
    where type='professional'
    and title='Carlos Mendes'
);

insert into content(
    type,title,subtitle,image_url,active,sort_order
)
select
    'professional',
    'Mariana Alves',
    'Nutrição Esportiva',
    'https://images.unsplash.com/photo-1551836022-d5d88e9218df?auto=format&fit=crop&w=700&q=85',
    true,
    2
where not exists(
    select 1 from content
    where type='professional'
    and title='Mariana Alves'
);

insert into content(
    type,title,subtitle,image_url,active,sort_order
)
select
    'professional',
    'Lucas Rocha',
    'Preparador Físico',
    'https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?auto=format&fit=crop&w=700&q=85',
    true,
    3
where not exists(
    select 1 from content
    where type='professional'
    and title='Lucas Rocha'
);

insert into content(
    type,title,description,active,sort_order
)
select
    'faq',
    'Preciso agendar uma avaliação?',
    'Para a avaliação inicial, recomendamos agendamento. Assim conseguimos reservar um horário para você.',
    true,
    1
where not exists(
    select 1 from content
    where type='faq'
    and title='Preciso agendar uma avaliação?'
);

insert into content(
    type,title,description,active,sort_order
)
select
    'faq',
    'A academia funciona aos domingos?',
    'Sim. Os horários podem variar em domingos e feriados; confirme pelo contato antes de sua visita.',
    true,
    2
where not exists(
    select 1 from content
    where type='faq'
    and title='A academia funciona aos domingos?'
);

insert into content(
    type,title,description,active,sort_order
)
select
    'faq',
    'Existe personal trainer?',
    'Sim. A academia conta com profissionais para acompanhamento individual, conforme disponibilidade e contratação.',
    true,
    3
where not exists(
    select 1 from content
    where type='faq'
    and title='Existe personal trainer?'
);

insert into content(
    type,title,description,active,sort_order
)
select
    'faq',
    'Posso fazer uma aula experimental?',
    'Sim. Entre em contato para consultar a disponibilidade de aula experimental.',
    true,
    4
where not exists(
    select 1 from content
    where type='faq'
    and title='Posso fazer uma aula experimental?'
);

insert into content(
    type,title,description,active,sort_order
)
select
    'faq',
    'Quais documentos são necessários?',
    'Para cadastro, tenha um documento de identificação. Menores de idade podem precisar de autorização do responsável.',
    true,
    5
where not exists(
    select 1 from content
    where type='faq'
    and title='Quais documentos são necessários?'
);

insert into content(
    type,title,description,active,sort_order
)
select
    'faq',
    'Existem planos sem fidelidade?',
    'As condições variam conforme o plano e a campanha vigente. Consulte nossa equipe.',
    true,
    6
where not exists(
    select 1 from content
    where type='faq'
    and title='Existem planos sem fidelidade?'
);

insert into content(
    type,title,image_url,active,sort_order
)
select
    'gallery',
    'Musculação',
    'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&w=1600&q=90',
    true,
    1
where not exists(
    select 1 from content
    where type='gallery'
    and title='Musculação'
);

insert into content(
    type,title,image_url,active,sort_order
)
select
    'gallery',
    'Área cardio',
    'https://images.unsplash.com/photo-1571902943202-507ec2618e8f?auto=format&fit=crop&w=1600&q=90',
    true,
    2
where not exists(
    select 1 from content
    where type='gallery'
    and title='Área cardio'
);

insert into content(
    type,title,image_url,active,sort_order
)
select
    'gallery',
    'Pesos livres',
    'https://images.unsplash.com/photo-1581122584612-713f0e4f72e7?auto=format&fit=crop&w=1600&q=90',
    true,
    3
where not exists(
    select 1 from content
    where type='gallery'
    and title='Pesos livres'
);

insert into content(
    type,title,image_url,active,sort_order
)
select
    'gallery',
    'Treinamento',
    'https://images.unsplash.com/photo-1593079831268-3381b0db4a77?auto=format&fit=crop&w=1600&q=90',
    true,
    4
where not exists(
    select 1 from content
    where type='gallery'
    and title='Treinamento'
);

insert into content(
    type,title,subtitle,description,active,sort_order
)
select
    'testimonial',
    'André M.',
    'aluno há 2 anos',
    'Comecei sem saber por onde começar e hoje tenho muito mais disciplina com meus treinos.',
    true,
    1
where not exists(
    select 1 from content
    where type='testimonial'
    and title='André M.'
);

insert into content(
    type,title,subtitle,description,active,sort_order
)
select
    'testimonial',
    'Juliana R.',
    'aluna há 1 ano',
    'O que mais gosto é que consigo treinar sem sentir que preciso acompanhar o ritmo de outra pessoa.',
    true,
    2
where not exists(
    select 1 from content
    where type='testimonial'
    and title='Juliana R.'
);

insert into content(
    type,title,subtitle,description,active,sort_order
)
select
    'testimonial',
    'Mateus S.',
    'aluno há 3 anos',
    'A estrutura é completa e os profissionais realmente ajudam quando a gente tem dúvida.',
    true,
    3
where not exists(
    select 1 from content
    where type='testimonial'
    and title='Mateus S.'
);
insert into site_settings(id,name)
values(
    1,
    'Força Prime'
)
on conflict(id) do update
set name=coalesce(
    site_settings.name,
    excluded.name
);

update site_settings
set
    whatsapp=coalesce(
        whatsapp,
        '(21) 99999-0000'
    ),
    address=coalesce(
        address,
        'Av. Exemplo, 250 — Centro, Rio de Janeiro/RJ'
    ),
    business_hours=coalesce(
        business_hours,
        E'Seg. a Sex. 06h — 23h\nSáb. 08h — 18h'
    )
where id=1;