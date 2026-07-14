import { and, desc, eq, sql } from "drizzle-orm";
import db from "../db/index.js";
import { budgets, categories, transactions } from "../db/schema.js";
import { createBudgetSchema, updateBudgetSchema } from "../validators/budget.validator.js";

export const createBudget = async (req, res, next) => {
  try {
    const data = createBudgetSchema.parse(req.body);

    const category = await db.select().from(categories).where(
      and(eq(categories.id, data.categoryId), eq(categories.userId, req.user.id))
    ).limit(1);

    if (!category.length) {
      return res.status(404).json({ success: false, message: "Category not found" });
    }

    const existingBudget = await db.select().from(budgets).where(
      and(
        eq(budgets.userId, req.user.id),
        eq(budgets.categoryId, data.categoryId),
        eq(budgets.month, data.month),
        eq(budgets.year, data.year)
      )
    ).limit(1);

    if (existingBudget.length) {
      return res.status(409).json({ success: false, message: "Budget already exists for this month" });
    }

    const [budget] = await db.insert(budgets).values({
      userId: req.user.id,
      categoryId: data.categoryId,
      amount: data.amount.toString(),
      month: data.month,
      year: data.year,
    }).returning();

    return res.status(201).json({ success: true, message: "Budget created successfully", data: budget });
  } catch (error) {
    next(error);
  }
};

export const getBudgets = async (req, res, next) => {
  try {
    const currentDate = new Date();
    const month = Number(req.query.month) || currentDate.getMonth() + 1;
    const year = Number(req.query.year) || currentDate.getFullYear();

    const data = await db.select({
      id: budgets.id,
      amount: budgets.amount,
      month: budgets.month,
      year: budgets.year,
      category: {
        id: categories.id,
        name: categories.name,
        icon: categories.icon,
        color: categories.color,
      },
      spent: sql`
        COALESCE(
          (
            SELECT SUM(t.amount)
            FROM transactions t
            WHERE
              t.category_id = ${budgets.categoryId}
              AND t.user_id = ${req.user.id}
              AND t.type = 'expense'
              AND EXTRACT(MONTH FROM t.transaction_date) = ${month}
              AND EXTRACT(YEAR FROM t.transaction_date) = ${year}
          ),
          0
        )
      `,
    }).from(budgets).leftJoin(
      categories,
      eq(budgets.categoryId, categories.id)
    ).where(
      and(
        eq(budgets.userId, req.user.id),
        eq(budgets.month, month),
        eq(budgets.year, year)
      )
    ).orderBy(desc(budgets.createdAt));

    const budgetsWithAnalytics = data.map((budget) => {
      const amount = Number(budget.amount);
      const spent = Number(budget.spent);
      const remaining = amount - spent;
      const percentage = amount === 0 ? 0 : Math.round((spent / amount) * 100);
      return { ...budget, amount, spent, remaining, percentage };
    });

    return res.status(200).json({ success: true, data: budgetsWithAnalytics });
  } catch (error) {
    next(error);
  }
};

export const updateBudget = async (req, res, next) => {
  try {
    const { id } = req.params;
    const data = updateBudgetSchema.parse(req.body);

    const existingBudget = await db.select().from(budgets).where(
      and(eq(budgets.id, id), eq(budgets.userId, req.user.id))
    ).limit(1);

    if (!existingBudget.length) {
      return res.status(404).json({ success: false, message: "Budget not found" });
    }

    const [budget] = await db.update(budgets).set({
      ...data,
      amount: data.amount !== undefined ? data.amount.toString() : undefined,
    }).where(eq(budgets.id, id)).returning();

    return res.status(200).json({ success: true, message: "Budget updated successfully", data: budget });
  } catch (error) {
    next(error);
  }
};

export const deleteBudget = async (req, res, next) => {
  try {
    const { id } = req.params;

    const existingBudget = await db.select().from(budgets).where(
      and(eq(budgets.id, id), eq(budgets.userId, req.user.id))
    ).limit(1);

    if (!existingBudget.length) {
      return res.status(404).json({ success: false, message: "Budget not found" });
    }

    await db.delete(budgets).where(eq(budgets.id, id));

    return res.status(200).json({ success: true, message: "Budget deleted successfully" });
  } catch (error) {
    next(error);
  }
};