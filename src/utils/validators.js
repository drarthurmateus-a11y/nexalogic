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