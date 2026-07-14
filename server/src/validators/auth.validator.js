import { z } from "zod";

export const registerSchema = z.object({
  fullName: z.string().trim().min(3).max(100),
  email: z.email().trim().toLowerCase(),
  password: z.string().min(8).max(100),
});

export const loginSchema = z.object({
  email: z.email().trim().toLowerCase(),
  password: z.string().min(8).max(100),
});