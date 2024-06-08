import express from "express";
import { verifyToken } from "../middleware/verifyToken.js";
import {
  createTeam,
  deleteTeam,
  getTeamById,
  getTeams,
  getTeamsByCategory,
  updateTeam,
  matchTeam,
  approveTeamMatch,
} from "../controllers/team.controller.js";

const router = express.Router();

router.get("/", getTeams);
router.get("/:id", getTeamById);
router.post("/:userId", createTeam);
router.get("/category/:category", getTeamsByCategory);
router.get("/match/:userId/:teamId", matchTeam);
router.get("/approve_match_team/:userId/:teamId", approveTeamMatch);

// Route for updating and deleting a team
router.put("/:id", updateTeam);
router.delete("/:id", deleteTeam);

export default router;
