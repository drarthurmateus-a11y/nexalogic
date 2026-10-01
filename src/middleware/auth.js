import jwt from "jsonwebtoken";
import {env} from "../config/env.js";
import {supabase} from "../config/supabase.js";

function unauthorized(req,res,message="Nao autenticado."){
    if(req.originalUrl.startsWith("/api/")){
        return res.status(401).json({
            success:false,
            message
        });
    }

    return res.redirect("/admin/login.html");
}

export async function requireAdmin(req,res,next){
    const token=req.cookies?.[env.cookieName];

    if(!token){
        return unauthorized(req,res);
    }

    try{
        const payload=jwt.verify(
            token,
            env.jwtSecret
        );

        const {data:admin,error}=await supabase
            .from("admins")
            .select("id,name,email,role,active")
            .eq("id",payload.sub)
            .eq("active",true)
            .maybeSingle();

        if(error)throw error;

        if(!admin||admin.role!=="admin"){
            return unauthorized(
                req,
                res,
                "Acesso negado."
            );
        }

        req.admin=admin;

        next();

    }catch{
        return unauthorized(
            req,
            res,
            "Sessao invalida."
        );
    }
}