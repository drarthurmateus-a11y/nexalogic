import jwt from "jsonwebtoken";
import {authenticateAdmin} from "../services/auth-service.js";
import {env} from "../config/env.js";
import {
    authCookieOptions,
    clearAuthCookieOptions
} from "../utils/cookies.js";

export async function login(req,res){
    const email=String(req.body?.email||"").trim().toLowerCase();
    const password=String(req.body?.password||"");

    if(!email||!password){
        return res.status(400).json({
            success:false,
            message:"Informe email e senha."
        });
    }

    try{
        const admin=await authenticateAdmin(email,password);

        if(!admin){
            return res.status(401).json({
                success:false,
                message:"Email ou senha invalidos."
            });
        }

        const token=jwt.sign(
            {
                role:admin.role
            },
            env.jwtSecret,
            {
                subject:admin.id,
                expiresIn:env.jwtExpiresIn
            }
        );

        res.cookie(
            env.cookieName,
            token,
            authCookieOptions()
        );

        return res.json({
            success:true,
            message:"Login realizado com sucesso.",
            admin:{
                id:admin.id,
                name:admin.name,
                email:admin.email,
                role:admin.role
            }
        });

    }catch(error){
        console.error("Erro no login:",error.message);

        return res.status(500).json({
            success:false,
            message:"Nao foi possivel realizar o login."
        });
    }
}

export function logout(req,res){
    res.clearCookie(
        env.cookieName,
        clearAuthCookieOptions()
    );

    return res.json({
        success:true,
        message:"Logout realizado."
    });
}

export function me(req,res){
    return res.json({
        success:true,
        admin:req.admin
    });
}