import PageContainer from "../../components/common/PageContainer";

import SummaryCards from "../../components/dashboard/SummaryCards";
import RecentTransactions from "../../components/dashboard/RecentTransactions";
import MonthlyChart from "../../components/dashboard/MonthlyChart";
import CategoryChart from "../../components/dashboard/CategoryChart";

import useDashboard from "../../hooks/useDashboard";

const Dashboard = () => {
  const { dashboard, loading } = useDashboard();

  if (loading) {
    return (
      <PageContainer>
        <h2>Loading...</h2>
      </PageContainer>
    );
  }

  return (
    <PageContainer>
      <h1 className="mb-8 text-3xl font-bold">
        Dashboard
      </h1>

      <SummaryCards summary={dashboard.summary} />

      <div className="mt-8 grid gap-8 xl:grid-cols-2">
        <RecentTransactions
          transactions={dashboard.recentTransactions}
        />

        <MonthlyChart
          data={dashboard.monthlyAnalytics}
        />
      </div>

      <div className="mt-8">
        <CategoryChart
          data={dashboard.categoryAnalytics}
        />
      </div>
    </PageContainer>
  );
};

export default Dashboard;