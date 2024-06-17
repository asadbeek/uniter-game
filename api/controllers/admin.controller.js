import prisma from "../lib/prisma.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const createAdmin = async (req, res) => {
  const { username, password } = req.body;
  const adminRole = "admin"; // Default role for admin users

  try {
    const hashedAdminPassword = await bcrypt.hash(password, 10);

    const adminUser = await prisma.admin.create({
      data: {
        username,
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

export const adminLogin = async (req, res) => {
  const { username, password } = req.body;

  console.log(username, password);

  try {
    // Retrieve admin user from the database
    const adminUser = await prisma.admin.findUnique({
      where: { username },
    });

    if (!adminUser) {
      return res.status(401).json({ message: "Invalid username or password" });
    }

    // Check if the password is correct
    const passwordMatch = await bcrypt.compare(password, adminUser.password);

    if (!passwordMatch) {
      return res.status(401).json({ message: "Invalid username or password" });
    }

    const age = 1000 * 60 * 60 * 24 * 7;

    console.log("adminUser", adminUser);

    const token = jwt.sign(
      {
        id: adminUser.id,
        isAdmin: true,
      },
      process.env.JWT_SECRET_KEY,
      { expiresIn: age }
    );

    // If credentials are correct, return the admin user
    res
      .cookie("token", token, {
        httpOnly: true,
        maxAge: age,
      })
      .status(200)
      .json(adminUser);
  } catch (error) {
    console.error("Error logging in admin:", error);
    res.status(500).json({ error: "Failed to log in admin" });
  }
};

export const adminLogout = (req, res) => {
  res.status(200).json({ message: "Logout Successful" });
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
