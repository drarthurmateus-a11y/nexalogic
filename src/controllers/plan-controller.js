import {
    getPlans,
    getActivePlans,
    createPlan,
    updatePlan,
    disablePlan
} from "../services/plan-service.js";

import {
    validatePlan,
    isValidUuid
} from "../utils/validators.js";

export async function listPlans(req,res){
    try{
        const plans=await getPlans();

        return res.json({
            success:true,
            plans
        });

    }catch(error){
        console.error(
            "Erro ao buscar planos:",
            error.message
        );

        return res.status(500).json({
            success:false,
            message:"Nao foi possivel carregar os planos."
        });
    }
}

export async function storePlan(req,res){
    const validation=validatePlan(req.body);

    if(!validation.valid){
        return res.status(400).json({
            success:false,
            message:"Verifique os campos.",
            errors:validation.errors
        });
    }

    try{
        const plan=await createPlan(validation.data);

        return res.status(201).json({
            success:true,
            message:"Plano criado com sucesso.",
            plan
        });

    }catch(error){
        console.error(
            "Erro ao criar plano:",
            error.message
        );

        return res.status(500).json({
            success:false,
            message:"Nao foi possivel criar o plano."
        });
    }
}

export async function editPlan(req,res){
    const id=String(req.params.id||"");

    if(!isValidUuid(id)){
        return res.status(400).json({
            success:false,
            message:"Plano invalido."
        });
    }

    const validation=validatePlan(req.body);

    if(!validation.valid){
        return res.status(400).json({
            success:false,
            message:"Verifique os campos.",
            errors:validation.errors
        });
    }

    try{
        const plan=await updatePlan(
            id,
            validation.data
        );

        if(!plan){
            return res.status(404).json({
                success:false,
                message:"Plano nao encontrado."
            });
        }

        return res.json({
            success:true,
            message:"Plano atualizado.",
            plan
        });

    }catch(error){
        console.error(
            "Erro ao atualizar plano:",
            error.message
        );

        return res.status(500).json({
            success:false,
            message:"Nao foi possivel atualizar o plano."
        });
    }
}

export async function removePlan(req,res){
    const id=String(req.params.id||"");

    if(!isValidUuid(id)){
        return res.status(400).json({
            success:false,
            message:"Plano invalido."
        });
    }

    try{
        const plan=await disablePlan(id);

        if(!plan){
            return res.status(404).json({
                success:false,
                message:"Plano nao encontrado."
            });
        }

        return res.json({
            success:true,
            message:"Plano desativado."
        });

    }catch(error){
        console.error(
            "Erro ao desativar plano:",
            error.message
        );

        return res.status(500).json({
            success:false,
            message:"Nao foi possivel desativar o plano."
        });
    }
}
export async function listPublicPlans(req,res){
    try{
        const plans=await getActivePlans();

        return res.json({
            success:true,
            plans
        });

    }catch(error){
        console.error(
            "Erro ao buscar planos publicos:",
            error.message
        );

        return res.status(500).json({
            success:false,
            message:"Nao foi possivel carregar os planos."
        });
    }
}