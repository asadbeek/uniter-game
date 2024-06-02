import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import prisma from "../lib/prisma.js";
import { emailVerification } from "./services/emailService.js";

export const register = async (req, res) => {
  const { username, email, password } = req.body;

  try {
    // HASH THE PASSWORD

    const hashedPassword = await bcrypt.hash(password, 10);

    console.log(hashedPassword);

    // CREATE A NEW USER AND SAVE TO DB
    const newUser = await prisma.user.create({
      data: {
        username,
        email,
        password: hashedPassword,
      },
    });

    const token = jwt.sign({ userId: newUser.id }, process.env.JWT_SECRET_KEY, {
      expiresIn: "1h",
    });

    // Save the token and its expiration time to the database
    await prisma.token.create({
      data: {
        token,
        userId: newUser.id,
        expiresAt: new Date(Date.now() + 3600 * 1000), // 1 hour from now
      },
    });

    emailVerification(newUser, token);

    res.status(201).json({ message: "User created successfully" });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Failed to create user!" });
  }
};

export const login = async (req, res) => {
  const { username, password } = req.body;

  try {
    const user = await prisma.user.findUnique({
      where: { username },
      include: {
        teams: true,
      },
    });

    if (!user) return res.status(401).json({ message: "Invalid Credentials!" });

    if (user && !user.isVerified) {
      return res.status(401).json({ message: "Verify your account!" });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid)
      return res.status(401).json({ message: "Invalid Credentials!" });

    const age = 1000 * 60 * 60 * 24 * 7;

    const token = jwt.sign(
      {
        id: user.id,
        isAdmin: false,
      },
      process.env.JWT_SECRET_KEY,
      { expiresIn: age }
    );

    const { password: userPassword, ...userInfo } = user;

    res
      .cookie("token", token, {
        httpOnly: false,
        secure: false,
        maxAge: age,
        sameSite: "None",
      })
      .status(200)
      .json(userInfo);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Failed to login" });
  }
};

export const logout = (req, res) => {
  res.clearCookie("token").status(200).json({ message: "Logout Successful" });
};

export const verifyEmail = async (req, res) => {
  const { userId, tokenId } = req.params;

  if (!tokenId) {
    return res.status(400).json({ message: "Missing Token" });
  }

  try {
    // Verify the token
    const decoded = jwt.verify(tokenId, process.env.JWT_SECRET_KEY);

    // Check if the token exists and is not expired
    const verificationToken = await prisma.token.findUnique({
      where: { token: tokenId },
    });

    if (!verificationToken || verificationToken.expiresAt < new Date()) {
      return res.status(400).json({ message: "Invalid or expired token" });
    }

    // Update the user's verified status
    await prisma.user.update({
      where: { id: verificationToken.userId },
      data: { isVerified: true },
    });

    res.status(200).json({ message: "Email verified successfully" });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Failed to verify email" });
  }
};
