import {apiGet} from "../shared/api.js";
import {openEnrollment} from "./enrollments.js";
const grid=document.querySelector("#plans-grid");
const message=document.querySelector("#plans-message");
const template=document.querySelector("#plan-card-template");

function formatOrder(index){
    return String(index+1).padStart(2,"0");
}

function splitPrice(value){
    const number=Number(value)||0;
    const formatted=number.toFixed(2);
    const [main,cents]=formatted.split(".");

    return{
        main,
        cents:`,${cents}`
    };
}

function createFeature(text){
    const item=document.createElement("li");
    item.textContent=text;

    return item;
}


function createPlanCard(plan,index){
    const fragment=
        template.content.cloneNode(true);

    const card=fragment.querySelector(".plan");

    const tag=fragment.querySelector(
        '[data-field="tag"]'
    );

    const number=fragment.querySelector(
        '[data-field="number"]'
    );

    const name=fragment.querySelector(
        '[data-field="name"]'
    );

    const description=fragment.querySelector(
        '[data-field="description"]'
    );

    const priceMain=fragment.querySelector(
        '[data-field="price-main"]'
    );

    const priceCents=fragment.querySelector(
        '[data-field="price-cents"]'
    );

    const features=fragment.querySelector(
        '[data-field="features"]'
    );

    const button=fragment.querySelector(
        '[data-action="select"]'
    );

    if(plan.highlight){
        card.classList.add("plan-featured");

        tag.hidden=false;

        button.classList.remove("btn-outline");
        button.classList.add("btn-primary");
    }

    number.textContent=formatOrder(index);
    name.textContent=plan.name;
    description.textContent=plan.description||"";

    const price=splitPrice(plan.price);

    priceMain.textContent=price.main;
    priceCents.textContent=price.cents;

    if(Array.isArray(plan.features)){
        plan.features.forEach(feature=>{
            features.append(
                createFeature(feature)
            );
        });
    }

    button.dataset.planId=plan.id;

   button.addEventListener(
    "click",
    ()=>openEnrollment(plan)
);

    return fragment;
}

async function loadPlans(){
    if(!grid||!template)return;

    grid.textContent="";

    if(message){
        message.textContent="Carregando planos...";
        message.classList.remove("error");
    }

    try{
        const response=
            await apiGet("/api/public/plans");

        const plans=response.plans||[];

        if(!plans.length){
            if(message){
                message.textContent=
                    "Nenhum plano disponivel no momento.";
            }

            return;
        }

        plans.forEach((plan,index)=>{
            grid.append(
                createPlanCard(plan,index)
            );
        });

        if(message){
            message.textContent="";
        }

    }catch(error){
        if(message){
            message.textContent=
                "Nao foi possivel carregar os planos.";

            message.classList.add("error");
        }

        console.error(
            "Erro ao carregar planos:",
            error.message
        );
    }
}
export function initPlans(){
    loadPlans();
}