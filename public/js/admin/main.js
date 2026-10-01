import {
    apiGet,
    apiPost
} from "../shared/api.js";

import {loadLeads} from "./leads.js";
import {updateDashboard} from "./dashboard.js";
import {initPlansAdmin} from "./plans.js";

const adminName=
    document.querySelector("#admin-name");

const logout=
    document.querySelector("#admin-logout");

const reload=
    document.querySelector("#reload-leads");

async function refreshLeads(){
    const leads=await loadLeads(
        updateDashboard
    );

    updateDashboard(leads);
}

async function init(){
    try{
        const session=
            await apiGet("/api/auth/me");

        if(adminName){
            adminName.textContent=
                session.admin.name;
        }

    }catch{
        window.location.replace(
            "/admin/login.html"
        );

        return;
    }

    try{
        await refreshLeads();
    }catch{
        // mensagem exibida pelo modulo
    }

    try{
        await initPlansAdmin();
    }catch(error){
        console.error(
            "Erro ao carregar planos:",
            error.message
        );
    }
}

logout?.addEventListener("click",async()=>{
    try{
        await apiPost(
            "/api/auth/logout",
            {}
        );
    }finally{
        window.location.replace(
            "/admin/login.html"
        );
    }
});

reload?.addEventListener(
    "click",
    refreshLeads
);

init();