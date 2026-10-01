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