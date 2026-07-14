import { Router } from "express";
import { protect } from "../middleware/auth.middleware.js";
import {
  createRecurring,
  getRecurring,
  updateRecurring,
  deleteRecurring,
} from "../controllers/recurring.controller.js";

const router = Router();

router.use(protect);

router.route("/").get(getRecurring).post(createRecurring);
router.route("/:id").patch(updateRecurring).delete(deleteRecurring);

export default router;