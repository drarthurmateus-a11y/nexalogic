import {
    apiGet,
    apiPost,
    apiPut,
    apiDelete
} from "../shared/api.js";

let plans=[];

const form=document.querySelector("#plan-form");
const id=document.querySelector("#plan-id");
const name=document.querySelector("#plan-name");
const price=document.querySelector("#plan-price");
const order=document.querySelector("#plan-order");
const highlight=document.querySelector("#plan-highlight");
const active=document.querySelector("#plan-active");
const description=document.querySelector("#plan-description");
const features=document.querySelector("#plan-features");
const submit=document.querySelector("#plan-submit");
const cancel=document.querySelector("#plan-cancel");
const body=document.querySelector("#plans-table-body");
const message=document.querySelector("#plans-message");
const template=document.querySelector("#plan-row-template");

function showMessage(text,type="success"){
    if(!message)return;

    message.textContent=text;
    message.className=`admin-message show ${type}`;
}

function clearMessage(){
    if(!message)return;

    message.textContent="";
    message.className="admin-message";
}

function formatPrice(value){
    return new Intl.NumberFormat(
        "pt-BR",
        {
            style:"currency",
            currency:"BRL"
        }
    ).format(Number(value)||0);
}

function setField(row,field,value){
    const element=row.querySelector(
        `[data-field="${field}"]`
    );

    if(element){
        element.textContent=value??"-";
    }
}

function resetForm(){
    form?.reset();

    if(id)id.value="";
    if(order)order.value="0";
    if(active)active.checked=true;

    if(submit){
        submit.textContent="Salvar plano";
    }

    if(cancel){
        cancel.hidden=true;
    }

    clearMessage();
}

function editPlan(plan){
    id.value=plan.id;
    name.value=plan.name;
    price.value=plan.price;
    order.value=plan.sort_order;
    highlight.checked=plan.highlight;
    active.checked=plan.active;
    description.value=plan.description||"";

    features.value=Array.isArray(plan.features)
        ?plan.features.join("\n")
        :"";

    submit.textContent="Atualizar plano";
    cancel.hidden=false;

    form.scrollIntoView({
        behavior:"smooth",
        block:"start"
    });
}

async function disableCurrentPlan(plan){
    const confirmed=window.confirm(
        `Desativar o plano ${plan.name}?`
    );

    if(!confirmed)return;

    try{
        await apiDelete(
            `/api/admin/plans/${plan.id}`
        );

        await loadPlans();

        showMessage("Plano desativado.");

    }catch(error){
        showMessage(
            error.message,
            "error"
        );
    }
}

function createRow(plan){
    const fragment=
        template.content.cloneNode(true);

    const row=fragment.querySelector("tr");

    setField(row,"name",plan.name);
    setField(
        row,
        "description",
        plan.description||"-"
    );

    setField(
        row,
        "price",
        formatPrice(plan.price)
    );

    setField(
        row,
        "features",
        Array.isArray(plan.features)
            ?plan.features.join(", ")
            :"-"
    );

    setField(
        row,
        "highlight",
        plan.highlight?"Sim":"Não"
    );

    setField(
        row,
        "active",
        plan.active?"Ativo":"Inativo"
    );

    row
        .querySelector('[data-action="edit"]')
        ?.addEventListener(
            "click",
            ()=>editPlan(plan)
        );

    row
        .querySelector('[data-action="disable"]')
        ?.addEventListener(
            "click",
            ()=>disableCurrentPlan(plan)
        );

    return fragment;
}

function renderPlans(){
    if(!body||!template)return;

    body.textContent="";

    plans.forEach(plan=>{
        body.append(
            createRow(plan)
        );
    });
}

export async function loadPlans(){
    const response=
        await apiGet("/api/admin/plans");

    plans=response.plans||[];

    renderPlans();

    return plans;
}

form?.addEventListener("submit",async event=>{
    event.preventDefault();

    clearMessage();

    const data={
        name:name.value.trim(),
        description:description.value.trim(),
        price:Number(price.value),
        sort_order:Number(order.value),
        highlight:highlight.checked,
        active:active.checked,

        features:features.value
            .split("\n")
            .map(item=>item.trim())
            .filter(Boolean)
    };

    submit.disabled=true;

try{
    const editing=Boolean(id.value);

    if(editing){
        await apiPut(
            `/api/admin/plans/${id.value}`,
            data
        );
    }else{
        await apiPost(
            "/api/admin/plans",
            data
        );
    }

    await loadPlans();

    resetForm();

    showMessage(
        editing
            ?"Plano atualizado com sucesso."
            :"Plano criado com sucesso."
    );

}catch(error){
    showMessage(
        error.message,
        "error"
    );

}finally{
    submit.disabled=false;
}
});

cancel?.addEventListener(
    "click",
    resetForm
);

export async function initPlansAdmin(){
    await loadPlans();
}