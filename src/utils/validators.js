export function isValidEmail(value){
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

export function onlyNumbers(value){
    return String(value||"").replace(/\D/g,"");
}

export function cleanText(value){
    return String(value||"").trim();
}

export function validateLead(data={}){
    const name=cleanText(data.name);
    const phone=cleanText(data.phone);
    const email=cleanText(data.email).toLowerCase();
    const goal=cleanText(data.goal);
    const message=cleanText(data.message);

    const errors={};

    if(name.length<2||name.length>100){
        errors.name="Nome invalido.";
    }

    const phoneNumbers=onlyNumbers(phone);

    if(phoneNumbers.length<10||phoneNumbers.length>11){
        errors.phone="Telefone invalido.";
    }

    if(!isValidEmail(email)||email.length>150){
        errors.email="Email invalido.";
    }

    if(goal.length<2||goal.length>100){
        errors.goal="Objetivo invalido.";
    }

    if(message.length<5||message.length>1000){
        errors.message="Mensagem invalida.";
    }

    return{
        valid:Object.keys(errors).length===0,
        errors,
        data:{
            name,
            phone,
            email,
            goal,
            message
        }
    };
}
export function isValidUuid(value){
    return /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(
        String(value||"")
    );
}
export function validatePlan(data={}){
    const name=cleanText(data.name);
    const description=cleanText(data.description);
    const price=Number(data.price);
    const sortOrder=Number(data.sort_order);
    const highlight=data.highlight===true;
    const active=data.active!==false;

    const features=Array.isArray(data.features)
        ?data.features
            .map(cleanText)
            .filter(Boolean)
            .slice(0,20)
        :[];

    const errors={};

    if(name.length<2||name.length>80){
        errors.name="Nome do plano invalido.";
    }

    if(description.length>500){
        errors.description="Descricao muito longa.";
    }

    if(!Number.isFinite(price)||price<0||price>999999){
        errors.price="Preco invalido.";
    }

    if(!Number.isInteger(sortOrder)||sortOrder<0||sortOrder>9999){
        errors.sort_order="Ordem invalida.";
    }

    return{
        valid:Object.keys(errors).length===0,
        errors,
        data:{
            name,
            description,
            price,
            features,
            highlight,
            active,
            sort_order:sortOrder
        }
    };
}

export function validateEnrollment(data={}){
    const name=cleanText(data.name);
    const phone=cleanText(data.phone);
    const email=cleanText(data.email).toLowerCase();
    const planId=cleanText(data.plan_id);

    const errors={};
    const phoneNumbers=onlyNumbers(phone);

    if(name.length<2||name.length>100){
        errors.name="Nome invalido.";
    }

    if(phoneNumbers.length<10||phoneNumbers.length>11){
        errors.phone="Telefone invalido.";
    }

    if(!isValidEmail(email)||email.length>150){
        errors.email="Email invalido.";
    }

    if(!isValidUuid(planId)){
        errors.plan_id="Plano invalido.";
    }

    return{
        valid:Object.keys(errors).length===0,
        errors,
        data:{
            name,
            phone,
            email,
            plan_id:planId
        }
    };
}
export const contentTypes=[
    "modality",
    "professional",
    "gallery",
    "testimonial",
    "faq"
];

export function validateContent(data={}){
    const type=cleanText(data.type);
    const title=cleanText(data.title);
    const subtitle=cleanText(data.subtitle);
    const description=cleanText(data.description);
    const imageUrl=cleanText(data.image_url);

    const sortOrder=Number(data.sort_order);
    const active=data.active!==false;

    const errors={};

    if(!contentTypes.includes(type)){
        errors.type="Tipo de conteudo invalido.";
    }

    if(title.length<2||title.length>150){
        errors.title="Titulo invalido.";
    }

    if(subtitle.length>150){
        errors.subtitle="Subtitulo muito longo.";
    }

    if(description.length>1500){
        errors.description="Descricao muito longa.";
    }

    if(imageUrl.length>1000){
        errors.image_url="URL da imagem invalida.";
    }

    if(!Number.isInteger(sortOrder)||sortOrder<0||sortOrder>9999){
        errors.sort_order="Ordem invalida.";
    }

    return{
        valid:Object.keys(errors).length===0,
        errors,
        data:{
            type,
            title,
            subtitle:subtitle||null,
            description:description||null,
            image_url:imageUrl||null,
            extra_data:
                typeof data.extra_data==="object"&&
                data.extra_data!==null&&
                !Array.isArray(data.extra_data)
                    ?data.extra_data
                    :{},
            active,
            sort_order:sortOrder
        }
    };
}