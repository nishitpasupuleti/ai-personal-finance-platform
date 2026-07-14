/* eslint-disable react-hooks/set-state-in-effect */
import { useEffect, useState } from "react";

const initialState = {
  title: "",
  amount: "",
  type: "expense",
  categoryId: "",
  frequency: "monthly",
  nextRunDate: new Date().toISOString().split("T")[0],
  isActive: true,
};

const AddRecurringTransactionModal = ({
  open,
  onClose,
  onSubmit,
  categories,
  transaction,
}) => {
  const [formData, setFormData] = useState(initialState);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (transaction) {
      setFormData({
        title: transaction.title,
        amount: transaction.amount,
        type: transaction.type,
        categoryId: transaction.category?.id || "",
        frequency: transaction.frequency,
        nextRunDate:
          transaction.nextRunDate.split("T")[0],
        isActive: transaction.isActive,
      });
    } else {
      setFormData(initialState);
    }
  }, [transaction, open]);

  if (!open) return null;

  const handleChange = (e) => {
    const { name, value, type, checked } =
      e.target;

    setFormData((prev) => ({
      ...prev,
      [name]:
        type === "checkbox"
          ? checked
          : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      await onSubmit({
        ...formData,
        amount: Number(formData.amount),
      });

      setFormData(initialState);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="w-full max-w-lg rounded-xl bg-white p-6">
        <h2 className="mb-6 text-2xl font-bold">
          {transaction
            ? "Edit Recurring Transaction"
            : "Create Recurring Transaction"}
        </h2>

        <form
          onSubmit={handleSubmit}
          className="space-y-4"
        >
          <input
            name="title"
            placeholder="Title"
            value={formData.title}
            onChange={handleChange}
            required
            className="w-full rounded-lg border p-3"
          />

          <input
            type="number"
            name="amount"
            placeholder="Amount"
            value={formData.amount}
            onChange={handleChange}
            required
            className="w-full rounded-lg border p-3"
          />

          <select
            name="type"
            value={formData.type}
            onChange={handleChange}
            className="w-full rounded-lg border p-3"
          >
            <option value="income">
              Income
            </option>

            <option value="expense">
              Expense
            </option>
          </select>

          <select
            name="categoryId"
            value={formData.categoryId}
            onChange={handleChange}
            required
            className="w-full rounded-lg border p-3"
          >
            <option value="">
              Select Category
            </option>

            {categories.map((category) => (
              <option
                key={category.id}
                value={category.id}
              >
                {category.icon} {category.name}
              </option>
            ))}
          </select>

          <select
            name="frequency"
            value={formData.frequency}
            onChange={handleChange}
            className="w-full rounded-lg border p-3"
          >
            <option value="daily">
              Daily
            </option>

            <option value="weekly">
              Weekly
            </option>

            <option value="monthly">
              Monthly
            </option>

            <option value="yearly">
              Yearly
            </option>
          </select>

          <input
            type="date"
            name="nextRunDate"
            value={formData.nextRunDate}
            onChange={handleChange}
            className="w-full rounded-lg border p-3"
          />

          <label className="flex items-center gap-3">
            <input
              type="checkbox"
              name="isActive"
              checked={formData.isActive}
              onChange={handleChange}
            />

            Active
          </label>

          <div className="flex justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className="rounded-lg border px-5 py-2"
            >
              Cancel
            </button>

            <button
              type="submit"
              disabled={loading}
              className="rounded-lg bg-black px-5 py-2 text-white"
            >
              {loading
                ? "Saving..."
                : transaction
                ? "Update"
                : "Create"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddRecurringTransactionModal;