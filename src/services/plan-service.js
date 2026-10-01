import {supabase} from "../config/supabase.js";

const fields=[
    "id",
    "name",
    "description",
    "price",
    "features",
    "highlight",
    "active",
    "sort_order",
    "created_at",
    "updated_at"
].join(",");

export async function getPlans(){
    const {data,error}=await supabase
        .from("plans")
        .select(fields)
        .order("sort_order",{ascending:true})
        .order("created_at",{ascending:true});

    if(error)throw error;

    return data;
}

export async function createPlan(data){
    const {data:plan,error}=await supabase
        .from("plans")
        .insert(data)
        .select(fields)
        .single();

    if(error)throw error;

    return plan;
}

export async function updatePlan(id,data){
    const {data:plan,error}=await supabase
        .from("plans")
        .update({
            ...data,
            updated_at:new Date().toISOString()
        })
        .eq("id",id)
        .select(fields)
        .maybeSingle();

    if(error)throw error;

    return plan;
}

export async function disablePlan(id){
    const {data:plan,error}=await supabase
        .from("plans")
        .update({
            active:false,
            updated_at:new Date().toISOString()
        })
        .eq("id",id)
        .select("id,active")
        .maybeSingle();

    if(error)throw error;

    return plan;
}