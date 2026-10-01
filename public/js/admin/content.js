import {
    apiGet,
    apiPost,
    apiPut,
    apiDelete
} from "../shared/api.js";

let items=[];

const form=document.querySelector("#content-form");
const id=document.querySelector("#content-id");
const type=document.querySelector("#content-type");
const title=document.querySelector("#content-title");
const subtitle=document.querySelector("#content-subtitle");
const description=document.querySelector("#content-description");
const image=document.querySelector("#content-image");
const order=document.querySelector("#content-order");
const active=document.querySelector("#content-active");

const submit=document.querySelector("#content-submit");
const cancel=document.querySelector("#content-cancel");

const body=document.querySelector("#content-table-body");
const message=document.querySelector("#content-message");
const template=document.querySelector("#content-row-template");

function showMessage(text,status="success"){
    if(!message)return;

    message.textContent=text;
    message.className=
        `admin-message show ${status}`;
}

function clearMessage(){
    if(!message)return;

    message.textContent="";
    message.className="admin-message";
}

function typeName(value){
    const names={
        modality:"Modalidade",
        professional:"Profissional",
        gallery:"Galeria",
        testimonial:"Depoimento",
        faq:"FAQ"
    };

    return names[value]||value;
}

function setField(row,name,value){
    const field=row.querySelector(
        `[data-field="${name}"]`
    );

    if(field){
        field.textContent=value??"-";
    }
}

function resetForm(){
    form?.reset();

    id.value="";
    order.value="0";
    active.checked=true;

    submit.textContent="Salvar conteudo";
    cancel.hidden=true;

    clearMessage();
}

function editItem(item){
    id.value=item.id;
    type.value=item.type;
    title.value=item.title;
    subtitle.value=item.subtitle||"";
    description.value=item.description||"";
    image.value=item.image_url||"";
    order.value=item.sort_order;
    active.checked=item.active;

    submit.textContent="Atualizar conteudo";
    cancel.hidden=false;

    form.scrollIntoView({
        behavior:"smooth",
        block:"start"
    });
}

async function disableItem(item){
    const confirmed=window.confirm(
        `Desativar "${item.title}"?`
    );

    if(!confirmed)return;

    try{
        await apiDelete(
            `/api/admin/content/${item.id}`
        );

        await loadContent();

        showMessage(
            "Conteudo desativado."
        );

    }catch(error){
        showMessage(
            error.message,
            "error"
        );
    }
}

function createRow(item){
    const fragment=
        template.content.cloneNode(true);

    const row=fragment.querySelector("tr");

    setField(row,"type",typeName(item.type));
    setField(row,"title",item.title);
    setField(row,"subtitle",item.subtitle||"-");
    setField(row,"order",item.sort_order);

    setField(
        row,
        "active",
        item.active?"Ativo":"Inativo"
    );

    row
        .querySelector('[data-action="edit"]')
        ?.addEventListener(
            "click",
            ()=>editItem(item)
        );

    row
        .querySelector('[data-action="disable"]')
        ?.addEventListener(
            "click",
            ()=>disableItem(item)
        );

    return fragment;
}

function render(){
    if(!body||!template)return;

    body.textContent="";

    items.forEach(item=>{
        body.append(
            createRow(item)
        );
    });
}

export async function loadContent(){
    if(!body)return [];

    const selectedType=
        type?.value||"";

    const url=selectedType
        ?`/api/admin/content?type=${encodeURIComponent(selectedType)}`
        :"/api/admin/content";

    const response=await apiGet(url);

    items=response.content||[];

    render();

    return items;
}

form?.addEventListener(
    "submit",
    async event=>{
        event.preventDefault();

        clearMessage();

        const data={
            type:type.value,
            title:title.value.trim(),
            subtitle:subtitle.value.trim(),
            description:
                description.value.trim(),
            image_url:image.value.trim(),
            sort_order:Number(order.value),
            active:active.checked,
            extra_data:{}
        };

        submit.disabled=true;

        const editing=Boolean(id.value);

        try{
            if(editing){
                await apiPut(
                    `/api/admin/content/${id.value}`,
                    data
                );
            }else{
                await apiPost(
                    "/api/admin/content",
                    data
                );
            }

            resetForm();

            type.value=data.type;

            await loadContent();

            showMessage(
                editing
                    ?"Conteudo atualizado."
                    :"Conteudo criado."
            );

        }catch(error){
            showMessage(
                error.message,
                "error"
            );

        }finally{
            submit.disabled=false;
        }
    }
);

type?.addEventListener(
    "change",
    ()=>{
        if(!id.value){
            loadContent().catch(()=>{});
        }
    }
);

cancel?.addEventListener(
    "click",
    resetForm
);

export async function initContentAdmin(){
    await loadContent();
}