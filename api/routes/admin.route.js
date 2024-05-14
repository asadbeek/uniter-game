import express from "express";
import { approveTeam, createAdmin } from "../controllers/admin.controller.js";

const router = express.Router();

router.post("/admin", createAdmin);

router.put("/teams/approve/:teamId", approveTeam); // Approve a team by ID

export default router;
