import "dotenv/config";
import "express-async-errors";
import express from "express";
import connectDB from "./db/connect.js";
import { BookRouter } from "./routes/book.js";
import cors from 'cors'

const app = express();

//middlewares
app.use(express.json());
app.use(cors())

app.use("/api/v1", BookRouter);

app.get("/", (req, res) => {
  res.send("yo");
});

const PORT = process.env.PORT || 3000;

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI);
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
  } catch (error) {
    console.log(err.message);
  }
};
start();
