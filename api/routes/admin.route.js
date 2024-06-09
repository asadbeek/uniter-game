import express from "express";
import {
  adminLogin,
  approveTeam,
  createAdmin,
  adminLogout,
} from "../controllers/admin.controller.js";

const router = express.Router();

router.post("/admin", createAdmin);
router.post("/login", adminLogin);
router.post("/logout", adminLogout);

router.put("/teams/approve/:teamId", approveTeam); // Approve a team by ID

export default router;
