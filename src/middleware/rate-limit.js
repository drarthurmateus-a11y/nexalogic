import {rateLimit} from "express-rate-limit";

const common={
    standardHeaders:"draft-8",
    legacyHeaders:false
};

export const apiLimiter=rateLimit({
    ...common,
    windowMs:15*60*1000,
    limit:300,
    message:{
        success:false,
        message:"Muitas requisicoes. Tente novamente mais tarde."
    }
});

export const loginLimiter=rateLimit({
    ...common,
    windowMs:15*60*1000,
    limit:10,
    skipSuccessfulRequests:true,
    message:{
        success:false,
        message:"Muitas tentativas de login. Aguarde alguns minutos."
    }
});

export const publicFormLimiter=rateLimit({
    ...common,
    windowMs:15*60*1000,
    limit:20,
    message:{
        success:false,
        message:"Muitos envios. Aguarde alguns minutos."
    }
});

export const uploadLimiter=rateLimit({
    ...common,
    windowMs:60*60*1000,
    limit:50,
    message:{
        success:false,
        message:"Limite de uploads atingido. Tente novamente mais tarde."
    }
});