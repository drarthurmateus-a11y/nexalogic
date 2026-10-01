import {env} from "../config/env.js";

export function authCookieOptions(){
    return{
        httpOnly:true,
        secure:env.nodeEnv==="production",
        sameSite:"strict",
        maxAge:8*60*60*1000,
        path:"/"
    };
}

export function clearAuthCookieOptions(){
    return{
        httpOnly:true,
        secure:env.nodeEnv==="production",
        sameSite:"strict",
        path:"/"
    };
}