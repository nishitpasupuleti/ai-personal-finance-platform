/* eslint-disable no-unused-vars */
import { useState } from "react";
import api from "../../api/axios";

import PageContainer from "../../components/common/PageContainer";

import TransactionFilters from "../../components/transactions/TransactionFilters";
import TransactionTable from "../../components/transactions/TransactionTable";
import TransactionPagination from "../../components/transactions/TransactionPagination";
import AddTransactionModal from "../../components/transactions/AddTransactionModal";

import useTransactions from "../../hooks/useTransactions";
import useCategories from "../../hooks/useCategories";

const Transactions = () => {
  const {
    transactions,
    pagination,
    loading,
    filters,
    setFilters,
    fetchTransactions,
  } = useTransactions();

  const { categories } = useCategories();

  const [openModal, setOpenModal] =
    useState(false);

  const [selectedTransaction, setSelectedTransaction] =
    useState(null);

  const handleCreate = () => {
    setSelectedTransaction(null);
    setOpenModal(true);
  };

  const handleEdit = (transaction) => {
    setSelectedTransaction(transaction);
    setOpenModal(true);
  };

  const handleDelete = async (transaction) => {
    if (
      !window.confirm(
        `Delete "${transaction.title}"?`
      )
    ) {
      return;
    }

    try {
      await api.delete(
        `/transactions/${transaction.id}`
      );

      fetchTransactions(filters);
    } catch (error) {
      alert(
        error.response?.data?.message ||
          "Delete failed"
      );
    }
  };

  return (
    <PageContainer>
      <h1 className="mb-8 text-3xl font-bold">
        Transactions
      </h1>

      <TransactionFilters
        filters={filters}
        onFilterChange={setFilters}
        categories={categories}
        onAddTransaction={handleCreate}
      />

      <TransactionTable
        transactions={transactions}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />

      <TransactionPagination
        pagination={pagination}
        onPageChange={(page) =>
          setFilters({
            ...filters,
            page,
          })
        }
      />

      <AddTransactionModal
        open={openModal}
        onClose={() => {
          setOpenModal(false);
          setSelectedTransaction(null);
        }}
        categories={categories}
        transaction={selectedTransaction}
        onSuccess={() =>
          fetchTransactions(filters)
        }
      />
    </PageContainer>
  );
};

export default Transactions;