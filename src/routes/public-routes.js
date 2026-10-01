import {Router} from "express";
import {supabase} from "../config/supabase.js";
import {storeLead} from "../controllers/lead-controller.js";
import {listPublicPlans} from "../controllers/plan-controller.js";
import {storeEnrollment} from "../controllers/enrollment-controller.js";
import {
    listPublicContent
} from "../controllers/content-controller.js";
import {
    showSettings
} from "../controllers/settings-controller.js";

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
router.get("/public/plans",listPublicPlans);
router.post("/enrollments",storeEnrollment);
router.get(
    "/public/content",
    listPublicContent
);
router.get(
    "/public/settings",
    showSettings
);

export default router;