import {Router} from "express";
import {supabase} from "../config/supabase.js";
import {storeLead} from "../controllers/lead-controller.js";

const router=Router();

router.get("/health",async(req,res)=>{
    const {error}=await supabase
        .from("site_settings")
        .select("id")
        .limit(1);

    if(error){
        return res.status(500).json({
            status:"error",
            database:false
        });
    }

    return res.json({
        status:"ok",
        database:true,
        service:"forca-prime"
    });
});

router.post("/leads",storeLead);

export default router;