import mongoose from "mongoose";

const ChatSchema = new mongoose.Schema({
  role: {
    type: String,
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
});

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Name must be provided."],
    minlength: 3,
    maxlength: 50,
  },
  email: {
    type: String,
    required: [true, "Email must be provided."],
    match: [
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
      "Provide valid email",
    ],
    unique: true,
  },
  password: {
    type: String,
    required: [true, "Password must be provided."],
    minlength: 6,
  },
  chats: [ChatSchema],
});

export default mongoose.model("User", UserSchema);
