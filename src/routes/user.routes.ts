import express, { Router } from "express";
import { Request, Response } from "express";
import { getUsers, getUserById, postUsers, editUser, deleteUser } from "../controllers/user.controller";

const router: Router = express.Router();

router.get("/", getUsers);
router.get("/:id", getUserById);
router.post("/", postUsers);
router.put("/:id", editUser);
router.delete("/:id", deleteUser);

export default router;