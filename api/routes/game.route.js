import express from "express";
import { createGame } from "../controllers/game.controller.js";

const router = express.Router();

router.post("/games", createGame); // Create a new game

export default router;
