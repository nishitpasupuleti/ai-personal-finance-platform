import CategoryCard from "./CategoryCard.jsx";

const CategoryGrid = ({
  categories,
  onRefresh,
}) => {
  if (!categories.length) {
    return (
      <div className="rounded-xl bg-white p-8 text-center shadow-sm">
        No categories found.
      </div>
    );
  }

  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {categories.map((category) => (
        <CategoryCard
          key={category.id}
          category={category}
          onRefresh={onRefresh}
        />
      ))}
    </div>
  );
};

export default CategoryGrid;