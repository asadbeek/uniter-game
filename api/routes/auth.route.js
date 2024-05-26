import express from "express";
import {
  login,
  logout,
  register,
  verifyEmail,
} from "../controllers/auth.controller.js";

const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.post("/logout", logout);

router.get("/verify-email/:token", verifyEmail);

export default router;
