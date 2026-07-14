/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import api from "../api/axios";

const useTransactions = () => {
  const [transactions, setTransactions] = useState([]);
  const [pagination, setPagination] = useState(null);
  const [loading, setLoading] = useState(true);

  const [filters, setFilters] = useState({
    page: 1,
    search: "",
    type: "",
    categoryId: "",
  });

  const fetchTransactions = async (
    currentFilters = filters
  ) => {
    try {
      setLoading(true);

      const params = {
        page: currentFilters.page,
        limit: 10,
      };

      if (currentFilters.search) {
        params.search = currentFilters.search;
      }

      if (currentFilters.type) {
        params.type = currentFilters.type;
      }

      if (currentFilters.categoryId) {
        params.categoryId =
          currentFilters.categoryId;
      }

      const { data } = await api.get(
        "/transactions",
        {
          params,
        }
      );

      setTransactions(data.data);
      setPagination(data.pagination);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    fetchTransactions(filters);
  }, [filters]);

  return {
    transactions,
    pagination,
    loading,
    filters,
    setFilters,
    fetchTransactions,
  };
};

export default useTransactions;