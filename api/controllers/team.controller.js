import prisma from "../lib/prisma.js";

// Create a new team

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

export const createTeam = async (req, res) => {
  const {
    category,
    name,
    img,
    numberOfPlayers,
    description,
    availableDaysAndTimes,
  } = req.body;
  const { userId } = req.params; // Assuming 'userId' is extracted from authentication middleware

  try {
    const newTeam = await prisma.team.create({
      data: {
        category,
        name,
        img,
        numberOfPlayers,
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
  const { name, img, numberOfPlayers, description, availableDaysAndTimes } =
    req.body;

  try {
    const updatedTeam = await prisma.team.update({
      where: { id },
      data: {
        name,
        img,
        numberOfPlayers,
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
