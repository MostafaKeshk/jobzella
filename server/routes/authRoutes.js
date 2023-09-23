import express from "express";
import { register, login, updateUser } from "../controllers/authController.js";
import authentication from "../middlewares/authentication.js";

const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.patch("/settings",authentication, updateUser);


export default router;
