import express, { Router } from "express";
import { Request, Response } from "express";
import { getRoles, getRoleById, postRoles, editRole, deleteRole } from "../controllers/role.controller";

const router: Router = express.Router();

router.get("/", getRoles);
router.get("/:id", getRoleById);
router.post("/", postRoles);
router.put("/:id", editRole);
router.delete("/:id", deleteRole);

export default router;