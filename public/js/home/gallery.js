export function initGallery(){
    const modal=document.querySelector("#image-modal");
    const image=document.querySelector("#modal-image");
    const close=modal?.querySelector(".modal-close");
    const items=document.querySelectorAll(".gallery-item");

    if(!modal||!image||!items.length)return;

    const openModal=item=>{
        const src=item.dataset.image;
        const preview=item.querySelector("img");

        if(!src)return;

        image.src=src;
        image.alt=preview?.alt||"Imagem ampliada";

        modal.classList.add("show");
        modal.setAttribute("aria-hidden","false");
        document.body.classList.add("modal-open");
    };

    const closeModal=()=>{
        modal.classList.remove("show");
        modal.setAttribute("aria-hidden","true");
        document.body.classList.remove("modal-open");

        image.src="";
        image.alt="";
    };

    items.forEach(item=>{
        item.addEventListener("click",()=>openModal(item));
    });

    close?.addEventListener("click",closeModal);

    modal.addEventListener("click",event=>{
        if(event.target===modal)closeModal();
    });

    document.addEventListener("keydown",event=>{
        if(event.key==="Escape"&&modal.classList.contains("show")){
            closeModal();
        }
    });
}