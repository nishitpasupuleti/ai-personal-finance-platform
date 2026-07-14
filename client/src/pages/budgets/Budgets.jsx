import { useState } from "react";

import PageContainer from "../../components/common/PageContainer";
import BudgetCard from "../../components/budgets/BudgetCard";
import AddBudgetModal from "../../components/budgets/AddBudgetModal";

import useBudgets from "../../hooks/useBudgets";
import useCategories from "../../hooks/useCategories";

const Budgets = () => {
  const {
    budgets,
    loading,
    createBudget,
    updateBudget,
    deleteBudget,
  } = useBudgets();

  const { categories } = useCategories();

  const [open, setOpen] = useState(false);
  const [selectedBudget, setSelectedBudget] =
    useState(null);

  const openCreateModal = () => {
    setSelectedBudget(null);
    setOpen(true);
  };

  const openEditModal = (budget) => {
    setSelectedBudget(budget);
    setOpen(true);
  };

  const closeModal = () => {
    setSelectedBudget(null);
    setOpen(false);
  };

  const handleSubmit = async (payload) => {
    if (selectedBudget) {
      await updateBudget(
        selectedBudget.id,
        payload
      );
    } else {
      await createBudget(payload);
    }

    closeModal();
  };

  const handleDelete = async (id) => {
    const confirmed = window.confirm(
      "Delete this budget?"
    );

    if (!confirmed) return;

    await deleteBudget(id);
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
          <h1 className="text-3xl font-bold">
            Budgets
          </h1>

          <p className="mt-1 text-gray-500">
            Manage your monthly spending
            limits.
          </p>
        </div>

        <button
          onClick={openCreateModal}
          className="rounded-lg bg-black px-5 py-2 text-white hover:bg-gray-800"
        >
          + Add Budget
        </button>
      </div>

      {budgets.length === 0 ? (
        <div className="rounded-xl border border-dashed py-16 text-center">
          <div className="mb-4 text-6xl">
            📊
          </div>

          <h2 className="text-xl font-semibold">
            No Budgets Found
          </h2>

          <p className="mt-2 text-gray-500">
            Create your first monthly budget.
          </p>
        </div>
      ) : (
        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {budgets.map((budget) => (
            <BudgetCard
              key={budget.id}
              budget={budget}
              onEdit={openEditModal}
              onDelete={handleDelete}
            />
          ))}
        </div>
      )}

      <AddBudgetModal
        open={open}
        onClose={closeModal}
        onSubmit={handleSubmit}
        categories={categories}
        budget={selectedBudget}
      />
    </PageContainer>
  );
};

export default Budgets;