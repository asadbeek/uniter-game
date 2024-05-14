import express from "express";
import {
  createGame,
  deleteGame,
  updateGame,
} from "../controllers/game.controller.js";

const router = express.Router();

router.post("/games", createGame);
router.put("/updateGames/:id", updateGame);
router.delete("/deleteGames/:id", deleteGame);

export default router;
