import { Router } from "express";
import { protect } from "../middleware/auth.middleware.js";
import {
  createTransaction,
  getTransactions,
  updateTransaction,
  deleteTransaction,
} from "../controllers/transaction.controller.js";

const router = Router();

router.use(protect);

router.route("/").post(createTransaction).get(getTransactions);
router.route("/:id").patch(updateTransaction).delete(deleteTransaction);

export default router;