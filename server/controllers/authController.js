import bcrypt from "bcrypt";
import User from "../models/user.js";
import { generateToken } from "../utils/jwt.js";

export const register = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const lowercaseEmail = email.toLowerCase();
    const hashedPassword = await bcrypt.hash(password, 10);

    const user = new User({
      name,
      email: lowercaseEmail,
      password: hashedPassword,
    });
    await user.save();

    const token = generateToken(user._id);

    const userWithoutPassword = { ...user.toObject() };
    delete userWithoutPassword.password;

    res.status(200).json({
      message: "User registered successfully",
      user: userWithoutPassword,
      token,
    });
  } catch (error) {
    if(error.message.includes("duplicate")){
      res.status(500).json({ message: "Email already exists" })
      return;
    }
    res.status(500).json({ message: error.message });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const lowercaseEmail = email.toLowerCase();

    const user = await User.findOne({ email:lowercaseEmail });

    if (!user) {
      return res.status(404).json({ message: "Invalid email or password" });
    }

    const isValidPassword = await bcrypt.compare(password, user.password);

    if (!isValidPassword) {
      return res.status(403).json({ message: "Invalid email or password" });
    }

    const token = generateToken(user._id);

    const userWithoutPassword = { ...user.toObject() };
    delete userWithoutPassword.password;

    res.status(200).json({ message: "Login successful", user:userWithoutPassword, token });
  } catch (error) {
    console.log({error})
    res.status(500).json({ message: "Failed to login" });
  }
};

export const updateUser = async (req, res) => {
  try {

    const { name, email, password } = req.body;
    const userId = req.id;

    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const lowercaseEmail = email ? email.toLowerCase() : user.email;

    user.name = name || user.name;
    user.email = lowercaseEmail;

    if (password) {
      const hashedPassword = await bcrypt.hash(password, 10);
      user.password = hashedPassword;
    }

    await user.save();

    const userWithoutPassword = { ...user.toObject() };
    delete userWithoutPassword.password;

    res.status(200).json({
      message: "User updated successfully",
      user: userWithoutPassword,
    });
  } catch (error) {
    if(error.message.includes("duplicate")){
      res.status(500).json({ message: "Email already exists" })
      return;
    }
    res.status(500).json({ message: "Failed to update user" });
  }
};

