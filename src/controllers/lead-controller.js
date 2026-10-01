import {
    createLead,
    getLeads,
    changeLeadStatus
} from "../services/lead-service.js";

import {
    validateLead,
    isValidUuid
} from "../utils/validators.js";

export async function storeLead(req,res){
    const validation=validateLead(req.body);

    if(!validation.valid){
        return res.status(400).json({
            success:false,
            message:"Verifique os campos enviados.",
            errors:validation.errors
        });
    }

    try{
        const lead=await createLead(validation.data);

        return res.status(201).json({
            success:true,
            message:"Mensagem enviada com sucesso.",
            lead:{
                id:lead.id,
                createdAt:lead.created_at
            }
        });

    }catch(error){
        console.error("Erro ao criar lead:",error.message);

        return res.status(500).json({
            success:false,
            message:"Nao foi possivel enviar sua mensagem."
        });
    }
}

export async function listLeads(req,res){
    try{
        const leads=await getLeads();

        return res.json({
            success:true,
            leads
        });

    }catch(error){
        console.error("Erro ao buscar leads:",error.message);

        return res.status(500).json({
            success:false,
            message:"Nao foi possivel carregar os leads."
        });
    }
}

export async function updateLeadStatus(req,res){
    const id=String(req.params.id||"");
    const status=String(req.body?.status||"");

    if(!isValidUuid(id)){
        return res.status(400).json({
            success:false,
            message:"Lead invalido."
        });
    }

    if(!["new","contacted","closed"].includes(status)){
        return res.status(400).json({
            success:false,
            message:"Status invalido."
        });
    }

    try{
        const lead=await changeLeadStatus(id,status);

        if(!lead){
            return res.status(404).json({
                success:false,
                message:"Lead nao encontrado."
            });
        }

        return res.json({
            success:true,
            message:"Status atualizado.",
            lead
        });

    }catch(error){
        console.error(
            "Erro ao atualizar lead:",
            error.message
        );

        return res.status(500).json({
            success:false,
            message:"Nao foi possivel atualizar o lead."
        });
    }
}