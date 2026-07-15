import { useNavigate } from "react-router-dom";

const DashboardAIBanner = () => {
  const navigate = useNavigate();

  return (
    <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
      <div className="inline-flex rounded-full bg-blue-50 px-3 py-1 text-xs font-semibold text-blue-700">
        ✨ AI Powered
      </div>

      <h2 className="mt-4 text-xl font-bold text-gray-900">
        AI Assistant
      </h2>

      <p className="mt-2 text-sm text-gray-500 leading-6">
        Get personalized financial insights
        and chat with your financial data.
      </p>

      <div className="mt-5 space-y-2 text-sm text-gray-700">
        <div className="flex items-center gap-2">
          📊 <span>Financial Insights</span>
        </div>

        <div className="flex items-center gap-2">
          💬 <span>Ask AI Anything</span>
        </div>
      </div>

      <button
        onClick={() => navigate("/ai-assistant")}
        className="mt-6 w-full rounded-lg bg-black py-2.5 text-sm font-medium text-white transition hover:bg-gray-800"
      >
        Open AI Assistant →
      </button>
    </div>
  );
};

export default DashboardAIBanner;