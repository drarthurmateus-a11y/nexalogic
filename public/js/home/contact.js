function formatPhone(value){
    const numbers=value.replace(/\D/g,"").slice(0,11);

    if(numbers.length<=2)return numbers;
    if(numbers.length<=6)return `(${numbers.slice(0,2)}) ${numbers.slice(2)}`;
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

export function initContact(){
    const form=document.querySelector("#contact-form");
    const name=document.querySelector("#name");
    const phone=document.querySelector("#phone");
    const email=document.querySelector("#email");
    const goal=document.querySelector("#goal");
    const message=document.querySelector("#message");
    const success=document.querySelector("#form-success");

    if(!form||!name||!phone||!email||!goal||!message)return;

    phone.addEventListener("input",()=>{
        phone.value=formatPhone(phone.value);
    });

    [name,phone,email,goal,message].forEach(field=>{
        field.addEventListener("input",()=>clearError(field));
        field.addEventListener("change",()=>clearError(field));
    });

    form.addEventListener("submit",event=>{
        event.preventDefault();

        let valid=true;

        [name,phone,email,goal,message].forEach(clearError);

        if(name.value.trim().length<2){
            setError(name,"Informe seu nome.");
            valid=false;
        }

        const phoneNumbers=phone.value.replace(/\D/g,"");

        if(phoneNumbers.length<10){
            setError(phone,"Informe um telefone válido.");
            valid=false;
        }

        if(!validEmail(email.value.trim())){
            setError(email,"Informe um e-mail válido.");
            valid=false;
        }

        if(!goal.value){
            setError(goal,"Selecione seu objetivo.");
            valid=false;
        }

        if(message.value.trim().length<5){
            setError(message,"Escreva uma mensagem.");
            valid=false;
        }

        if(!valid){
            success?.classList.remove("show");
            return;
        }

        if(success){
            success.textContent="Formulário validado com sucesso.";
            success.classList.add("show");
        }
    });
}