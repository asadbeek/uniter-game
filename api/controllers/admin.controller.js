import prisma from "../lib/prisma.js";
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
