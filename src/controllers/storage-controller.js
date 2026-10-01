import {
    uploadImage
} from "../services/storage-service.js";

import {
    contentTypes
} from "../utils/validators.js";

export async function storeImage(req,res){
    if(!req.file){
        return res.status(400).json({
            success:false,
            message:"Selecione uma imagem."
        });
    }

    const type=String(
        req.body?.type||""
    );

    if(!contentTypes.includes(type)){
        return res.status(400).json({
            success:false,
            message:"Tipo de conteudo invalido."
        });
    }

    try{
        const file=await uploadImage(
            req.file,
            type
        );

        return res.status(201).json({
            success:true,
            message:"Imagem enviada com sucesso.",
            file
        });

    }catch(error){
        console.error(
            "Erro no upload:",
            error.message
        );

        return res.status(500).json({
            success:false,
            message:"Nao foi possivel enviar a imagem."
        });
    }
}