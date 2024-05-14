import express from "express";
import {
  deleteUser,
  updateUser,
  getUser,
  getUsers,
} from "../controllers/user.controller.js";
import { verifyToken } from "../middleware/verifyToken.js";

const router = express.Router();

router.get("/", getUsers);
router.get("/:id", verifyToken, getUser);
router.put("/update/:id", verifyToken, updateUser);
router.delete("/delete/:id", verifyToken, deleteUser);

export default router;
