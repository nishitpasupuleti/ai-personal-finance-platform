import { useCallback, useEffect, useState } from "react";
import api from "../api/axios";

const useBudgets = () => {
  const [budgets, setBudgets] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchBudgets = useCallback(async () => {
    try {
      setLoading(true);
      const { data } = await api.get("/budgets");
      setBudgets(data.data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    fetchBudgets();
  }, [fetchBudgets]);

  const createBudget = async (payload) => {
    await api.post("/budgets", payload);
    await fetchBudgets();
  };

  const updateBudget = async (id, payload) => {
    await api.patch(`/budgets/${id}`, payload);
    await fetchBudgets();
  };

  const deleteBudget = async (id) => {
    await api.delete(`/budgets/${id}`);
    await fetchBudgets();
  };

  return { budgets, loading, fetchBudgets, createBudget, updateBudget, deleteBudget };
};

export default useBudgets;