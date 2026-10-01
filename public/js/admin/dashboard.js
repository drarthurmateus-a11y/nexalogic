function countByStatus(leads,status){
    return leads.filter(
        lead=>lead.status===status
    ).length;
}

export function updateDashboard(leads){
    const total=document.querySelector("#lead-total");
    const newLeads=document.querySelector("#lead-new");
    const contacted=document.querySelector("#lead-contacted");
    const closed=document.querySelector("#lead-closed");

    if(total)total.textContent=leads.length;

    if(newLeads){
        newLeads.textContent=
            countByStatus(leads,"new");
    }

    if(contacted){
        contacted.textContent=
            countByStatus(leads,"contacted");
    }

    if(closed){
        closed.textContent=
            countByStatus(leads,"closed");
    }
}