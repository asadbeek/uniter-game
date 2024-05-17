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
router.post("/:userId", createTeam);

// Route for updating and deleting a team
router.put("/:id", updateTeam);
router.delete("/:id", deleteTeam);

export default router;
