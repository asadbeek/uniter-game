import bcrypt from "bcrypt";
import prisma from "../lib/prisma.js";

export const getTeamById = async (req, res) => {
  const { id } = req.params;

  try {
    // Use Prisma to team the user with the specified ID
    const team = await prisma.team.findUniqueOrThrow({
      where: { id },
    });

    res.status(200).json({
      team,
    });
  } catch (error) {
    console.error("Error team user:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const getTeams = async (req, res) => {
  try {
    // Use Prisma to team the user with the specified ID
    const teams = await prisma.team.findMany();

    res.status(200).json({
      teams,
    });
  } catch (error) {
    console.error("Error teams user:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const updateUser = async (req, res) => {
  const { id } = req.params;
  const { username, password } = req.body;

  // Create an object to hold the update data
  let updateData = {
    ...(username && { username }),
  };

  // Only hash the password and include it in the update if it's provided
  if (password) {
    try {
      const hashedPassword = await bcrypt.hash(password, 10);
      updateData.password = hashedPassword;
    } catch (error) {
      console.error("Error hashing password:", error);
      return res
        .status(500)
        .json({ error: "Internal server error while hashing password" });
    }
  }

  // Ensure that there's something to update
  if (Object.keys(updateData).length === 0) {
    return res
      .status(400)
      .json({ error: "No valid fields provided for update" });
  }

  try {
    const updatedUser = await prisma.user.update({
      where: { id },
      data: updateData,
    });
    res.status(200).json({
      message: "User updated successfully",
      user: updatedUser,
    });
  } catch (error) {
    console.error("Error updating user:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const deleteUser = async (req, res) => {
  const { id } = req.params;

  try {
    // Use Prisma to delete the user with the specified ID
    const deletedUser = await prisma.user.delete({
      where: { id },
    });

    res.status(200).json({
      message: "User deleted successfully",
      user: deletedUser,
    });
  } catch (error) {
    console.error("Error deleting user:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

// Create a new team

export const createTeam = async (req, res) => {
  const {
    category,
    name,
    numberOfPlayers,
    games,
    description,
    availableDaysAndTimes,
  } = req.body;
  const { userId } = req.params; // Assuming 'userId' is extracted from authentication middleware

  try {
    const newTeam = await prisma.team.create({
      data: {
        category,
        name,
        numberOfPlayers,
        games,
        description,
        availableDaysAndTimes,
        creator: { connect: { id: userId } }, // Connect the team to the user (creator)
      },
    });

    res
      .status(201)
      .json({ message: "Team created successfully", team: newTeam });
  } catch (error) {
    console.error("Error creating team:", error);
    res.status(500).json({ error: `Failed to create team: ${error.message}` });
  }
};

// Update team details
export const updateTeam = async (req, res) => {
  const { id } = req.params;
  const { name, numberOfPlayers, games, description, availableDaysAndTimes } =
    req.body;

  try {
    const updatedTeam = await prisma.team.update({
      where: { id },
      data: {
        name,
        numberOfPlayers,
        games,
        description,
        availableDaysAndTimes,
      },
    });

    res.status(200).json({
      message: "Team updated successfully",
      team: updatedTeam,
    });
  } catch (error) {
    console.error("Error updating team:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

// Delete a team
export const deleteTeam = async (req, res) => {
  const { id } = req.params;

  try {
    // Use Prisma to delete the team with the specified ID
    const deletedTeam = await prisma.team.delete({
      where: { id },
    });

    res.status(200).json({
      message: "Team deleted successfully",
      team: deletedTeam,
    });
  } catch (error) {
    console.error("Error deleting team:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};
