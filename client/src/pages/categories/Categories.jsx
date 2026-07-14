import { useState } from "react";

import PageContainer from "../../components/common/PageContainer";

import CategoryGrid from "../../components/categories/CategoryGrid";
import AddCategoryModal from "../../components/categories/AddCategoryModal";

import useCategories from "../../hooks/useCategories";

const Categories = () => {
  const {
    categories,
    loading,
    fetchCategories,
  } = useCategories();

  const [openModal, setOpenModal] = useState(false);

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
        <h1 className="text-3xl font-bold">
          Categories
        </h1>

        <button
          onClick={() => setOpenModal(true)}
          className="rounded-lg bg-black px-5 py-3 text-white"
        >
          Add Category
        </button>
      </div>

      <CategoryGrid
        categories={categories}
        onRefresh={fetchCategories}
      />

      <AddCategoryModal
        open={openModal}
        onClose={() => setOpenModal(false)}
        onSuccess={fetchCategories}
      />
    </PageContainer>
  );
};

export default Categories;