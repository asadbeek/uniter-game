import express from "express";
import {
  createGame,
  deleteGame,
  updateGame,
  getGames,
  getGameById,
} from "../controllers/game.controller.js";

const router = express.Router();

router.get("/all", getGames);
router.get("/:id", getGameById);
router.post("/:adminId", createGame);
router.put("/updateGames/:id", updateGame);
router.delete("/deleteGames/:id", deleteGame);

export default router;
