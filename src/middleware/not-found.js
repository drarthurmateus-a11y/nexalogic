import path from "path";

export function notFound(publicDir){
    return(req,res)=>{
        if(req.originalUrl.startsWith("/api/")){
            return res.status(404).json({
                success:false,
                message:"Rota nao encontrada."
            });
        }

        return res
            .status(404)
            .sendFile(
                path.join(
                    publicDir,
                    "404.html"
                )
            );
    };
}