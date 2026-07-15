import PageContainer from "../../components/common/PageContainer";

import SummaryCards from "../../components/dashboard/SummaryCards";
import DashboardAIBanner from "../../components/dashboard/DashboardAIBanner";
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

      {/* AI + Recent Transactions */}
      <div className="mt-6 grid grid-cols-1 gap-6 xl:grid-cols-12">
        <div className="xl:col-span-4">
          <DashboardAIBanner />
        </div>

        <div className="xl:col-span-8">
          <RecentTransactions
            transactions={dashboard.recentTransactions}
          />
        </div>
      </div>

      {/* Charts */}
      <div className="mt-6 grid grid-cols-1 gap-6 xl:grid-cols-2">
        <MonthlyChart
          data={dashboard.monthlyAnalytics}
        />

        <CategoryChart
          data={dashboard.categoryAnalytics}
        />
      </div>
    </PageContainer>
  );
};

export default Dashboard;