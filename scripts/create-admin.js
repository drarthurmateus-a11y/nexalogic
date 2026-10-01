import bcrypt from "bcrypt";
import {supabase} from "../src/config/supabase.js";

const name=process.env.ADMIN_NAME;
const email=process.env.ADMIN_EMAIL?.trim().toLowerCase();
const password=process.env.ADMIN_PASSWORD;

if(!name||!email||!password){
    console.error("ADMIN_NAME, ADMIN_EMAIL e ADMIN_PASSWORD sao obrigatorios.");
    process.exit(1);
}

if(password.length<8){
    console.error("A senha deve ter pelo menos 8 caracteres.");
    process.exit(1);
}

const passwordHash=await bcrypt.hash(password,12);

const {data,error}=await supabase
    .from("admins")
    .insert({
        name,
        email,
        password_hash:passwordHash,
        role:"admin",
        active:true
    })
    .select("id,name,email,role")
    .single();

if(error){
    console.error("Erro ao criar admin:",error.message);
    process.exit(1);
}

console.log("Admin criado com sucesso:");
console.log(data);