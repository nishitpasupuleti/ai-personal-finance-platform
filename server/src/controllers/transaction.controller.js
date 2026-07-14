import { and, desc, eq, ilike, sql, } from "drizzle-orm";
import db from "../db/index.js";
import { categories, transactions } from "../db/schema.js";
import { createTransactionSchema } from "../validators/transaction.validator.js";
import { getTransactionsSchema } from "../validators/transaction.validator.js";
import { updateTransactionSchema } from "../validators/transaction.validator.js";

export const createTransaction = async (req, res, next) => {
  try {
    const data = createTransactionSchema.parse(req.body);

    const category = await db.select().from(categories).where(
      and(eq(categories.id, data.categoryId), eq(categories.userId, req.user.id))
    ).limit(1);

    if (!category.length) {
      return res.status(404).json({
        success: false,
        message: "Category not found",
      });
    }

    const [transaction] = await db.insert(transactions).values({
      userId: req.user.id,
      categoryId: data.categoryId,
      title: data.title,
      amount: data.amount.toString(),
      type: data.type,
      description: data.description,
      transactionDate:
        data.transactionDate && !isNaN(new Date(data.transactionDate))
          ? new Date(data.transactionDate)
          : new Date(),
    }).returning();

    return res.status(201).json({
      success: true,
      message: "Transaction created successfully",
      data: transaction,
    });
  } catch (error) {

    next(error);
  }
};

export const getTransactions = async (req, res, next) => {
  try {
    const {
      page,
      limit,
      type,
      categoryId,
      search,
    } = getTransactionsSchema.parse(req.query);

    const filters = [
      eq(transactions.userId, req.user.id),
    ];

    if (type) {
      filters.push(
        eq(transactions.type, type)
      );
    }

    if (categoryId) {
      filters.push(
        eq(transactions.categoryId, categoryId)
      );
    }

    if (search) {
      filters.push(
        ilike(
          transactions.title,
          `%${search}%`
        )
      );
    }

    const [{ count }] = await db
      .select({
        count: sql`COUNT(*)`,
      })
      .from(transactions)
      .where(and(...filters));

    const total = Number(count);

    const data = await db
      .select({
        id: transactions.id,
        title: transactions.title,
        amount: transactions.amount,
        type: transactions.type,
        description: transactions.description,
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
      .where(and(...filters))
      .orderBy(desc(transactions.transactionDate))
      .limit(limit)
      .offset((page - 1) * limit);

    return res.status(200).json({
      success: true,
      data,

      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
      },
    });
  } catch (error) {
    next(error);
  }
};

export const updateTransaction = async (req, res, next) => {
  try {
    const { id } = req.params;
    const data = updateTransactionSchema.parse(req.body);

    const existingTransaction = await db.select().from(transactions).where(
      and(eq(transactions.id, id), eq(transactions.userId, req.user.id))
    ).limit(1);

    if (!existingTransaction.length) {
      return res.status(404).json({
        success: false,
        message: "Transaction not found",
      });
    }

    if (data.categoryId) {
      const category = await db.select().from(categories).where(
        and(eq(categories.id, data.categoryId), eq(categories.userId, req.user.id))
      ).limit(1);

      if (!category.length) {
        return res.status(404).json({
          success: false,
          message: "Category not found",
        });
      }
    }

    const [updatedTransaction] = await db.update(transactions).set({
      ...data,
      amount: data.amount !== undefined ? data.amount.toString() : undefined,
      transactionDate: data.transactionDate ? new Date(data.transactionDate) : undefined,
      updatedAt: new Date(),
    }).where(eq(transactions.id, id)).returning();

    return res.status(200).json({
      success: true,
      message: "Transaction updated successfully",
      data: updatedTransaction,
    });
  } catch (error) {
    next(error);
  }
};

export const deleteTransaction = async (req, res, next) => {
  try {
    const { id } = req.params;

    const existingTransaction = await db.select().from(transactions).where(
      and(eq(transactions.id, id), eq(transactions.userId, req.user.id))
    ).limit(1);

    if (!existingTransaction.length) {
      return res.status(404).json({
        success: false,
        message: "Transaction not found",
      });
    }

    await db.delete(transactions).where(eq(transactions.id, id));

    return res.status(200).json({
      success: true,
      message: "Transaction deleted successfully",
    });
  } catch (error) {
    next(error);
  }
};