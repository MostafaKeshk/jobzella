import express from "express";
import {
  createTask,
  getAllTasks,
  sortTasks
} from "../controllers/taskController.js";

const router = express.Router();

router.get("/:groupId", getAllTasks);
router.post("/", createTask);
router.put("/sort-tasks", sortTasks);

export default router;