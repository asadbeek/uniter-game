import express from "express";
import { verifyToken } from "../middleware/verifyToken.js";
import {
  createTeam,
  deleteTeam,
  getTeamById,
  getTeams,
  updateTeam,
} from "../controllers/team.controller.js";

const router = express.Router();

router.get("/", getTeams);
router.get("/:id", getTeamById);
router.post("/", verifyToken, createTeam);

// Route for updating and deleting a team
router.put("/:id", verifyToken, updateTeam);
router.delete("/:id", verifyToken, deleteTeam);

export default router;
