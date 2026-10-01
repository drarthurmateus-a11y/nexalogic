import {createClient} from "@supabase/supabase-js";
import {env} from "./env.js";

if(!env.supabaseUrl||!env.supabaseSecretKey){
    throw new Error("SUPABASE_URL ou SUPABASE_SECRET_KEY nao configurada.");
}

export const supabase=createClient(
    env.supabaseUrl,
    env.supabaseSecretKey,
    {
        auth:{
            persistSession:false,
            autoRefreshToken:false
        }
    }
);