import { useCallback, useEffect, useState } from "react";
import api from "../api/axios";

const useRecurringTransactions = () => {
  const [recurringTransactions, setRecurringTransactions] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchRecurringTransactions = useCallback(async () => {
    try {
      setLoading(true);
      const { data } = await api.get("/recurring");
      setRecurringTransactions(data.data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    fetchRecurringTransactions();
  }, [fetchRecurringTransactions]);

  const createRecurringTransaction = async (payload) => {
    await api.post("/recurring", payload);
    await fetchRecurringTransactions();
  };

  const updateRecurringTransaction = async (id, payload) => {
    await api.patch(`/recurring/${id}`, payload);
    await fetchRecurringTransactions();
  };

  const deleteRecurringTransaction = async (id) => {
    await api.delete(`/recurring/${id}`);
    await fetchRecurringTransactions();
  };

  return {
    recurringTransactions,
    loading,
    createRecurringTransaction,
    updateRecurringTransaction,
    deleteRecurringTransaction,
    fetchRecurringTransactions,
  };
};

export default useRecurringTransactions;