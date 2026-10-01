import {
    getSettings,
    updateSettings
} from "../services/settings-service.js";

import {
    validateSettings
} from "../utils/validators.js";

export async function showSettings(req,res){
    try{
        const settings=await getSettings();

        return res.json({
            success:true,
            settings
        });

    }catch(error){
        console.error(
            "Erro ao buscar configuracoes:",
            error.message
        );

        return res.status(500).json({
            success:false,
            message:"Nao foi possivel carregar as configuracoes."
        });
    }
}

export async function saveSettings(req,res){
    const validation=validateSettings(req.body);

    if(!validation.valid){
        return res.status(400).json({
            success:false,
            message:"Verifique os campos.",
            errors:validation.errors
        });
    }

    try{
        const settings=await updateSettings(
            validation.data
        );

        return res.json({
            success:true,
            message:"Configuracoes atualizadas.",
            settings
        });

    }catch(error){
        console.error(
            "Erro ao atualizar configuracoes:",
            error.message
        );

        return res.status(500).json({
            success:false,
            message:"Nao foi possivel atualizar as configuracoes."
        });
    }
}