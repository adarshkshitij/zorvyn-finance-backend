import { Router } from "express";
import { getProfile, login, registerAdmin } from "../controllers/authController";
import { requireAuth } from "../middlewares/auth";
import { validate } from "../middlewares/validate";
import { loginSchema, registerAdminSchema } from "../schemas";

const router = Router();

router.post("/register-admin", validate({ body: registerAdminSchema }), registerAdmin);
router.post("/login", validate({ body: loginSchema }), login);
router.get("/me", requireAuth, getProfile);

export default router;
