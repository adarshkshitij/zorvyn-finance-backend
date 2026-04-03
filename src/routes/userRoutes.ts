import { Router } from "express";
import { createUser, getUserById, getUsers, updateUser } from "../controllers/userController";
import { requireAuth } from "../middlewares/auth";
import { requireRole } from "../middlewares/role";
import { validate } from "../middlewares/validate";
import { createUserSchema, updateUserSchema, userQuerySchema, uuidParamSchema } from "../schemas";
import { Role } from "../utils/constants";

const router = Router();

router.use(requireAuth, requireRole(Role.admin));

router.get("/", validate({ query: userQuerySchema }), getUsers);
router.get("/:id", validate({ params: uuidParamSchema }), getUserById);
router.post("/", validate({ body: createUserSchema }), createUser);
router.patch("/:id", validate({ params: uuidParamSchema, body: updateUserSchema }), updateUser);

export default router;
