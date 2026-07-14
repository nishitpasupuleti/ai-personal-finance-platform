import { z } from "zod";

export const updateProfileSchema = z.object({
  fullName: z.string().trim().min(2).max(100),
  currency: z.string().trim().min(1).max(10),
  timezone: z.string().trim().min(1).max(100),
});

export const updatePasswordSchema = z.object({
  currentPassword: z.string().min(6),
  newPassword: z.string().min(6),
});