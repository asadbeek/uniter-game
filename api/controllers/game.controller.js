import prisma from "../lib/prisma.js";

export const getGames = async (req, res) => {
  try {
    const games = await prisma.game.findMany();

    console.log(games);

    res.status(200).json(games);
  } catch (error) {
    console.error("Error creating game:", error);
    res.status(500).json({ error: `Failed to create game: ${error.message}` });
  }
};

export const getGameById = async (req, res) => {
  const { id } = req.params;
  try {
    const game = await prisma.game.findUniqueOrThrow({
      where: {
        id,
      },
    });

    console.log(game);

    res.status(200).json(game);
  } catch (error) {
    console.error("Error getting game:", error);
    res.status(500).json({ error: `Failed to getting game: ${error.message}` });
  }
};

export const createGame = async (req, res) => {
  const { category, name, description, image } = req.body;
  const { adminId } = req.params;

  try {
    // Create the game record in the database including the image path
    const newGame = await prisma.game.create({
      data: {
        category,
        name,
        description,
        image,
        creator: { connect: { id: adminId } },
      },
    });

    res
      .status(201)
      .json({ message: "Game created successfully", game: newGame });
  } catch (error) {
    console.error("Error creating game:", error);
    res.status(500).json({ error: `Failed to create game: ${error.message}` });
  }
};

export const updateGame = async (req, res) => {
  const gameId = req.params.id; // Keep gameId as string

  const { category, name, description, image } = req.body;

  try {
    const game = await prisma.game.update({
      where: { id: gameId }, // Use gameId as string
      data: {
        category,
        name,
        description,
        image,
      },
    });

    res.status(200).json({ message: "Game updated successfully", game });
  } catch (error) {
    console.error("Error updating game:", error);
    res.status(500).json({ error: `Failed to update game: ${error.message}` });
  }
};

export const deleteGame = async (req, res) => {
  const gameId = req.params.id; // Keep gameId as string

  try {
    const game = await prisma.game.delete({
      where: { id: gameId }, // Use gameId as string
    });

    res.status(200).json({ message: "Game deleted successfully", game });
  } catch (error) {
    console.error("Error deleting game:", error);
    res.status(500).json({ error: `Failed to delete game: ${error.message}` });
  }
};
