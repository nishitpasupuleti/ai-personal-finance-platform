import SummaryCard from "./SummaryCard";

const SummaryCards = ({ summary }) => {
  return (
    <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-4">
      <SummaryCard
        title="Current Balance"
        value={`₹${summary.currentBalance}`}
      />

      <SummaryCard
        title="Income"
        value={`₹${summary.totalIncome}`}
      />

      <SummaryCard
        title="Expense"
        value={`₹${summary.totalExpense}`}
      />

      <SummaryCard
        title="Transactions"
        value={summary.totalTransactions}
      />
    </div>
  );
};

export default SummaryCards;