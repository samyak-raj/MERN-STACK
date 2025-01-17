import express from "express";
import dotenv from "dotenv";
dotenv.config();
import morgan from "morgan";
import appRouter from "./routes/index.js";
import cookieParser from "cookie-parser";

const app = express();

//middlewares
app.use(express.json());
app.use(cookieParser(process.env.COOKIE_SECRET));
//remove it during production
app.use(morgan("dev"));

app.use("/api/v1", appRouter);

export default app;
