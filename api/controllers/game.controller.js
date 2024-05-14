import prisma from "../lib/prisma.js";
import path from "path";
import fs from "fs/promises"; // Use fs.promises for async file operations

export const createGame = async (req, res) => {
  const { category, name, description, creatorId } = req.body;
  const { file } = req; // Assuming 'file' is the uploaded image file

  try {
    let imagePath = null;

    if (file) {
      // Save the image file to a folder (e.g., 'uploads') and generate a unique filename
      const uniqueFilename = `${uuidv4()}${path.extname(file.originalname)}`;
      const uploadPath = path.join(__dirname, "../uploads", uniqueFilename);

      await fs.mkdir(path.dirname(uploadPath), { recursive: true });
      await fs.writeFile(uploadPath, file.buffer);

      // Set the imagePath to the relative path of the uploaded image
      imagePath = `/uploads/${uniqueFilename}`;
    }

    // Create the game record in the database including the image path
    const newGame = await prisma.game.create({
      data: {
        category,
        name,
        description,
        image: imagePath,
        creatorId,
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

  const { category, name, description } = req.body;

  try {
    const game = await prisma.game.update({
      where: { id: gameId }, // Use gameId as string
      data: {
        category,
        name,
        description,
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
