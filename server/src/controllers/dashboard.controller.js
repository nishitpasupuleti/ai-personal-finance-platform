import { and, desc, eq, sql } from "drizzle-orm";

import db from "../db/index.js";

import {
  categories,
  transactions,
} from "../db/schema.js";

export const getDashboard = async (req, res, next) => {
  try {
    const [summary] = await db
      .select({
        totalIncome: sql`
          COALESCE(
            SUM(
              CASE
                WHEN ${transactions.type} = 'income'
                THEN ${transactions.amount}
                ELSE 0
              END
            ),
            0
          )
        `,
        totalExpense: sql`
          COALESCE(
            SUM(
              CASE
                WHEN ${transactions.type} = 'expense'
                THEN ${transactions.amount}
                ELSE 0
              END
            ),
            0
          )
        `,
        totalTransactions: sql`COUNT(*)`,
      })
      .from(transactions)
      .where(eq(transactions.userId, req.user.id));

    const recentTransactions = await db
      .select({
        id: transactions.id,
        title: transactions.title,
        amount: transactions.amount,
        type: transactions.type,
        transactionDate: transactions.transactionDate,

        category: {
          id: categories.id,
          name: categories.name,
          icon: categories.icon,
          color: categories.color,
        },
      })
      .from(transactions)
      .leftJoin(
        categories,
        eq(transactions.categoryId, categories.id)
      )
      .where(eq(transactions.userId, req.user.id))
      .orderBy(desc(transactions.transactionDate))
      .limit(5);

    const categoryAnalytics = await db
      .select({
        categoryId: categories.id,
        category: categories.name,
        color: categories.color,
        icon: categories.icon,

        amount: sql`
          COALESCE(SUM(${transactions.amount}), 0)
        `,
      })
      .from(transactions)
      .leftJoin(
        categories,
        eq(transactions.categoryId, categories.id)
      )
      .where(
        and(
          eq(transactions.userId, req.user.id),
          eq(transactions.type, "expense")
        )
      )
      .groupBy(
        categories.id,
        categories.name,
        categories.color,
        categories.icon
      )
      .orderBy(sql`SUM(${transactions.amount}) DESC`);

    const monthlyAnalytics = await db
      .select({
        month: sql`
          TO_CHAR(
            DATE_TRUNC('month', ${transactions.transactionDate}),
            'YYYY-MM'
          )
        `,

        income: sql`
          COALESCE(
            SUM(
              CASE
                WHEN ${transactions.type} = 'income'
                THEN ${transactions.amount}
                ELSE 0
              END
            ),
            0
          )
        `,

        expense: sql`
          COALESCE(
            SUM(
              CASE
                WHEN ${transactions.type} = 'expense'
                THEN ${transactions.amount}
                ELSE 0
              END
            ),
            0
          )
        `,
      })
      .from(transactions)
      .where(eq(transactions.userId, req.user.id))
      .groupBy(
        sql`DATE_TRUNC('month', ${transactions.transactionDate})`
      )
      .orderBy(
        sql`DATE_TRUNC('month', ${transactions.transactionDate})`
      );

    const totalIncome = Number(summary.totalIncome);
    const totalExpense = Number(summary.totalExpense);

    return res.status(200).json({
      success: true,
      data: {
        summary: {
          totalIncome,
          totalExpense,
          currentBalance: totalIncome - totalExpense,
          totalTransactions: Number(summary.totalTransactions),
        },

        recentTransactions: recentTransactions.map((t) => ({
          ...t,
          amount: Number(t.amount),
        })),

        categoryAnalytics: categoryAnalytics.map((c) => ({
          ...c,
          amount: Number(c.amount),
        })),

        monthlyAnalytics: monthlyAnalytics.map((m) => ({
          month: m.month,
          income: Number(m.income),
          expense: Number(m.expense),
        })),
      },
    });
  } catch (error) {
    next(error);
  }
};