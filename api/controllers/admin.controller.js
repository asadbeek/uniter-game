import prisma from "../lib/prisma.js";
import path from "path";
import { v4 as uuidv4 } from "uuid";
import fs from "fs";
import bcrypt from "bcrypt";

export const createAdmin = async (req, res) => {
  const adminUsername = "admin";
  const adminPassword = "12345";
  const adminRole = "admin"; // Default role for admin users

  try {
    const hashedAdminPassword = await bcrypt.hash(adminPassword, 10);

    const adminUser = await prisma.admin.create({
      data: {
        username: adminUsername,
        password: hashedAdminPassword,
        role: adminRole,
      },
    });

    res
      .status(201)
      .json({ message: "Admin user created successfully", adminUser });
  } catch (error) {
    console.error("Error creating admin user:", error);
    res.status(500).json({ error: "Failed to create admin user" });
  }
};

export const createGame = async (req, res) => {
  const { category, name, description, creatorId } = req.body;
  const { file } = req; // Assuming 'file' is the uploaded image file

  try {
    let imagePath = null;

    if (file) {
      // Save the image file to a folder (e.g., 'uploads') and generate a unique filename
      const uniqueFilename = `${uuidv4()}${path.extname(file.originalname)}`;
      const uploadPath = path.join(__dirname, "../uploads", uniqueFilename);

      await fs.promises.mkdir(path.dirname(uploadPath), { recursive: true });
      await fs.promises.writeFile(uploadPath, file.buffer);

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

// Approve a team by ID
export const approveTeam = async (req, res) => {
  const { teamId } = req.params;

  try {
    const team = await prisma.team.update({
      where: { id: parseInt(teamId) },
      data: {
        approved: true,
      },
    });

    res.status(200).json({ message: "Team approved successfully", team });
  } catch (error) {
    console.error("Error approving team:", error);
    res.status(500).json({ error: "Failed to approve team" });
  }
};
