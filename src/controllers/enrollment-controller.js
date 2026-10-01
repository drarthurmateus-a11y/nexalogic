import {
    getActiveEnrollmentPlan,
    createEnrollment,
    getEnrollments,
    changeEnrollmentStatus
} from "../services/enrollment-service.js";

import {
    validateEnrollment,
    isValidUuid
} from "../utils/validators.js";

export async function storeEnrollment(req,res){
    const validation=validateEnrollment(req.body);

    if(!validation.valid){
        return res.status(400).json({
            success:false,
            message:"Verifique os campos enviados.",
            errors:validation.errors
        });
    }

    try{
        const plan=await getActiveEnrollmentPlan(
            validation.data.plan_id
        );

        if(!plan){
            return res.status(400).json({
                success:false,
                message:"Este plano nao esta disponivel."
            });
        }

        const enrollment=await createEnrollment(
            validation.data
        );

        return res.status(201).json({
            success:true,
            message:"Pre-matricula enviada com sucesso.",
            enrollment:{
                id:enrollment.id,
                status:enrollment.status,
                createdAt:enrollment.created_at
            }
        });

    }catch(error){
        console.error(
            "Erro ao criar matricula:",
            error.message
        );

        return res.status(500).json({
            success:false,
            message:"Nao foi possivel enviar a pre-matricula."
        });
    }
}

export async function listEnrollments(req,res){
    try{
        const enrollments=await getEnrollments();

        return res.json({
            success:true,
            enrollments
        });

    }catch(error){
        console.error(
            "Erro ao buscar matriculas:",
            error.message
        );

        return res.status(500).json({
            success:false,
            message:"Nao foi possivel carregar as matriculas."
        });
    }
}

export async function updateEnrollmentStatus(req,res){
    const id=String(req.params.id||"");
    const status=String(req.body?.status||"");

    if(!isValidUuid(id)){
        return res.status(400).json({
            success:false,
            message:"Matricula invalida."
        });
    }

    if(![
        "pending",
        "approved",
        "cancelled"
    ].includes(status)){
        return res.status(400).json({
            success:false,
            message:"Status invalido."
        });
    }

    try{
        const enrollment=
            await changeEnrollmentStatus(
                id,
                status
            );

        if(!enrollment){
            return res.status(404).json({
                success:false,
                message:"Matricula nao encontrada."
            });
        }

        return res.json({
            success:true,
            message:"Status atualizado.",
            enrollment
        });

    }catch(error){
        console.error(
            "Erro ao atualizar matricula:",
            error.message
        );

        return res.status(500).json({
            success:false,
            message:"Nao foi possivel atualizar a matricula."
        });
    }
}