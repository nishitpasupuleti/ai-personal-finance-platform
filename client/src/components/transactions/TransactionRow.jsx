const TransactionRow = ({
  transaction,
  onEdit,
  onDelete,
}) => {
  return (
    <tr className="border-b hover:bg-gray-50">
      <td className="px-6 py-4">
        {transaction.title}
      </td>

      <td className="px-6 py-4">
        <div className="flex items-center gap-2">
          <span>{transaction.category?.icon}</span>

          <span>{transaction.category?.name}</span>
        </div>
      </td>

      <td className="px-6 py-4 capitalize">
        {transaction.type}
      </td>

      <td
        className={`px-6 py-4 font-semibold ${
          transaction.type === "income"
            ? "text-green-600"
            : "text-red-600"
        }`}
      >
        ₹{Number(transaction.amount).toLocaleString()}
      </td>

      <td className="px-6 py-4">
        {new Date(
          transaction.transactionDate
        ).toLocaleDateString()}
      </td>

      <td className="px-6 py-4">
        <div className="flex gap-2">
          <button
            onClick={() => onEdit(transaction)}
            className="rounded bg-blue-500 px-3 py-1 text-sm text-white"
          >
            Edit
          </button>

          <button
            onClick={() => onDelete(transaction)}
            className="rounded bg-red-500 px-3 py-1 text-sm text-white"
          >
            Delete
          </button>
        </div>
      </td>
    </tr>
  );
};

export default TransactionRow;