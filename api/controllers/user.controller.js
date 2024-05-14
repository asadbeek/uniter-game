import bcrypt from "bcrypt";
import prisma from "../lib/prisma.js";

export const getUsers = async (req, res) => {
  try {
    const users = await prisma.user.findMany();
    res.status(200).json(users);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Failed to get users!" });
  }
};

export const getUser = async (req, res) => {
  const id = req.params.id;
  try {
    const user = await prisma.user.findUnique({
      where: { id },
    });
    res.status(200).json(user);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Failed to get user!" });
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
