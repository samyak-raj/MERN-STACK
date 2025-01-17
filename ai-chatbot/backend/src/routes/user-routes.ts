import { Router } from "express";
import  { getAllUsers, userLogin, userSignup } from "../controllers/user-controllers.js";
import { loginValidator, signupValidator, validate } from "../utils/validators.js";

const userRoutes = Router();

userRoutes.route("/").get(getAllUsers)
userRoutes.route("/signup").post(validate(signupValidator), userSignup)
userRoutes.route("/login").post(validate(loginValidator), userLogin)

export default userRoutes;