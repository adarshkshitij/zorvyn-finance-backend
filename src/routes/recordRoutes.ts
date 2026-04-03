import { Router } from "express";
import { createRecord, deleteRecord, getRecordById, getRecords, updateRecord } from "../controllers/recordController";
import { requireAuth } from "../middlewares/auth";
import { requireRole } from "../middlewares/role";
import { validate } from "../middlewares/validate";
import { createRecordSchema, recordQuerySchema, updateRecordSchema, uuidParamSchema } from "../schemas";
import { Role } from "../utils/constants";

const router = Router();

router.use(requireAuth);

router.get("/", validate({ query: recordQuerySchema }), requireRole(Role.admin, Role.analyst, Role.viewer), getRecords);
router.get("/:id", validate({ params: uuidParamSchema }), requireRole(Role.admin, Role.analyst, Role.viewer), getRecordById);
router.post("/", requireRole(Role.admin), validate({ body: createRecordSchema }), createRecord);
router.patch("/:id", requireRole(Role.admin), validate({ params: uuidParamSchema, body: updateRecordSchema }), updateRecord);
router.delete("/:id", requireRole(Role.admin), validate({ params: uuidParamSchema }), deleteRecord);

export default router;
