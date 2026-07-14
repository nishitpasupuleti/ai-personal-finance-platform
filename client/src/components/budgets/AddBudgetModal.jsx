import { useEffect, useState } from "react";

const initialState = {
  categoryId: "",
  amount: "",
  month: new Date().getMonth() + 1,
  year: new Date().getFullYear(),
};

const AddBudgetModal = ({ open, onClose, onSubmit, categories, budget }) => {
  const [formData, setFormData] = useState(initialState);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (budget) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setFormData({
        categoryId: budget.category.id,
        amount: budget.amount,
        month: budget.month,
        year: budget.year,
      });
    } else {
      setFormData(initialState);
    }
  }, [budget, open]);

  if (!open) return null;

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.type === "number" ? Number(e.target.value) : e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);
      await onSubmit({ ...formData, amount: Number(formData.amount) });
      setFormData(initialState);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="w-full max-w-lg rounded-xl bg-white p-6">
        <h2 className="mb-6 text-2xl font-bold">
          {budget ? "Edit Budget" : "Create Budget"}
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <select
            name="categoryId"
            value={formData.categoryId}
            onChange={handleChange}
            required
            className="w-full rounded-lg border p-3"
          >
            <option value="">Select Category</option>
            {categories.map((category) => (
              <option key={category.id} value={category.id}>
                {category.icon} {category.name}
              </option>
            ))}
          </select>

          <input
            type="number"
            name="amount"
            placeholder="Budget Amount"
            value={formData.amount}
            onChange={handleChange}
            required
            className="w-full rounded-lg border p-3"
          />

          <div className="grid grid-cols-2 gap-4">
            <input
              type="number"
              name="month"
              min={1}
              max={12}
              value={formData.month}
              onChange={handleChange}
              required
              className="rounded-lg border p-3"
            />
            <input
              type="number"
              name="year"
              min={2024}
              value={formData.year}
              onChange={handleChange}
              required
              className="rounded-lg border p-3"
            />
          </div>

          <div className="flex justify-end gap-3 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="rounded-lg border px-5 py-2 hover:bg-gray-100"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="rounded-lg bg-black px-5 py-2 text-white hover:bg-gray-800 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {loading ? "Saving..." : budget ? "Update" : "Create"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddBudgetModal;