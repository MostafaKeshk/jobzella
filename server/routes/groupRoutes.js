import express from "express";
import {
  createGroup,
  getAllGroups,
  getGroup,
  updateGroup,
  deleteGroup,
} from "../controllers/groupController.js";

const router = express.Router();

router.get("/", getAllGroups);
router.post("/", createGroup);
router.get("/:id", getGroup);
router.delete("/:id", deleteGroup);
router.patch("/:id", updateGroup);

export default router;
