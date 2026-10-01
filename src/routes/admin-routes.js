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

import {
    listEnrollments,
    updateEnrollmentStatus
} from "../controllers/enrollment-controller.js";

import {
    listContent,
    storeContent,
    editContent,
    removeContent
} from "../controllers/content-controller.js";
import {
    showSettings,
    saveSettings
} from "../controllers/settings-controller.js";

const router=Router();

router.use(requireAdmin);

router.get("/leads",listLeads);
router.put("/leads/:id/status",updateLeadStatus);

router.get("/plans",listPlans);
router.post("/plans",storePlan);
router.put("/plans/:id",editPlan);
router.delete("/plans/:id",removePlan);

router.get("/enrollments",listEnrollments);

router.put(
    "/enrollments/:id/status",
    updateEnrollmentStatus
);
router.get("/content",listContent);
router.post("/content",storeContent);
router.put("/content/:id",editContent);
router.delete("/content/:id",removeContent);
router.get(
    "/settings",
    showSettings
);

router.put(
    "/settings",
    saveSettings
);
export default router;