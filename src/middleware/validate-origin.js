const safeMethods=new Set([
    "GET",
    "HEAD",
    "OPTIONS"
]);

export function validateOrigin(req,res,next){
    if(safeMethods.has(req.method)){
        return next();
    }

    const origin=req.get("origin");

    /*
    curl, scripts e ferramentas servidor-servidor
    normalmente nao enviam Origin.
    */
    if(!origin){
        return next();
    }

    const forwardedProto=String(
        req.get("x-forwarded-proto")||""
    )
        .split(",")[0]
        .trim();

    const protocol=
        forwardedProto||
        req.protocol;

    const host=req.get("host");

    if(!host){
        return res.status(403).json({
            success:false,
            message:"Origem invalida."
        });
    }

    const expectedOrigin=
        `${protocol}://${host}`;

    if(origin!==expectedOrigin){
        return res.status(403).json({
            success:false,
            message:"Origem nao autorizada."
        });
    }

    next();
}