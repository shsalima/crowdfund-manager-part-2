import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import router from "./routes/authRoute.route.js";
import projectRoutes from "./routes/projectRoute.js";
import investRoute from "./routes/investmentRoute.route.js";
import balanceRoute from "./routes/balanceRoutes.route.js";
import cors from "cors";

dotenv.config();

const app = express();

app.use(cors());

app.use(express.json());
app.use("/api/auth", router);
app.use("/api/project", projectRoutes);
app.use("/api/investment", investRoute);
app.use("/api/balance", balanceRoute);

const mongodb_url = process.env.MON_URL;
const port = process.env.port || 3000;

app.listen(port, async () => {
  console.log(`server runing on ${port}`);
  try {
    let connection = await mongoose.connect(mongodb_url);
    console.log(` mongodb connnected... `);
  } catch (err) {
    console.log("mongodb connection error", err);
  }
});
