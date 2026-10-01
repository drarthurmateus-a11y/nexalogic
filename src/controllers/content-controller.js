import {
    getContent,
    getActiveContent,
    createContent,
    updateContent,
    disableContent
} from "../services/content-service.js";

import {
    validateContent,
    contentTypes,
    isValidUuid
} from "../utils/validators.js";

export async function listContent(req,res){
    const type=String(req.query.type||"");

    if(type&&!contentTypes.includes(type)){
        return res.status(400).json({
            success:false,
            message:"Tipo de conteudo invalido."
        });
    }

    try{
        const content=await getContent(type||null);

        return res.json({
            success:true,
            content
        });

    }catch(error){
        console.error(
            "Erro ao buscar conteudo:",
            error.message
        );

        return res.status(500).json({
            success:false,
            message:"Nao foi possivel carregar o conteudo."
        });
    }
}

export async function listPublicContent(req,res){
    const type=String(req.query.type||"");

    if(!contentTypes.includes(type)){
        return res.status(400).json({
            success:false,
            message:"Tipo de conteudo invalido."
        });
    }

    try{
        const content=await getActiveContent(type);

        return res.json({
            success:true,
            content
        });

    }catch(error){
        console.error(
            "Erro ao buscar conteudo publico:",
            error.message
        );

        return res.status(500).json({
            success:false,
            message:"Nao foi possivel carregar o conteudo."
        });
    }
}

export async function storeContent(req,res){
    const validation=validateContent(req.body);

    if(!validation.valid){
        return res.status(400).json({
            success:false,
            message:"Verifique os campos.",
            errors:validation.errors
        });
    }

    try{
        const content=await createContent(
            validation.data
        );

        return res.status(201).json({
            success:true,
            message:"Conteudo criado com sucesso.",
            content
        });

    }catch(error){
        console.error(
            "Erro ao criar conteudo:",
            error.message
        );

        return res.status(500).json({
            success:false,
            message:"Nao foi possivel criar o conteudo."
        });
    }
}

export async function editContent(req,res){
    const id=String(req.params.id||"");

    if(!isValidUuid(id)){
        return res.status(400).json({
            success:false,
            message:"Conteudo invalido."
        });
    }

    const validation=validateContent(req.body);

    if(!validation.valid){
        return res.status(400).json({
            success:false,
            message:"Verifique os campos.",
            errors:validation.errors
        });
    }

    try{
        const content=await updateContent(
            id,
            validation.data
        );

        if(!content){
            return res.status(404).json({
                success:false,
                message:"Conteudo nao encontrado."
            });
        }

        return res.json({
            success:true,
            message:"Conteudo atualizado.",
            content
        });

    }catch(error){
        console.error(
            "Erro ao atualizar conteudo:",
            error.message
        );

        return res.status(500).json({
            success:false,
            message:"Nao foi possivel atualizar o conteudo."
        });
    }
}

export async function removeContent(req,res){
    const id=String(req.params.id||"");

    if(!isValidUuid(id)){
        return res.status(400).json({
            success:false,
            message:"Conteudo invalido."
        });
    }

    try{
        const content=await disableContent(id);

        if(!content){
            return res.status(404).json({
                success:false,
                message:"Conteudo nao encontrado."
            });
        }

        return res.json({
            success:true,
            message:"Conteudo desativado."
        });

    }catch(error){
        console.error(
            "Erro ao desativar conteudo:",
            error.message
        );

        return res.status(500).json({
            success:false,
            message:"Nao foi possivel desativar o conteudo."
        });
    }
}