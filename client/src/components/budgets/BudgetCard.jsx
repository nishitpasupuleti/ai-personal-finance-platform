import BudgetProgressBar from "./BudgetProgressBar";

const BudgetCard = ({ budget, onEdit, onDelete }) => {
  const overBudget = budget.percentage > 100;

  return (
    <div className="rounded-xl border bg-white p-5 shadow-sm transition hover:shadow-md">
      <div className="mb-5 flex items-center justify-between">
        <div>
          <h3 className="flex items-center gap-2 text-lg font-semibold">
            <span>{budget.category.icon}</span>
            {budget.category.name}
          </h3>
          <p className="mt-1 text-sm text-gray-500">
            {budget.month}/{budget.year}
          </p>
        </div>
        <div className="text-right">
          <p className="text-xs text-gray-500">Budget</p>
          <h2 className="text-2xl font-bold">₹{budget.amount.toLocaleString()}</h2>
        </div>
      </div>

      <BudgetProgressBar percentage={budget.percentage} />

      <div className="mt-6 grid grid-cols-2 gap-4">
        <div className="rounded-lg bg-gray-50 p-4">
          <p className="text-xs text-gray-500">Spent</p>
          <h4 className="mt-1 text-lg font-semibold text-red-600">₹{budget.spent.toLocaleString()}</h4>
        </div>
        <div className="rounded-lg bg-gray-50 p-4">
          <p className="text-xs text-gray-500">Remaining</p>
          <h4 className={`mt-1 text-lg font-semibold ${overBudget ? "text-red-600" : "text-green-600"}`}>
            ₹{Math.abs(budget.remaining).toLocaleString()}
          </h4>
          {overBudget && (
            <span className="mt-2 inline-block rounded-full bg-red-100 px-2 py-1 text-xs font-semibold text-red-700">
              Over Budget
            </span>
          )}
        </div>
      </div>

      <div className="mt-6 flex justify-end gap-3">
        <button
          onClick={() => onEdit(budget)}
          className="rounded-lg border px-4 py-2 text-sm hover:bg-gray-100"
        >
          Edit
        </button>
        <button
          onClick={() => onDelete(budget.id)}
          className="rounded-lg bg-red-600 px-4 py-2 text-sm text-white hover:bg-red-700"
        >
          Delete
        </button>
      </div>
    </div>
  );
};

export default BudgetCard;