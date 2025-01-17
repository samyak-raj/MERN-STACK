import app from "./app.js";
import { connectDB } from "./db/connection.js";
import { config } from "dotenv";
config();

const port = process.env.PORT

connectDB()
  .then(() => {
    app.listen(port, () => console.log("server running on port 3000"));
  })
  .catch((error) => console.log(error.message));
