import {apiPost} from "../shared/api.js";

function formatPhone(value){
    const numbers=value.replace(/\D/g,"").slice(0,11);

    if(numbers.length<=2)return numbers;
    if(numbers.length<=6){
        return `(${numbers.slice(0,2)}) ${numbers.slice(2)}`;
    }

    if(numbers.length<=10){
        return `(${numbers.slice(0,2)}) ${numbers.slice(2,6)}-${numbers.slice(6)}`;
    }

    return `(${numbers.slice(0,2)}) ${numbers.slice(2,7)}-${numbers.slice(7)}`;
}

function validEmail(email){
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function setError(field,message){
    field.classList.add("form-error");

    const small=field.closest("label")?.querySelector("small");

    if(small)small.textContent=message;
}

function clearError(field){
    field.classList.remove("form-error");

    const small=field.closest("label")?.querySelector("small");

    if(small)small.textContent="";
}

function validateForm(fields){
    let valid=true;

    fields.forEach(clearError);

    if(fields[0].value.trim().length<2){
        setError(fields[0],"Informe seu nome.");
        valid=false;
    }

    const phoneNumbers=fields[1].value.replace(/\D/g,"");

    if(phoneNumbers.length<10){
        setError(fields[1],"Informe um telefone válido.");
        valid=false;
    }

    if(!validEmail(fields[2].value.trim())){
        setError(fields[2],"Informe um e-mail válido.");
        valid=false;
    }

    if(!fields[3].value){
        setError(fields[3],"Selecione seu objetivo.");
        valid=false;
    }

    if(fields[4].value.trim().length<5){
        setError(fields[4],"Escreva uma mensagem.");
        valid=false;
    }

    return valid;
}

export function initContact(){
    const form=document.querySelector("#contact-form");
    const name=document.querySelector("#name");
    const phone=document.querySelector("#phone");
    const email=document.querySelector("#email");
    const goal=document.querySelector("#goal");
    const message=document.querySelector("#message");
    const success=document.querySelector("#form-success");
    const submit=form?.querySelector('button[type="submit"]');

    if(!form||!name||!phone||!email||!goal||!message)return;

    const fields=[name,phone,email,goal,message];

    phone.addEventListener("input",()=>{
        phone.value=formatPhone(phone.value);
    });

    fields.forEach(field=>{
        field.addEventListener("input",()=>clearError(field));
        field.addEventListener("change",()=>clearError(field));
    });

    form.addEventListener("submit",async event=>{
        event.preventDefault();

        success?.classList.remove("show");

        if(!validateForm(fields))return;

        if(submit){
            submit.disabled=true;
            submit.textContent="Enviando...";
        }

        try{
            const response=await apiPost("/api/leads",{
                name:name.value.trim(),
                phone:phone.value.trim(),
                email:email.value.trim(),
                goal:goal.value,
                message:message.value.trim()
            });

            if(success){
                success.textContent=response.message;
                success.classList.add("show");
            }

            form.reset();

        }catch(error){
            if(error.data?.errors){
                const errors=error.data.errors;

                if(errors.name)setError(name,errors.name);
                if(errors.phone)setError(phone,errors.phone);
                if(errors.email)setError(email,errors.email);
                if(errors.goal)setError(goal,errors.goal);
                if(errors.message)setError(message,errors.message);
            }

            if(success){
                success.textContent=
                    error.message||"Nao foi possivel enviar.";

                success.classList.add("show");
            }

        }finally{
            if(submit){
                submit.disabled=false;
                submit.textContent="Enviar mensagem →";
            }
        }
    });
}