const RecentTransactions = ({ transactions }) => {
  return (
    <div className="rounded-xl bg-white p-6 shadow-sm h-105 flex flex-col">
      <h2 className="mb-6 text-xl font-semibold">Recent Transactions</h2>

      {!transactions || transactions.length === 0 ? (
        <p className="text-gray-500">No transactions found.</p>
      ) : (
        <div className="flex-1 overflow-y-auto space-y-4 pr-2">
          {transactions.map((transaction) => (
            <div
              key={transaction.id}
              className="flex items-center justify-between border-b pb-4 last:border-b-0"
            >
              <div className="flex items-center gap-4">
                <div
                  className="flex h-12 w-12 items-center justify-center rounded-full text-2xl"
                  style={{ backgroundColor: transaction.category?.color || "#f3f4f6" }}
                >
                  {transaction.category?.icon}
                </div>
                <div>
                  <h3 className="font-medium">{transaction.title}</h3>
                  <p className="text-sm text-gray-500">{transaction.category?.name}</p>
                </div>
              </div>

              <div className="text-right">
                <p className={`font-semibold ${transaction.type === "income" ? "text-green-600" : "text-red-600"}`}>
                  {transaction.type === "income" ? "+" : "-"}₹{Number(transaction.amount).toLocaleString()}
                </p>
                <p className="text-sm text-gray-500">
                  {new Date(transaction.transactionDate).toLocaleDateString("en-IN", {
                    day: "2-digit",
                    month: "short",
                    year: "numeric",
                  })}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default RecentTransactions;