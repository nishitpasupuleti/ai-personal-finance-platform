import BudgetCard from "./BudgetCard";

const BudgetGrid = ({
  budgets,
  onRefresh,
}) => {
  if (!budgets.length) {
    return (
      <div className="rounded-xl bg-white p-8 text-center shadow-sm">
        No budgets found.
      </div>
    );
  }

  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {budgets.map((budget) => (
        <BudgetCard
          key={budget.id}
          budget={budget}
          onRefresh={onRefresh}
        />
      ))}
    </div>
  );
};

export default BudgetGrid;