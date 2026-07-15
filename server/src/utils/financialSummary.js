import { eq } from "drizzle-orm";
import db from "../db/index.js";
import { transactions, categories, budgets, recurringTransactions } from "../db/schema.js";

const getFinancialSummary = async (userId) => {
  const transactionData = await db.select({
    title: transactions.title,
    amount: transactions.amount,
    type: transactions.type,
    transactionDate: transactions.transactionDate,
    category: categories.name,
  }).from(transactions).leftJoin(
    categories,
    eq(transactions.categoryId, categories.id)
  ).where(eq(transactions.userId, userId));

  const budgetData = await db.select().from(budgets).where(eq(budgets.userId, userId));

  const recurringData = await db.select().from(recurringTransactions).where(eq(recurringTransactions.userId, userId));

  let totalIncome = 0;
  let totalExpense = 0;
  let incomeCount = 0;
  let expenseCount = 0;
  let highestIncome = 0;
  let highestExpense = 0;
  const categoryBreakdown = {};

  transactionData.forEach((transaction) => {
    const amount = Number(transaction.amount);

    if (transaction.type === "income") {
      totalIncome += amount;
      incomeCount++;
      if (amount > highestIncome) {
        highestIncome = amount;
      }
    } else {
      totalExpense += amount;
      expenseCount++;
      if (amount > highestExpense) {
        highestExpense = amount;
      }
    }

    categoryBreakdown[transaction.category] = (categoryBreakdown[transaction.category] || 0) + amount;
  });

  const averageIncome = incomeCount === 0 ? 0 : totalIncome / incomeCount;
  const averageExpense = expenseCount === 0 ? 0 : totalExpense / expenseCount;
  const mostUsedCategory = Object.entries(categoryBreakdown).sort((a, b) => b[1] - a[1])[0]?.[0] || "None";

  const recurringIncome = recurringData
    .filter((item) => item.type === "income")
    .reduce((sum, item) => sum + Number(item.amount), 0);

  const recurringExpense = recurringData
    .filter((item) => item.type === "expense")
    .reduce((sum, item) => sum + Number(item.amount), 0);

  const recentTransactions = [...transactionData]
    .sort((a, b) => new Date(b.transactionDate) - new Date(a.transactionDate))
    .slice(0, 10);

  const largestExpenses = transactionData
    .filter((t) => t.type === "expense")
    .sort((a, b) => b.amount - a.amount)
    .slice(0, 5);

  const largestIncomes = transactionData
    .filter((t) => t.type === "income")
    .sort((a, b) => b.amount - a.amount)
    .slice(0, 5);

  return {
    summary: {
      totalIncome,
      totalExpense,
      currentBalance: totalIncome - totalExpense,
      totalTransactions: transactionData.length,
      averageIncome,
      averageExpense,
      highestIncome,
      highestExpense,
      mostUsedCategory,
      firstTransaction: transactionData[0]?.transactionDate || null,
      lastTransaction: recentTransactions[0]?.transactionDate || null,
    },
    categoryBreakdown,
    recurring: {
      totalRecurringIncome: recurringIncome,
      totalRecurringExpense: recurringExpense,
      recurringCount: recurringData.length,
    },
    budgets: budgetData,
    recentTransactions,
    largestExpenses,
    largestIncomes,
  };
};

export default getFinancialSummary;