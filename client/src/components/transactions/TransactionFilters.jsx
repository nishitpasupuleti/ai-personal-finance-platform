import { useEffect, useState } from "react";

const TransactionFilters = ({
  filters,
  onFilterChange,
  categories,
  onAddTransaction,
}) => {
  const [search, setSearch] = useState(filters.search);

  useEffect(() => {
    const timer = setTimeout(() => {
      onFilterChange({
        ...filters,
        search,
      });
    }, 500);

    return () => clearTimeout(timer);
  }, [search, filters, onFilterChange]);

  return (
    <div className="mb-6 flex flex-wrap items-center gap-4 rounded-xl bg-white p-4 shadow-sm">
      <input
        type="text"
        placeholder="Search transactions..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="flex-1 rounded-lg border p-3"
      />

      <select
        value={filters.type}
        onChange={(e) =>
          onFilterChange({
            ...filters,
            type: e.target.value,
          })
        }
        className="rounded-lg border p-3"
      >
        <option value="">All Types</option>
        <option value="income">Income</option>
        <option value="expense">Expense</option>
      </select>

      <select
        value={filters.categoryId}
        onChange={(e) =>
          onFilterChange({
            ...filters,
            categoryId: e.target.value,
          })
        }
        className="rounded-lg border p-3"
      >
        <option value="">All Categories</option>

        {categories.map((category) => (
          <option
            key={category.id}
            value={category.id}
          >
            {category.name}
          </option>
        ))}
      </select>

      <button
        onClick={onAddTransaction}
        className="rounded-lg bg-black px-5 py-3 text-white"
      >
        Add Transaction
      </button>
    </div>
  );
};

export default TransactionFilters;