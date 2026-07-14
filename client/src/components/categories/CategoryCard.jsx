import api from "../../api/axios";

const CategoryCard = ({ category, onRefresh }) => {
  const handleDelete = async () => {
    const confirmed = window.confirm(
      `Delete "${category.name}"?`
    );

    if (!confirmed) return;

    try {
      await api.delete(`/categories/${category.id}`);
      onRefresh();
    } catch (error) {
      alert(
        error.response?.data?.message ||
          "Failed to delete category."
      );
    }
  };

  return (
    <div className="rounded-xl bg-white p-5 shadow-sm">
      <div className="mb-4 flex items-center gap-3">
        <div
          className="flex h-12 w-12 items-center justify-center rounded-full text-2xl"
          style={{
            backgroundColor: category.color,
          }}
        >
          {category.icon}
        </div>

        <div>
          <h2 className="font-semibold">
            {category.name}
          </h2>
        </div>
      </div>

      <button
        onClick={handleDelete}
        className="w-full rounded-lg bg-red-500 py-2 text-white"
      >
        Delete
      </button>
    </div>
  );
};

export default CategoryCard;