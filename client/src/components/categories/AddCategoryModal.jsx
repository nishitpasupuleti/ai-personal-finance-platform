import { useState } from "react";
import api from "../../api/axios";

const AddCategoryModal = ({
  open,
  onClose,
  onSuccess,
}) => {
  const [formData, setFormData] = useState({
    name: "",
    icon: "",
    color: "#3b82f6",
  });

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
      await api.post("/categories", formData);

      onSuccess();

      onClose();

      setFormData({
        name: "",
        icon: "",
        color: "#3b82f6",
      });
    } catch (error) {
      alert(
        error.response?.data?.message ||
          "Failed to create category."
      );
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="w-full max-w-md rounded-xl bg-white p-6">
        <h2 className="mb-6 text-2xl font-bold">
          Add Category
        </h2>

        <form
          onSubmit={handleSubmit}
          className="space-y-4"
        >
          <input
            name="name"
            placeholder="Category Name"
            value={formData.name}
            onChange={handleChange}
            className="w-full rounded border p-3"
            required
          />

          <input
            name="icon"
            placeholder="Emoji (🍔)"
            value={formData.icon}
            onChange={handleChange}
            className="w-full rounded border p-3"
          />

          <input
            type="color"
            name="color"
            value={formData.color}
            onChange={handleChange}
            className="h-12 w-full rounded border"
          />

          <div className="flex justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className="rounded border px-4 py-2"
            >
              Cancel
            </button>

            <button
              type="submit"
              className="rounded bg-black px-4 py-2 text-white"
            >
              Create
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddCategoryModal;