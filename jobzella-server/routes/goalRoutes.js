import express from "express";
import {
  createGoal,
  getAllGoals,
  getGoal,
  updateGoal,
  deleteGoal,
} from "../controllers/goalController.js";

const router = express.Router();

router.get("/", getAllGoals);
router.post("/", createGoal);
router.get("/:id", getGoal);
router.delete("/:id", deleteGoal);
router.patch("/:id", updateGoal);

export default router;
