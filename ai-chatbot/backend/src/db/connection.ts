import mongoose, { mongo } from "mongoose";

async function connectDB() {
  try {
    await mongoose.connect(process.env.MONGODB_URL);
    console.log("Connected to MONGODB");
  } catch (error) {
    console.log(error.message);
    throw new Error("Couldn't connect to MONGODB");
  }
}

async function disconnectFromDB() {
  try {
    await mongoose.disconnect();
  } catch (error) {
    throw new Error("Couldn't connect to MONGODB");
  }
}

export { connectDB, disconnectFromDB };
