import { z } from "zod";

export const createRecurringSchema = z.object({
  title: z.string().trim().min(2).max(150),
  amount: z.coerce.number().positive(),
  type: z.enum(["income", "expense"]),
  categoryId: z.string().uuid(),
  frequency: z.enum(["daily", "weekly", "monthly", "yearly"]),
  nextRunDate: z.string(),
  isActive: z.boolean().optional(),
});

export const updateRecurringSchema = createRecurringSchema.partial();