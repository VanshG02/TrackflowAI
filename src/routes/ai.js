import express from "express";
import { getAIInsights } from "../controllers/aiController.js";
import authMiddleware from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/", authMiddleware, getAIInsights);

export default router;
