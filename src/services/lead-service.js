import {supabase} from "../config/supabase.js";

export async function createLead(data){
    const {data:lead,error}=await supabase
        .from("leads")
        .insert({
            name:data.name,
            phone:data.phone,
            email:data.email,
            goal:data.goal,
            message:data.message,
            status:"new"
        })
        .select("id,created_at")
        .single();

    if(error)throw error;

    return lead;
}

export async function getLeads(){
    const {data,error}=await supabase
        .from("leads")
        .select(
            "id,name,phone,email,goal,message,status,created_at"
        )
        .order("created_at",{ascending:false});

    if(error)throw error;

    return data;
}

export async function changeLeadStatus(id,status){
    const {data,error}=await supabase
        .from("leads")
        .update({status})
        .eq("id",id)
        .select("id,status")
        .maybeSingle();

    if(error)throw error;

    return data;
}