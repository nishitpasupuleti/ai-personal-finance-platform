const SummaryCard = ({ title, value }) => {
  const icons = {
    "Current Balance": "💰",
    Income: "📈",
    Expense: "💸",
    Transactions: "🧾",
  };

  const formattedValue =
    typeof value === "number"
      ? title === "Transactions"
        ? value.toLocaleString()
        : `₹${value.toLocaleString("en-IN")}`
      : value;

  return (
    <div className="rounded-xl border bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-md">
      <div className="mb-4 flex items-center justify-between">
        <p className="text-sm font-medium text-gray-500">
          {title}
        </p>

        <span className="text-2xl">
          {icons[title]}
        </span>
      </div>

      <h2 className="text-3xl font-bold">
        {formattedValue}
      </h2>
    </div>
  );
};

export default SummaryCard;