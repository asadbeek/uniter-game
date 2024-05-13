import express from "express";
import {
  createTeam,
  updateTeam,
  deleteTeam,
  deleteUser,
  updateUser,
  getTeamById,
  getTeams,
} from "../controllers/user.controller.js";

const router = express.Router();

router.put("/update/:id", updateUser);
router.delete("/delete/:id", deleteUser);

// Route for creating a new team
router.post("/team/:userId", createTeam);
router.get("/team/:id", getTeamById);
router.get("/teams", getTeams);

// Route for updating an existing team
router.put("/teamsUpdate/:id", updateTeam);

// Route for deleting a team
router.delete("/teamsDelete/:id", deleteTeam);

export default router;
