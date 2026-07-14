import { z } from "zod";

const emptyToUndefined = (value) =>
  value === "" ? undefined : value;

export const createTransactionSchema = z.object({
  title: z.string().trim().min(2).max(150),

  amount: z.coerce.number().positive(),

  type: z.enum(["income", "expense"]),

  categoryId: z.string().uuid(),

  description: z.string().trim().max(500).optional(),

  // Accept both "2026-07-14" and ISO datetime strings
  transactionDate: z.string().optional(),
});

export const getTransactionsSchema = z.object({
  page: z.coerce.number().int().min(1).default(1),

  limit: z.coerce.number().int().min(1).max(100).default(10),

  type: z.preprocess(
    emptyToUndefined,
    z.enum(["income", "expense"]).optional()
  ),

  categoryId: z.preprocess(
    emptyToUndefined,
    z.string().uuid().optional()
  ),

  search: z.preprocess(
    emptyToUndefined,
    z.string().trim().optional()
  ),
});

export const updateTransactionSchema =
  createTransactionSchema.partial();