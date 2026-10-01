import {apiGet} from "../shared/api.js";

let current=0;
let interval=null;

const previous=document.querySelector(".slider-arrow.prev");
const next=document.querySelector(".slider-arrow.next");
const track=document.querySelector(".testimonial-track");
const dotsContainer=document.querySelector(".slider-dots");
const template=document.querySelector("#testimonial-template");

function getTestimonials(){
    return [
        ...document.querySelectorAll(".testimonial")
    ];
}

function getDots(){
    return [
        ...dotsContainer.querySelectorAll("button")
    ];
}

function show(index){
    const testimonials=getTestimonials();
    const dots=getDots();

    if(!testimonials.length)return;

    current=
        (index+testimonials.length)%
        testimonials.length;

    testimonials.forEach((testimonial,itemIndex)=>{
        testimonial.classList.toggle(
            "active",
            itemIndex===current
        );
    });

    dots.forEach((dot,itemIndex)=>{
        dot.classList.toggle(
            "active",
            itemIndex===current
        );
    });
}

function restart(){
    clearInterval(interval);

    interval=setInterval(()=>{
        show(current+1);
    },6000);
}

function createDots(count){
    dotsContainer.textContent="";

    for(let index=0;index<count;index++){
        const button=document.createElement("button");

        button.type="button";

        button.setAttribute(
            "aria-label",
            `Mostrar depoimento ${index+1}`
        );

        button.addEventListener("click",()=>{
            show(index);
            restart();
        });

        dotsContainer.append(button);
    }
}

function renderTestimonials(items){
    if(!track||!template||!dotsContainer)return;

    track.textContent="";

    items.forEach(item=>{
        const fragment=template.content.cloneNode(true);

        fragment.querySelector('[data-field="text"]').textContent=
            item.description||"";

        fragment.querySelector('[data-field="name"]').textContent=
            item.title;

        fragment.querySelector('[data-field="subtitle"]').textContent=
            item.subtitle||"";

        track.append(fragment);
    });

    createDots(items.length);

    current=0;
    show(0);

    if(items.length>1){
        restart();
    }
}

async function loadTestimonials(){
    try{
        const response=await apiGet(
            "/api/public/content?type=testimonial"
        );

        renderTestimonials(
            response.content||[]
        );

    }catch(error){
        console.error(
            "Erro ao carregar depoimentos:",
            error.message
        );
    }
}

export function initTestimonials(){
    previous?.addEventListener("click",()=>{
        show(current-1);
        restart();
    });

    next?.addEventListener("click",()=>{
        show(current+1);
        restart();
    });

    loadTestimonials();
}