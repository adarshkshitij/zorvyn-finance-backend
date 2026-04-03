import { Router } from "express";
import { getSummary } from "../controllers/summaryController";
import { requireAuth } from "../middlewares/auth";
import { requireRole } from "../middlewares/role";
import { validate } from "../middlewares/validate";
import { summaryQuerySchema } from "../schemas";
import { Role } from "../utils/constants";

const router = Router();

router.get("/", requireAuth, requireRole(Role.admin, Role.analyst, Role.viewer), validate({ query: summaryQuerySchema }), getSummary);

export default router;
