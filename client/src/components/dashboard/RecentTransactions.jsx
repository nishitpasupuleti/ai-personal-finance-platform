import { Link } from "react-router-dom";

const RecentTransactions = ({ transactions }) => {
  const recentTransactions = transactions?.slice(0, 5);

  return (
    <div className="rounded-xl bg-white p-6 shadow-sm">
      <div className="mb-5 flex items-center justify-between">
        <h2 className="text-xl font-semibold">
          Recent Transactions
        </h2>

        <Link
          to="/transactions"
          className="text-sm font-medium text-blue-600 hover:text-blue-700"
        >
          View All →
        </Link>
      </div>

      {!recentTransactions ||
      recentTransactions.length === 0 ? (
        <p className="text-gray-500">
          No transactions found.
        </p>
      ) : (
        <div className="space-y-4">
          {recentTransactions.map((transaction) => (
            <div
              key={transaction.id}
              className="flex items-center justify-between border-b pb-4 last:border-b-0"
            >
              <div className="flex items-center gap-4">
                <div
                  className="flex h-11 w-11 items-center justify-center rounded-full text-xl"
                  style={{
                    backgroundColor:
                      transaction.category?.color ||
                      "#f3f4f6",
                  }}
                >
                  {transaction.category?.icon}
                </div>

                <div>
                  <h3 className="font-medium">
                    {transaction.title}
                  </h3>

                  <p className="text-sm text-gray-500">
                    {transaction.category?.name}
                  </p>
                </div>
              </div>

              <div className="text-right">
                <p
                  className={`font-semibold ${
                    transaction.type === "income"
                      ? "text-green-600"
                      : "text-red-600"
                  }`}
                >
                  {transaction.type === "income"
                    ? "+"
                    : "-"}
                  ₹
                  {Number(
                    transaction.amount
                  ).toLocaleString()}
                </p>

                <p className="text-sm text-gray-500">
                  {new Date(
                    transaction.transactionDate
                  ).toLocaleDateString("en-IN", {
                    day: "2-digit",
                    month: "short",
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