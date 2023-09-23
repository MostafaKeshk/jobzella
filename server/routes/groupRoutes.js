import express from "express";
import {
  createGroup,
  getAllGroups,
} from "../controllers/groupController.js";

const router = express.Router();

router.get("/", getAllGroups);
router.post("/", createGroup);

export default router;
