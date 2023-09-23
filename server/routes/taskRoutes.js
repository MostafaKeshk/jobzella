import express from "express";
import {
  createTask,
  getAllTasks,
  getTask,
  updateTask,
  deleteTask,
  sortTasks
} from "../controllers/taskController.js";

const router = express.Router();

router.get("/:groupId", getAllTasks);
router.post("/", createTask);
router.put("/sort-tasks", sortTasks);
router.get("/:id", getTask);
router.delete("/:id", deleteTask);
router.patch("/:id", updateTask);

export default router;