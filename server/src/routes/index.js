import { Router } from "express";

import authRoutes from "./auth.routes.js";
import categoryRoutes from "./cateogry.routes.js";
import transactionRoutes from "./transaction.routes.js";
import dashboardRoutes from "./dashboard.routes.js";
import budgetRoutes from "./budget.routes.js";
import recurringRoutes from "./recurring.routes.js";
import userRoutes from "./user.routes.js";
import aiRoutes from "./ai.routes.js";

const router = Router();

router.get("/health", (req, res) => {
  res.status(200).json({
    success: true,
    message: "Finance API is running",
  });
});

router.use("/auth", authRoutes);
router.use("/categories", categoryRoutes);
router.use("/transactions", transactionRoutes);
router.use("/dashboard", dashboardRoutes);
router.use("/budgets", budgetRoutes);
router.use("/recurring", recurringRoutes);
router.use("/users", userRoutes);
router.use("/ai", aiRoutes);

export default router;