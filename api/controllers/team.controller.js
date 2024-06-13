import prisma from "../lib/prisma.js";
import { matchService } from "./services/matchService.js";

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

export const getTeamById = async (req, res) => {
  const { id } = req.params;

  try {
    // Use Prisma to team the user with the specified ID
    const team = await prisma.team.findUniqueOrThrow({
      where: { id },
      include: {
        creator: true,
        matchedTeam: true,
        matcher: true,
      },
    });

    res.status(200).json({
      team,
    });
  } catch (error) {
    console.error("Error team user:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

// Create a new team

export const createTeam = async (req, res) => {
  const {
    category,
    name,
    img,
    city,
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
        city,
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
  const {
    category,
    name,
    img,
    city,
    numberOfPlayers,
    description,
    availableDaysAndTimes,
  } = req.body;

  try {
    const updatedTeam = await prisma.team.update({
      where: { id },
      data: {
        category,
        name,
        img,
        city,
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

export const getTeamsByCategory = async (req, res) => {
  const { category } = req.params;
  try {
    const teams = await prisma.team.findMany({
      where: {
        category: {
          contains: category,
        },
      },
    });

    res.status(200).json(teams);
  } catch (error) {
    console.error("Error fetching teams by category:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const emailMatchTeam = async (req, res) => {
  // sending email
  const { userId, teamId } = req.params;
  try {
    const team = await prisma.team.findUniqueOrThrow({
      where: {
        id: teamId,
      },
      include: {
        creator: true,
      },
    });

    const user = await prisma.user.findUniqueOrThrow({
      where: {
        id: userId,
      },
      include: {
        teams: true,
      },
    });

    if (!team) {
      res.status(404).json({ error: "No team found" });
      return;
    }

    if (!user) {
      res.status(404).json({ error: "No user found" });
    }

    await matchService(user, team?.creator, team);

    res
      .status(200)
      .json(
        `User ${user?.username} vs Opponent ${team.creator?.username} --- game`
      );
  } catch (error) {
    console.error("Error sending email", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const approveTeamMatch = async (req, res) => {
  const { userId, teamId } = req.params;
  try {
    const team = await prisma.team.findUniqueOrThrow({
      where: {
        id: teamId,
      },
      include: {
        creator: true,
      },
    });

    const user = await prisma.user.findUniqueOrThrow({
      where: {
        id: userId,
      },
      include: {
        teams: true,
      },
    });

    const userTeam = user.teams[0];

    if (!team) {
      res.status(404).json({ error: "No team found" });
      return;
    }

    if (!user) {
      res.status(404).json({ error: "No user found" });
    }

    const matcherTeam = await prisma.team.update({
      where: {
        id: team.id,
      },
      data: {
        matchedId: userTeam.id,
      },
    });

    res.status(200).json(matcherTeam);
  } catch (error) {
    console.error("Error Matching team", error);
    res.status(500).json({ error: "Internal server error" });
  }
};
