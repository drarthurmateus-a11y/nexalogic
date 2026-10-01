import {
    apiGet,
    apiPut
} from "../shared/api.js";

function formatDate(value){
    const date=new Date(value);

    return new Intl.DateTimeFormat(
        "pt-BR",
        {
            dateStyle:"short",
            timeStyle:"short"
        }
    ).format(date);
}

function setField(row,name,value){
    const field=row.querySelector(
        `[data-field="${name}"]`
    );

    if(field)field.textContent=value||"-";
}

function createLeadRow(lead,onUpdate){
    const template=
        document.querySelector("#lead-row-template");

    const fragment=
        template.content.cloneNode(true);

    const row=fragment.querySelector("tr");
    const status=row.querySelector(
        '[data-field="status"]'
    );

    setField(row,"name",lead.name);
    setField(row,"phone",lead.phone);
    setField(row,"email",lead.email);
    setField(row,"goal",lead.goal);
    setField(row,"message",lead.message);
    setField(
        row,
        "date",
        formatDate(lead.created_at)
    );

    status.value=lead.status;

    status.addEventListener(
        "change",
        async()=>{
            status.disabled=true;

            try{
                await apiPut(
                    `/api/admin/leads/${lead.id}/status`,
                    {
                        status:status.value
                    }
                );

                lead.status=status.value;

                onUpdate?.();

            }catch(error){
                status.value=lead.status;

                throw error;

            }finally{
                status.disabled=false;
            }
        }
    );

    return fragment;
}

export async function loadLeads(onChange){
    const body=
        document.querySelector("#leads-table-body");

    const message=
        document.querySelector("#leads-message");

    if(!body)return [];

    body.textContent="";

    if(message){
        message.className="admin-message";
        message.textContent="";
    }

    try{
        const response=
            await apiGet("/api/admin/leads");

        const leads=response.leads||[];

        leads.forEach(lead=>{
            body.append(
                createLeadRow(
                    lead,
                    ()=>onChange?.(leads)
                )
            );
        });

        if(!leads.length&&message){
            message.textContent=
                "Nenhum lead cadastrado.";

            message.className=
                "admin-message show";
        }

        return leads;

    }catch(error){
        if(message){
            message.textContent=
                error.message;

            message.className=
                "admin-message show error";
        }

        throw error;
    }
}