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