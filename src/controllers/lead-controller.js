import {createLead} from "../services/lead-service.js";
import {validateLead} from "../utils/validators.js";

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