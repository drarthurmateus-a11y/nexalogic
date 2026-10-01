import {apiGet,apiPost} from "../shared/api.js";

const form=document.querySelector("#admin-login-form");
const email=document.querySelector("#admin-email");
const password=document.querySelector("#admin-password");
const message=document.querySelector("#admin-login-message");
const submit=form?.querySelector('button[type="submit"]');

function showMessage(text,type="error"){
    if(!message)return;

    message.textContent=text;
    message.className=`admin-login-message show ${type}`;
}

function clearMessage(){
    if(!message)return;

    message.textContent="";
    message.className="admin-login-message";
}

function setError(field,text){
    field.classList.add("form-error");

    const small=field.closest("label")?.querySelector("small");

    if(small)small.textContent=text;
}

function clearError(field){
    field.classList.remove("form-error");

    const small=field.closest("label")?.querySelector("small");

    if(small)small.textContent="";
}

async function checkSession(){
    try{
        await apiGet("/api/auth/me");
        window.location.replace("/admin/");
    }catch{
        return;
    }
}

form?.addEventListener("submit",async event=>{
    event.preventDefault();

    clearMessage();
    clearError(email);
    clearError(password);

    const emailValue=email.value.trim();
    const passwordValue=password.value;

    let valid=true;

    if(!emailValue){
        setError(email,"Informe seu e-mail.");
        valid=false;
    }

    if(!passwordValue){
        setError(password,"Informe sua senha.");
        valid=false;
    }

    if(!valid)return;

    submit.disabled=true;
    submit.textContent="Entrando...";

    try{
        await apiPost("/api/auth/login",{
            email:emailValue,
            password:passwordValue
        });

        showMessage("Login realizado. Redirecionando...","success");

        window.location.replace("/admin/");

    }catch(error){
        showMessage(
            error.message||"Nao foi possivel realizar o login."
        );

    }finally{
        submit.disabled=false;
        submit.textContent="Entrar";
    }
});

email?.addEventListener("input",()=>{
    clearError(email);
    clearMessage();
});

password?.addEventListener("input",()=>{
    clearError(password);
    clearMessage();
});

checkSession();