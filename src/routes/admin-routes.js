import {Router} from "express";
import {requireAdmin} from "../middleware/auth.js";

import {
    listLeads,
    updateLeadStatus
} from "../controllers/lead-controller.js";

import {
    listPlans,
    storePlan,
    editPlan,
    removePlan
} from "../controllers/plan-controller.js";

const router=Router();

router.use(requireAdmin);

router.get("/leads",listLeads);
router.put("/leads/:id/status",updateLeadStatus);

router.get("/plans",listPlans);
router.post("/plans",storePlan);
router.put("/plans/:id",editPlan);
router.delete("/plans/:id",removePlan);

export default router;