import { Router } from "express";

import { protect } from "../middleware/auth.middleware.js";
import { generateFinancialInsights } from "../controllers/ai.controller.js";

const router = Router();

router.use(protect);

router.post(
  "/financial-insights",
  generateFinancialInsights
);

export default router;