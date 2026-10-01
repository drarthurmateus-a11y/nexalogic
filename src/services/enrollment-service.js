import {supabase} from "../config/supabase.js";

export async function getActiveEnrollmentPlan(id){
    const {data,error}=await supabase
        .from("plans")
        .select("id,name,active")
        .eq("id",id)
        .eq("active",true)
        .maybeSingle();

    if(error)throw error;

    return data;
}

export async function createEnrollment(data){
    const {data:enrollment,error}=await supabase
        .from("enrollments")
        .insert({
            name:data.name,
            phone:data.phone,
            email:data.email,
            plan_id:data.plan_id,
            status:"pending"
        })
        .select("id,status,created_at")
        .single();

    if(error)throw error;

    return enrollment;
}

export async function getEnrollments(){
    const {data,error}=await supabase
        .from("enrollments")
        .select(`
            id,
            name,
            phone,
            email,
            plan_id,
            status,
            created_at,
            plans(name)
        `)
        .order("created_at",{ascending:false});

    if(error)throw error;

    return data;
}

export async function changeEnrollmentStatus(id,status){
    const {data,error}=await supabase
        .from("enrollments")
        .update({status})
        .eq("id",id)
        .select("id,status")
        .maybeSingle();

    if(error)throw error;

    return data;
}