import jwt from "jsonwebtoken";
import prisma from "../lib/prisma.js";

export const verifyToken = (req, res, next) => {
  const token = req.cookies.token;

  if (!token) return res.status(401).json({ message: "Not Authenticated!" });

  // const user = prisma.admin.findUniqueOrThrow({
  //   where: {
  //     username,
  //   },
  // });

  jwt.verify(token, process.env.JWT_SECRET_KEY, async (err, payload) => {
    if (err) return res.status(403).json({ message: "Token is not Valid!" });
    console.log("payload", payload);
    req.userId = payload.id;

    next();
  });
};
