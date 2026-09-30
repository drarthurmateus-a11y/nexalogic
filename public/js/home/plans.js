export function initPlans(){
    const modal=document.querySelector("#plan-modal");
    const title=document.querySelector("#selected-plan");
    const whatsapp=document.querySelector("#plan-whatsapp");
    const close=modal?.querySelector(".plan-close");
    const buttons=document.querySelectorAll(".plan-select");

    if(!modal||!title||!whatsapp||!buttons.length)return;

    const phone="5521999990000";

    const openModal=button=>{
        const plan=button.dataset.plan;

        if(!plan)return;

        const message=`Olá! Tenho interesse no ${plan} da Força Prime. Gostaria de mais informações.`;

        title.textContent=plan;
        whatsapp.href=`https://wa.me/${phone}?text=${encodeURIComponent(message)}`;

        modal.classList.add("show");
        modal.setAttribute("aria-hidden","false");
        document.body.classList.add("modal-open");
    };

    const closeModal=()=>{
        modal.classList.remove("show");
        modal.setAttribute("aria-hidden","true");
        document.body.classList.remove("modal-open");
    };

    buttons.forEach(button=>{
        button.addEventListener("click",()=>openModal(button));
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