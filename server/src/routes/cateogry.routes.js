import { Router } from "express";

import { protect } from "../middleware/auth.middleware.js";

import {
  createCategory,
  deleteCategory,
  getCategories,
} from "../controllers/category.controller.js";

const router = Router();

router.use(protect);

router
  .route("/")
  .get(getCategories)
  .post(createCategory);

router
  .route("/:id")
  .delete(deleteCategory);

export default router;