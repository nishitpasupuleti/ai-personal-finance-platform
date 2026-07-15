import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";

import ProtectedRoute from "./ProtectedRoute";

import MainLayout from "../layouts/MainLayout";

import Login from "../pages/auth/Login";
import Register from "../pages/auth/Register";

import Dashboard from "../pages/dashboard/Dashboard";
import Transactions from "../pages/transactions/Transactions";
import Categories from "../pages/categories/Categories";
import Budgets from "../pages/budgets/Budgets";
import RecurringTransactions from "../pages/recurring/RecurringTransactions";
import Settings from "../pages/settings/Settings";
import AIAssistant from "../pages/ai/AIAssistant";
import NotFound from "../pages/NotFound";

const AppRoutes = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/dashboard" replace />} />

        <Route path="/login" element={<Login />} />

        <Route path="/register" element={<Register />} />

        <Route
          element={
            <ProtectedRoute>
              <MainLayout />
            </ProtectedRoute>
          }
        >
          <Route path="/dashboard" element={<Dashboard />} />

          <Route path="/ai-assistant" element={<AIAssistant />}
          />

          <Route path="/transactions" element={<Transactions />} />

          <Route path="/categories" element={<Categories />} />

          <Route path="/budgets" element={<Budgets />} />

          <Route path="/recurring" element={<RecurringTransactions />} />

          <Route path="/settings" element={<Settings />} />

        </Route>

        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
};

export default AppRoutes;