import {apiGet} from "../shared/api.js";

async function getContent(type){
    const response=await apiGet(
        `/api/public/content?type=${encodeURIComponent(type)}`
    );

    return response.content||[];
}

function renderModalities(items){
    const grid=document.querySelector("#modalities-grid");
    const template=document.querySelector("#modality-template");

    if(!grid||!template)return;

    grid.textContent="";

    items.forEach((item,index)=>{
        const fragment=template.content.cloneNode(true);
        const card=fragment.querySelector(".modality-card");
        const image=fragment.querySelector("img");

        fragment.querySelector('[data-field="number"]').textContent=
            String(index+1).padStart(2,"0");

        fragment.querySelector('[data-field="title"]').textContent=
            item.title;

        fragment.querySelector('[data-field="description"]').textContent=
            item.description||"";

        if(item.image_url){
            image.src=item.image_url;
            image.alt=item.title;
        }

        if(index===0){
            card.classList.add("modality-featured");
        }

        grid.append(fragment);
    });
}

function renderProfessionals(items){
    const grid=document.querySelector("#professionals-grid");
    const template=document.querySelector("#professional-template");

    if(!grid||!template)return;

    grid.textContent="";

    items.forEach(item=>{
        const fragment=template.content.cloneNode(true);
        const image=fragment.querySelector("img");

        fragment.querySelector('[data-field="role"]').textContent=
            item.subtitle||"";

        fragment.querySelector('[data-field="name"]').textContent=
            item.title;

        if(item.image_url){
            image.src=item.image_url;
            image.alt=item.title;
        }

        grid.append(fragment);
    });
}

function renderFaq(items){
    const list=document.querySelector("#faq-list");
    const template=document.querySelector("#faq-template");

    if(!list||!template)return;

    list.textContent="";

    items.forEach(item=>{
        const fragment=template.content.cloneNode(true);

        fragment.querySelector('[data-field="question"]').textContent=
            item.title;

        fragment.querySelector('[data-field="answer"]').textContent=
            item.description||"";

        list.append(fragment);
    });
}

async function loadSection(type,render){
    try{
        const items=await getContent(type);
        render(items);
    }catch(error){
        console.error(
            `Erro ao carregar ${type}:`,
            error.message
        );
    }
}

export function initContent(){
    loadSection("modality",renderModalities);
    loadSection("professional",renderProfessionals);
    loadSection("faq",renderFaq);
}