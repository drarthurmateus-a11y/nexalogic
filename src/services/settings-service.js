import {supabase} from "../config/supabase.js";

const fields=[
    "id",
    "name",
    "phone",
    "whatsapp",
    "email",
    "address",
    "instagram",
    "facebook",
    "youtube",
    "business_hours",
    "updated_at"
].join(",");

export async function getSettings(){
    const {data,error}=await supabase
        .from("site_settings")
        .select(fields)
        .eq("id",1)
        .maybeSingle();

    if(error)throw error;

    return data;
}

export async function updateSettings(data){
    const {data:settings,error}=await supabase
        .from("site_settings")
        .upsert({
            id:1,
            ...data,
            updated_at:new Date().toISOString()
        },{
            onConflict:"id"
        })
        .select(fields)
        .single();

    if(error)throw error;

    return settings;
}