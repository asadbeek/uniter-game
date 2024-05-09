import express from "express";
import {
  createGame,
  approveTeam,
  createAdmin,
} from "../controllers/admin.controller.js";

const router = express.Router();

router.post("/admin", createAdmin);
router.post("/games", createGame); // Create a new game
router.put("/teams/approve/:teamId", approveTeam); // Approve a team by ID

export default router;
