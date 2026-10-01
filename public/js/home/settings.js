import {
    apiGet
} from "../shared/api.js";

function setText(id,value){
    const element=document.querySelector(id);

    if(!element)return;

    if(!value){
        const row=element.closest(
            ".contact-info > div"
        );

        if(row)row.hidden=true;

        return;
    }

    element.textContent=value;

    const row=element.closest(
        ".contact-info > div"
    );

    if(row)row.hidden=false;
}

function setSocial(id,url){
    const element=document.querySelector(id);

    if(!element)return;

    if(!url){
        element.hidden=true;
        element.removeAttribute("href");
        return;
    }

    element.href=url;
    element.hidden=false;
}

function updateWhatsapp(value){
    const button=
        document.querySelector("#whatsapp-float");

    if(!button)return;

    if(!value){
        button.hidden=true;
        return;
    }

    const number=value.replace(/\D/g,"");

    if(!number){
        button.hidden=true;
        return;
    }

    const text=
        "Olá! Gostaria de conhecer a Força Prime.";

    button.href=
        `https://wa.me/55${number.replace(/^55/,"")}?text=${encodeURIComponent(text)}`;

    button.hidden=false;
}

function applySettings(settings){
    if(!settings)return;

    if(settings.name){
        document.title=
            `${settings.name} | Treine com propósito`;
    }

    setText(
        "#site-address",
        settings.address
    );

    setText(
        "#site-hours",
        settings.business_hours
    );

    setText(
        "#site-phone",
        settings.phone
    );

    setText(
        "#site-whatsapp",
        settings.whatsapp
    );

    setText(
        "#site-email",
        settings.email
    );

    setSocial(
        "#site-instagram",
        settings.instagram
    );

    setSocial(
        "#site-facebook",
        settings.facebook
    );

    setSocial(
        "#site-youtube",
        settings.youtube
    );

    updateWhatsapp(
        settings.whatsapp
    );
}

export async function initSettings(){
    try{
        const response=
            await apiGet("/api/public/settings");

        applySettings(response.settings);

    }catch(error){
        console.error(
            "Erro ao carregar configuracoes:",
            error.message
        );
    }
}