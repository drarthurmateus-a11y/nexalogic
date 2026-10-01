import {supabase} from "../config/supabase.js";

const fields=[
    "id",
    "type",
    "title",
    "subtitle",
    "description",
    "image_url",
    "extra_data",
    "active",
    "sort_order",
    "created_at",
    "updated_at"
].join(",");

export async function getContent(type=null){
    let query=supabase
        .from("content")
        .select(fields)
        .order("type",{ascending:true})
        .order("sort_order",{ascending:true})
        .order("created_at",{ascending:true});

    if(type){
        query=query.eq("type",type);
    }

    const {data,error}=await query;

    if(error)throw error;

    return data;
}

export async function getActiveContent(type){
    const {data,error}=await supabase
        .from("content")
        .select(fields)
        .eq("type",type)
        .eq("active",true)
        .order("sort_order",{ascending:true})
        .order("created_at",{ascending:true});

    if(error)throw error;

    return data;
}

export async function createContent(data){
    const {data:content,error}=await supabase
        .from("content")
        .insert(data)
        .select(fields)
        .single();

    if(error)throw error;

    return content;
}

export async function updateContent(id,data){
    const {data:content,error}=await supabase
        .from("content")
        .update({
            ...data,
            updated_at:new Date().toISOString()
        })
        .eq("id",id)
        .select(fields)
        .maybeSingle();

    if(error)throw error;

    return content;
}

export async function disableContent(id){
    const {data:content,error}=await supabase
        .from("content")
        .update({
            active:false,
            updated_at:new Date().toISOString()
        })
        .eq("id",id)
        .select("id,active")
        .maybeSingle();

    if(error)throw error;

    return content;
}