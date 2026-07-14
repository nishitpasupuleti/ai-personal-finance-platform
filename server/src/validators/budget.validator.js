import { z } from "zod";

export const createBudgetSchema = z.object({
  categoryId: z.string().uuid(),
  amount: z.coerce.number().positive(),
  month: z.coerce.number().min(1).max(12),
  year: z.coerce.number().min(2024),
});

export const updateBudgetSchema =  createBudgetSchema.partial();