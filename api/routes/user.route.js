import express from "express";
import {
  createTeam,
  updateTeam,
  deleteTeam,
  deleteUser,
  updateUser,
} from "../controllers/user.controller.js";

const router = express.Router();

router.put("/update/:id", updateUser);
router.delete("/delete/:id", deleteUser);

// Route for creating a new team
router.post("/teams", createTeam);

// Route for updating an existing team
router.put("/teamsUpdate/:id", updateTeam);

// Route for deleting a team
router.delete("/teamsDelete/:id", deleteTeam);

export default router;
