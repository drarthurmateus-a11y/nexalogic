import {
    apiGet,
    apiPut
} from "../shared/api.js";

const body=
    document.querySelector("#enrollments-table-body");

const message=
    document.querySelector("#enrollments-message");

const template=
    document.querySelector("#enrollment-row-template");

function formatDate(value){
    return new Intl.DateTimeFormat(
        "pt-BR",
        {
            dateStyle:"short",
            timeStyle:"short"
        }
    ).format(new Date(value));
}

function setField(row,name,value){
    const field=row.querySelector(
        `[data-field="${name}"]`
    );

    if(field){
        field.textContent=value||"-";
    }
}

function createRow(enrollment){
    const fragment=
        template.content.cloneNode(true);

    const row=fragment.querySelector("tr");

    const status=row.querySelector(
        '[data-field="status"]'
    );

    setField(
        row,
        "name",
        enrollment.name
    );

    setField(
        row,
        "phone",
        enrollment.phone
    );

    setField(
        row,
        "email",
        enrollment.email
    );

    setField(
        row,
        "plan",
        enrollment.plans?.name||"-"
    );

    setField(
        row,
        "date",
        formatDate(enrollment.created_at)
    );

    status.value=enrollment.status;

    status.addEventListener(
        "change",
        async()=>{
            const previous=
                enrollment.status;

            status.disabled=true;

            try{
                await apiPut(
                    `/api/admin/enrollments/${enrollment.id}/status`,
                    {
                        status:status.value
                    }
                );

                enrollment.status=
                    status.value;

            }catch(error){
                status.value=previous;

                if(message){
                    message.textContent=
                        error.message;

                    message.className=
                        "admin-message show error";
                }

            }finally{
                status.disabled=false;
            }
        }
    );

    return fragment;
}

export async function loadEnrollments(){
    if(!body||!template)return [];

    body.textContent="";

    if(message){
        message.textContent="";
        message.className="admin-message";
    }

    try{
        const response=
            await apiGet(
                "/api/admin/enrollments"
            );

        const enrollments=
            response.enrollments||[];

        enrollments.forEach(enrollment=>{
            body.append(
                createRow(enrollment)
            );
        });

        if(!enrollments.length&&message){
            message.textContent=
                "Nenhuma pre-matricula cadastrada.";

            message.className=
                "admin-message show";
        }

        return enrollments;

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