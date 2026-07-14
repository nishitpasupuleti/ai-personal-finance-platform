import { useState } from "react";
import PageContainer from "../../components/common/PageContainer";
import AddRecurringTransactionModal from "../../components/recurring/AddRecurringTransactionModal";
import useRecurringTransactions from "../../hooks/useRecurringTransactions";
import useCategories from "../../hooks/useCategories";

const RecurringTransactions = () => {
  const {
    recurringTransactions,
    loading,
    createRecurringTransaction,
    updateRecurringTransaction,
    deleteRecurringTransaction,
  } = useRecurringTransactions();

  const { categories } = useCategories();

  const [open, setOpen] = useState(false);
  const [selectedTransaction, setSelectedTransaction] = useState(null);

  const openCreateModal = () => {
    setSelectedTransaction(null);
    setOpen(true);
  };

  const openEditModal = (transaction) => {
    setSelectedTransaction(transaction);
    setOpen(true);
  };

  const closeModal = () => {
    setSelectedTransaction(null);
    setOpen(false);
  };

  const handleSubmit = async (payload) => {
    if (selectedTransaction) {
      await updateRecurringTransaction(selectedTransaction.id, payload);
    } else {
      await createRecurringTransaction(payload);
    }
    closeModal();
  };

  const handleDelete = async (id) => {
    const confirmed = window.confirm("Delete this recurring transaction?");
    if (!confirmed) return;
    await deleteRecurringTransaction(id);
  };

  if (loading) {
    return (
      <PageContainer>
        <h2>Loading...</h2>
      </PageContainer>
    );
  }

  return (
    <PageContainer>
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Recurring Transactions</h1>
          <p className="mt-1 text-gray-500">Manage automatic recurring income and expenses.</p>
        </div>
        <button
          onClick={openCreateModal}
          className="rounded-lg bg-black px-5 py-2 text-white hover:bg-gray-800"
        >
          + Add Recurring
        </button>
      </div>

      {recurringTransactions.length === 0 ? (
        <div className="rounded-xl border border-dashed py-16 text-center">
          <div className="mb-4 text-6xl">🔁</div>
          <h2 className="text-xl font-semibold">No Recurring Transactions</h2>
          <p className="mt-2 text-gray-500">Create your first recurring transaction.</p>
        </div>
      ) : (
        <div className="space-y-4">
          {recurringTransactions.map((transaction) => (
            <div
              key={transaction.id}
              className="flex items-center justify-between rounded-xl border bg-white p-5 shadow-sm"
            >
              <div>
                <h3 className="font-semibold">
                  {transaction.category?.icon} {transaction.title}
                </h3>
                <p className="mt-1 text-sm text-gray-500">
                  {transaction.frequency} • Next Run: {new Date(transaction.nextRunDate).toLocaleDateString()}
                </p>
              </div>
              <div className="text-right">
                <h2 className={`text-xl font-bold ${transaction.type === "income" ? "text-green-600" : "text-red-600"}`}>
                  ₹{Number(transaction.amount).toLocaleString()}
                </h2>
                <div className="mt-3 flex gap-2">
                  <button
                    onClick={() => openEditModal(transaction)}
                    className="rounded border px-3 py-1 text-sm hover:bg-gray-100"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(transaction.id)}
                    className="rounded bg-red-600 px-3 py-1 text-sm text-white hover:bg-red-700"
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      <AddRecurringTransactionModal
        open={open}
        onClose={closeModal}
        onSubmit={handleSubmit}
        categories={categories}
        transaction={selectedTransaction}
      />
    </PageContainer>
  );
};

export default RecurringTransactions;