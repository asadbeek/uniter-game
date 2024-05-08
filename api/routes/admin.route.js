import express from "express";
import { createGame, approveTeam } from "../controllers/admin.controller.js";

const router = express.Router();

router.post("/games", createGame); // Create a new game
router.put("/teams/approve/:teamId", approveTeam); // Approve a team by ID

export default router;
