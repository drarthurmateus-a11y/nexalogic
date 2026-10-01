import {
    apiGet,
    apiPut
} from "../shared/api.js";

const form=
    document.querySelector("#settings-form");

const name=
    document.querySelector("#settings-name");

const phone=
    document.querySelector("#settings-phone");

const whatsapp=
    document.querySelector("#settings-whatsapp");

const email=
    document.querySelector("#settings-email");

const address=
    document.querySelector("#settings-address");

const instagram=
    document.querySelector("#settings-instagram");

const facebook=
    document.querySelector("#settings-facebook");

const youtube=
    document.querySelector("#settings-youtube");

const hours=
    document.querySelector("#settings-hours");

const submit=
    document.querySelector("#settings-submit");

const message=
    document.querySelector("#settings-message");

function showMessage(text,type="success"){
    if(!message)return;

    message.textContent=text;

    message.className=
        `admin-message show ${type}`;
}

function fill(settings){
    name.value=settings?.name||"";
    phone.value=settings?.phone||"";
    whatsapp.value=settings?.whatsapp||"";
    email.value=settings?.email||"";
    address.value=settings?.address||"";
    instagram.value=settings?.instagram||"";
    facebook.value=settings?.facebook||"";
    youtube.value=settings?.youtube||"";
    hours.value=settings?.business_hours||"";
}

export async function loadSettings(){
    const response=
        await apiGet("/api/admin/settings");

    fill(response.settings);

    return response.settings;
}

form?.addEventListener(
    "submit",
    async event=>{
        event.preventDefault();

        submit.disabled=true;
        submit.textContent="Salvando...";

        try{
            const response=await apiPut(
                "/api/admin/settings",
                {
                    name:name.value.trim(),
                    phone:phone.value.trim(),
                    whatsapp:whatsapp.value.trim(),
                    email:email.value.trim(),
                    address:address.value.trim(),
                    instagram:instagram.value.trim(),
                    facebook:facebook.value.trim(),
                    youtube:youtube.value.trim(),
                    business_hours:hours.value.trim()
                }
            );

            fill(response.settings);

            showMessage(
                "Configuracoes atualizadas."
            );

        }catch(error){
            showMessage(
                error.message,
                "error"
            );

        }finally{
            submit.disabled=false;
            submit.textContent=
                "Salvar configurações";
        }
    }
);

export async function initSettingsAdmin(){
    await loadSettings();
}