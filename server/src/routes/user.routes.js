import { Router } from "express";

import { protect } from "../middleware/auth.middleware.js";

import {
  updateProfile,
  updatePassword,
} from "../controllers/user.controller.js";

const router = Router();

router.use(protect);

router.patch("/profile", updateProfile);

router.patch("/password", updatePassword);

export default router;