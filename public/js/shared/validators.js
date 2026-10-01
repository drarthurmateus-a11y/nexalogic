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