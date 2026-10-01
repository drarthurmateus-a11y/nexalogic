import {Router} from "express";
import {
    login,
    logout,
    me
} from "../controllers/auth-controller.js";
import {requireAdmin} from "../middleware/auth.js";
import {
    loginLimiter
} from "../middleware/rate-limit.js";

const router=Router();

router.post(
    "/login",
    loginLimiter,
    login
);
router.post("/logout",logout);
router.get("/me",requireAdmin,me);

export default router;