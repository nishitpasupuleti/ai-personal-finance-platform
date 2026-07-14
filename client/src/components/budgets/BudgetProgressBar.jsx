const BudgetProgressBar = ({ percentage }) => {
  const value = Math.min(percentage, 100);

  let color = "bg-green-500";

  if (percentage >= 70) {
    color = "bg-yellow-400";
  }

  if (percentage >= 90) {
    color = "bg-orange-500";
  }

  if (percentage > 100) {
    color = "bg-red-600";
  }

  return (
    <div>
      <div className="mb-2 flex justify-between text-sm">
        <span>Usage</span>

        <span>{percentage}%</span>
      </div>

      <div className="h-3 w-full overflow-hidden rounded-full bg-gray-200">
        <div
          className={`h-full rounded-full transition-all duration-500 ${color}`}
          style={{
            width: `${value}%`,
          }}
        />
      </div>
    </div>
  );
};

export default BudgetProgressBar;