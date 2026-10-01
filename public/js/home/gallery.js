import {apiGet} from "../shared/api.js";

const modal=document.querySelector("#image-modal");
const modalImage=document.querySelector("#modal-image");
const close=document.querySelector(".modal-close");

function openModal(item){
    if(!modal||!modalImage)return;

    modalImage.src=item.image_url;
    modalImage.alt=item.title;

    modal.classList.add("show");
    modal.setAttribute("aria-hidden","false");

    document.body.classList.add("modal-open");
}

function closeModal(){
    if(!modal||!modalImage)return;

    modal.classList.remove("show");
    modal.setAttribute("aria-hidden","true");

    modalImage.src="";
    modalImage.alt="";

    document.body.classList.remove("modal-open");
}

function renderGallery(items){
    const grid=document.querySelector("#gallery-grid");
    const template=document.querySelector("#gallery-item-template");

    if(!grid||!template)return;

    grid.textContent="";

    items.forEach((item,index)=>{
        const fragment=template.content.cloneNode(true);

        const button=fragment.querySelector(".gallery-item");
        const image=fragment.querySelector("img");
        const title=fragment.querySelector('[data-field="title"]');

        image.src=item.image_url||"";
        image.alt=item.title;

        title.textContent=item.title;

        if(index===0){
            button.classList.add("gallery-large");
        }

        button.addEventListener(
            "click",
            ()=>openModal(item)
        );

        grid.append(fragment);
    });
}

async function loadGallery(){
    try{
        const response=await apiGet(
            "/api/public/content?type=gallery"
        );

        renderGallery(
            response.content||[]
        );

    }catch(error){
        console.error(
            "Erro ao carregar galeria:",
            error.message
        );
    }
}

export function initGallery(){
    close?.addEventListener(
        "click",
        closeModal
    );

    modal?.addEventListener("click",event=>{
        if(event.target===modal){
            closeModal();
        }
    });

    document.addEventListener("keydown",event=>{
        if(
            event.key==="Escape"&&
            modal?.classList.contains("show")
        ){
            closeModal();
        }
    });

    loadGallery();
}