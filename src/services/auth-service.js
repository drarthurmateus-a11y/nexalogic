import bcrypt from "bcrypt";
import {supabase} from "../config/supabase.js";

export async function authenticateAdmin(email,password){
    const {data:admin,error}=await supabase
        .from("admins")
        .select("id,name,email,password_hash,role,active")
        .eq("email",email)
        .maybeSingle();

    if(error)throw error;
    if(!admin||!admin.active)return null;

    const valid=await bcrypt.compare(password,admin.password_hash);

    if(!valid)return null;

    return{
        id:admin.id,
        name:admin.name,
        email:admin.email,
        role:admin.role
    };
}