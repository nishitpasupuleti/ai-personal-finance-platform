import { and, desc, eq } from "drizzle-orm";
import db from "../db/index.js";
import { recurringTransactions, categories } from "../db/schema.js";
import { createRecurringSchema, updateRecurringSchema } from "../validators/recurring.validator.js";

export const createRecurring = async (req, res, next) => {
  try {
    const data = createRecurringSchema.parse(req.body);

    const category = await db.select().from(categories).where(
      and(eq(categories.id, data.categoryId), eq(categories.userId, req.user.id))
    ).limit(1);

    if (!category.length) {
      return res.status(404).json({ success: false, message: "Category not found" });
    }

    const [recurring] = await db.insert(recurringTransactions).values({
      userId: req.user.id,
      categoryId: data.categoryId,
      title: data.title,
      amount: data.amount.toString(),
      type: data.type,
      frequency: data.frequency,
      nextRunDate: new Date(data.nextRunDate),
      isActive: data.isActive ?? true,
    }).returning();

    return res.status(201).json({
      success: true,
      message: "Recurring transaction created successfully",
      data: recurring,
    });
  } catch (error) {
    next(error);
  }
};

export const getRecurring = async (req, res, next) => {
  try {
    const data = await db.select({
      id: recurringTransactions.id,
      title: recurringTransactions.title,
      amount: recurringTransactions.amount,
      type: recurringTransactions.type,
      frequency: recurringTransactions.frequency,
      nextRunDate: recurringTransactions.nextRunDate,
      isActive: recurringTransactions.isActive,
      category: {
        id: categories.id,
        name: categories.name,
        icon: categories.icon,
        color: categories.color,
      },
    }).from(recurringTransactions).leftJoin(
      categories,
      eq(recurringTransactions.categoryId, categories.id)
    ).where(
      eq(recurringTransactions.userId, req.user.id)
    ).orderBy(desc(recurringTransactions.createdAt));

    return res.status(200).json({ success: true, data });
  } catch (error) {
    next(error);
  }
};

export const updateRecurring = async (req, res, next) => {
  try {
    const { id } = req.params;
    const data = updateRecurringSchema.parse(req.body);

    const existing = await db.select().from(recurringTransactions).where(
      and(eq(recurringTransactions.id, id), eq(recurringTransactions.userId, req.user.id))
    ).limit(1);

    if (!existing.length) {
      return res.status(404).json({ success: false, message: "Recurring transaction not found" });
    }

    const [updated] = await db.update(recurringTransactions).set({
      ...data,
      amount: data.amount !== undefined ? data.amount.toString() : undefined,
      nextRunDate: data.nextRunDate ? new Date(data.nextRunDate) : undefined,
    }).where(eq(recurringTransactions.id, id)).returning();

    return res.status(200).json({
      success: true,
      message: "Recurring transaction updated successfully",
      data: updated,
    });
  } catch (error) {
    next(error);
  }
};

export const deleteRecurring = async (req, res, next) => {
  try {
    const { id } = req.params;

    const existing = await db.select().from(recurringTransactions).where(
      and(eq(recurringTransactions.id, id), eq(recurringTransactions.userId, req.user.id))
    ).limit(1);

    if (!existing.length) {
      return res.status(404).json({ success: false, message: "Recurring transaction not found" });
    }

    await db.delete(recurringTransactions).where(eq(recurringTransactions.id, id));

    return res.status(200).json({ success: true, message: "Recurring transaction deleted successfully" });
  } catch (error) {
    next(error);
  }
};