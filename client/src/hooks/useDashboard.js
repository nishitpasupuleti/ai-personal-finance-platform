/* eslint-disable react-hooks/set-state-in-effect */
import { useEffect, useState } from "react";
import api from "../api/axios";

const useDashboard = () => {
  const [dashboard, setDashboard] = useState({
    summary: {
      currentBalance: 0,
      totalIncome: 0,
      totalExpense: 0,
      totalTransactions: 0,
    },
    recentTransactions: [],
    monthlyAnalytics: [],
    categoryAnalytics: [],
  });

  const [loading, setLoading] = useState(true);

  const fetchDashboard = async () => {
    try {
      setLoading(true);

      const { data } = await api.get("/dashboard");

      setDashboard(data.data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDashboard();
  }, []);

  return {
    dashboard,
    loading,
    fetchDashboard,
  };
};

export default useDashboard;