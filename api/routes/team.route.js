import express from "express";
import {
  createTeam,
  deleteTeam,
  getTeamById,
  getTeams,
  updateTeam,
} from "../controllers/team.controller.js";

const router = express.Router();

router.post("/team/:userId", createTeam);
router.get("/team/:id", getTeamById);
router.get("/teams", getTeams);

// Route for updating and deleting a team
router.put("/teamsUpdate/:id", updateTeam);
router.delete("/teamsDelete/:id", deleteTeam);

export default router;
