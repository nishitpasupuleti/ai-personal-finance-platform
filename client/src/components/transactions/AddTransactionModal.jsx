/* eslint-disable react-hooks/set-state-in-effect */
import { useEffect, useState } from "react";
import api from "../../api/axios";

const initialState = {
  title: "",
  amount: "",
  type: "expense",
  categoryId: "",
  transactionDate: new Date().toISOString().split("T")[0],
  description: "",
};

const AddTransactionModal = ({
  open,
  onClose,
  categories,
  onSuccess,
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
        categoryId: transaction.category.id,
        transactionDate: transaction.transactionDate
          .split("T")[0],
        description: transaction.description || "",
      });
    } else {
      setFormData(initialState);
    }
  }, [transaction, open]);

  if (!open) return null;

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

 const handleSubmit = async (e) => {
  e.preventDefault();

  try {
    setLoading(true);

    const payload = {
      title: formData.title.trim(),
      amount: Number(formData.amount),
      type: formData.type,
      categoryId: formData.categoryId,
      description: formData.description.trim(),
    };

    if (formData.transactionDate) {
      payload.transactionDate = formData.transactionDate;
    }

    if (transaction) {
      await api.patch(
        `/transactions/${transaction.id}`,
        payload
      );
    } else {
      await api.post("/transactions", payload);
    }

    onSuccess();
    onClose();
    setFormData(initialState);
  } catch (error) {
    console.log(error.response.data.errors);
console.log(error.response.data.errors[0]);
    console.error(error.response?.data);

    alert(
      error.response?.data?.message ||
      "Something went wrong."
    );
  } finally {
    setLoading(false);
  }
};

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="w-full max-w-lg rounded-xl bg-white p-6">
        <h2 className="mb-6 text-2xl font-bold">
          {transaction
            ? "Edit Transaction"
            : "Add Transaction"}
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
            className="w-full rounded-lg border p-3"
            required
          />

          <input
            type="number"
            name="amount"
            placeholder="Amount"
            value={formData.amount}
            onChange={handleChange}
            className="w-full rounded-lg border p-3"
            required
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
            className="w-full rounded-lg border p-3"
            required
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

          <input
            type="date"
            name="transactionDate"
            value={formData.transactionDate}
            onChange={handleChange}
            className="w-full rounded-lg border p-3"
          />

          <textarea
            rows={3}
            name="description"
            placeholder="Description"
            value={formData.description}
            onChange={handleChange}
            className="w-full rounded-lg border p-3"
          />

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

export default AddTransactionModal;