import { useNavigate } from "react-router-dom";

const DashboardAIBanner = () => {
  const navigate = useNavigate();

  return (
    <div className="relative overflow-hidden rounded-xl border border-white/10 bg-gradient-to-br from-slate-900 via-indigo-950 to-slate-900 p-5 shadow-lg">
      {/* Subtle Decorative Background Element (matches the auth pages) */}
      <div className="absolute -top-10 -right-10 w-[150px] h-[150px] bg-blue-500/20 rounded-full blur-3xl pointer-events-none" />

      <div className="relative z-10">
        <div className="inline-flex rounded-full bg-indigo-500/20 border border-indigo-500/30 px-3 py-1 text-xs font-semibold text-indigo-300">
          ✨ AI Powered
        </div>

        <h2 className="mt-4 text-xl font-bold text-white tracking-tight">
          AI Assistant
        </h2>

        <p className="mt-2 text-sm text-slate-300 leading-6">
          Get personalized financial insights
          and chat with your financial data.
        </p>

        <div className="mt-5 space-y-3 text-sm text-slate-200">
          <div className="flex items-center gap-2.5">
            <span className="text-lg">📊</span> 
            <span className="font-medium">Financial Insights</span>
          </div>

          <div className="flex items-center gap-2.5">
            <span className="text-lg">💬</span> 
            <span className="font-medium">Ask AI Anything</span>
          </div>
        </div>

        <button
          onClick={() => navigate("/ai-assistant")}
          className="mt-6 w-full rounded-lg bg-white py-2.5 text-sm font-bold text-gray-900 transition hover:bg-gray-100 shadow-md active:scale-95"
        >
          Open AI Assistant →
        </button>
      </div>
    </div>
  );
};

export default DashboardAIBanner;