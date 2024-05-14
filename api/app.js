import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import teamRoute from "./routes/team.route.js";
import authRoute from "./routes/auth.route.js";
import adminRoute from "./routes/admin.route.js";
import userRoute from "./routes/user.route.js";
import testRoute from "./routes/test.route.js";
import gameRoute from "./routes/game.route.js";

const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(cors({ origin: process.env.CLIENT_URL, credentials: true }));

app.use("/api/team", teamRoute);
app.use("/api/auth", authRoute);
app.use("/api/test", testRoute);
app.use("/api/admin", adminRoute);
app.use("/api/users", userRoute);
app.use("/api/games", gameRoute);

app.listen(8800, () => {
  console.log("Server is running");
});
