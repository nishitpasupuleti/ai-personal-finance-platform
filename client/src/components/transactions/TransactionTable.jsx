import TransactionRow from "./TransactionRow";

const TransactionTable = ({
  transactions,
  onEdit,
  onDelete,
}) => {
  if (!transactions.length) {
    return (
      <div className="rounded-xl bg-white p-8 text-center shadow-sm">
        No transactions found.
      </div>
    );
  }

  return (
    <div className="overflow-hidden rounded-xl bg-white shadow-sm">
      <table className="min-w-full">
        <thead className="bg-gray-100">
          <tr>
            <th className="px-6 py-4 text-left">
              Title
            </th>

            <th className="px-6 py-4 text-left">
              Category
            </th>

            <th className="px-6 py-4 text-left">
              Type
            </th>

            <th className="px-6 py-4 text-left">
              Amount
            </th>

            <th className="px-6 py-4 text-left">
              Date
            </th>

            <th className="px-6 py-4 text-left">
              Actions
            </th>
          </tr>
        </thead>

        <tbody>
          {transactions.map((transaction) => (
            <TransactionRow
              key={transaction.id}
              transaction={transaction}
              onEdit={onEdit}
              onDelete={onDelete}
            />
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TransactionTable;