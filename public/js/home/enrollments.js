import {apiPost} from "../shared/api.js";

const modal=document.querySelector("#plan-modal");
const title=document.querySelector("#selected-plan");
const close=document.querySelector(".plan-close");

const form=document.querySelector("#enrollment-form");
const planId=document.querySelector("#enrollment-plan-id");
const name=document.querySelector("#enrollment-name");
const phone=document.querySelector("#enrollment-phone");
const email=document.querySelector("#enrollment-email");
const message=document.querySelector("#enrollment-message");
const submit=form?.querySelector('button[type="submit"]');

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

function setError(field,text){
    field.classList.add("form-error");

    const small=field
        .closest("label")
        ?.querySelector("small");

    if(small)small.textContent=text;
}

function clearError(field){
    field.classList.remove("form-error");

    const small=field
        .closest("label")
        ?.querySelector("small");

    if(small)small.textContent="";
}

function clearMessage(){
    if(!message)return;

    message.textContent="";
    message.className="enrollment-message";
}

function showMessage(text,type="success"){
    if(!message)return;

    message.textContent=text;
    message.className=
        `enrollment-message show ${type}`;
}

export function openEnrollment(plan){
    if(!modal||!title||!planId)return;

    title.textContent=`Plano ${plan.name}`;
    planId.value=plan.id;

    clearMessage();

    modal.classList.add("show");
    modal.setAttribute("aria-hidden","false");

    document.body.classList.add("modal-open");
}

export function closeEnrollment(){
    if(!modal)return;

    modal.classList.remove("show");
    modal.setAttribute("aria-hidden","true");

    document.body.classList.remove("modal-open");
}

export function initEnrollments(){
    if(!form)return;

    phone?.addEventListener("input",()=>{
        phone.value=formatPhone(phone.value);
        clearError(phone);
    });

    name?.addEventListener(
        "input",
        ()=>clearError(name)
    );

    email?.addEventListener(
        "input",
        ()=>clearError(email)
    );

    close?.addEventListener(
        "click",
        closeEnrollment
    );

    modal?.addEventListener("click",event=>{
        if(event.target===modal){
            closeEnrollment();
        }
    });

    document.addEventListener("keydown",event=>{
        if(
            event.key==="Escape"&&
            modal?.classList.contains("show")
        ){
            closeEnrollment();
        }
    });

    form.addEventListener("submit",async event=>{
        event.preventDefault();

        clearMessage();

        [name,phone,email].forEach(clearError);

        let valid=true;

        if(name.value.trim().length<2){
            setError(name,"Informe seu nome.");
            valid=false;
        }

        if(
            phone.value.replace(/\D/g,"").length<10
        ){
            setError(
                phone,
                "Informe um telefone valido."
            );

            valid=false;
        }

        if(
            !/^[^\s@]+@[^\s@]+\.[^\s@]+$/
                .test(email.value.trim())
        ){
            setError(
                email,
                "Informe um email valido."
            );

            valid=false;
        }

        if(!valid)return;

        submit.disabled=true;
        submit.textContent="Enviando...";

        try{
            const response=await apiPost(
                "/api/enrollments",
                {
                    name:name.value.trim(),
                    phone:phone.value.trim(),
                    email:email.value.trim(),
                    plan_id:planId.value
                }
            );

            form.reset();

            showMessage(
                response.message,
                "success"
            );

        }catch(error){
            const errors=error.data?.errors;

            if(errors?.name){
                setError(name,errors.name);
            }

            if(errors?.phone){
                setError(phone,errors.phone);
            }

            if(errors?.email){
                setError(email,errors.email);
            }

            showMessage(
                error.message,
                "error"
            );

        }finally{
            submit.disabled=false;
            submit.textContent=
                "Enviar pré-matrícula";
        }
    });
}