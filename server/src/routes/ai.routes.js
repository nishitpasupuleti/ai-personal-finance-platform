import { Router } from "express";

import { protect } from "../middleware/auth.middleware.js";
import { generateFinancialInsights, askAIChat } from "../controllers/ai.controller.js";

const router = Router();

router.use(protect);

router.post(
  "/financial-insights",
  generateFinancialInsights
);

router.post(
  "/chat",
  askAIChat
);

export default router;