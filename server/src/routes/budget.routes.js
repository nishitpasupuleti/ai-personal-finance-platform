import { Router } from "express";

import { protect } from "../middleware/auth.middleware.js";

import {
  createBudget,
  getBudgets,
  updateBudget,
  deleteBudget,
} from "../controllers/budget.controller.js";

const router = Router();

router.use(protect);

router
  .route("/")
  .get(getBudgets)
  .post(createBudget);

router
  .route("/:id")
  .patch(updateBudget)
  .delete(deleteBudget);

export default router;