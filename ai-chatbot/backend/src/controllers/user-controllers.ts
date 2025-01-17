import User from "../models/User.js";
import bcrypt from "bcrypt";
import { createToken } from "../utils/token-manager.js";
import { COOKIE_NAME } from "../utils/constants.js";

const getAllUsers = async (req, res, next) => {
  try {
    const users = await User.find({});
    return res.status(200).json({ users, count: users.length });
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};

const userSignup = async (req, res, next) => {
  try {
    const { name, email, password } = req.body;
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(401).send("User already registered");
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({ name, email, password: hashedPassword });
    console.log(name, email, hashedPassword);

    //create token and store cookie
    res.clearCookie(COOKIE_NAME, {
      httpOnly: true,
      domain: "localhost",
      signed: true,
      path: "/",
    });
    const token = createToken(user.id, user.email, "7d");
    if (!token) throw new Error("Token creation failed");
    const expires = new Date();
    expires.setDate(expires.getDate() + 7);

    res.cookie(COOKIE_NAME, token, {
      path: "/",
      domain: "localhost",
      expires,
      httpOnly: true,
      signed: true,
    });

    return res.status(201).json({ id: user._id });
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};

const userLogin = async (req, res, next) => {
  try {
    const { name, email, password } = req.body;
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(401).send("User not registered");
    }
    const isPasswordCorrect = await bcrypt.compare(password, user.password);
    if (!isPasswordCorrect) {
      return res.status(401).send("Incorrect password");
    }

    res.clearCookie(COOKIE_NAME, {
      httpOnly: true,
      domain: "localhost",
      signed: true,
      path: "/",
    });
    const token = createToken(user.id, user.email, "7d");
    if (!token) throw new Error("Token creation failed");
    const expires = new Date();
    expires.setDate(expires.getDate() + 7);

    res.cookie(COOKIE_NAME, token, {
      path: "/",
      domain: "localhost",
      expires,
      httpOnly: true,
      signed: true,
    });

    return res.status(200).json({ id: user._id });
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};

export { getAllUsers, userSignup, userLogin };
