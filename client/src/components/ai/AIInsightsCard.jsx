import { useState } from "react";
import ReactMarkdown from "react-markdown";

import api from "../../api/axios";

const AIInsightsCard = () => {
  const [loading, setLoading] = useState(false);

  const [insights, setInsights] = useState("");

  const [error, setError] = useState("");

  const generateInsights = async () => {
    try {
      setLoading(true);
      setError("");

      const { data } = await api.post(
        "/ai/financial-insights"
      );

      setInsights(data.insights);
    } catch (error) {
      setError(
        error.response?.data?.message ||
          "Failed to generate insights."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="rounded-xl bg-white p-6 shadow-sm">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h2 className="text-xl font-semibold">
            🤖 AI Financial Insights
          </h2>

          <p className="mt-1 text-sm text-gray-500">
            Analyze your spending habits with AI.
          </p>
        </div>

        <button
          onClick={generateInsights}
          disabled={loading}
          className="rounded-lg bg-black px-4 py-2 text-white transition hover:bg-gray-800 disabled:opacity-60"
        >
          {loading
            ? "Generating..."
            : insights
            ? "Regenerate"
            : "Generate"}
        </button>
      </div>

      {loading && (
        <div className="rounded-lg border bg-gray-50 p-6">
          <p className="font-medium">
            🤖 Analyzing your finances...
          </p>

          <p className="mt-2 text-sm text-gray-500">
            This may take a few seconds.
          </p>
        </div>
      )}

      {!loading && error && (
        <div className="rounded-lg border border-red-200 bg-red-50 p-4 text-red-600">
          {error}
        </div>
      )}

      {!loading && insights && (
  <div className="[&_h1]:text-3xl [&_h1]:font-bold [&_h2]:text-2xl [&_h2]:font-bold [&_h2]:mt-6 [&_h2]:mb-3 [&_ul]:list-disc [&_ul]:ml-6 [&_p]:mb-4">
    <ReactMarkdown>
      {insights}
    </ReactMarkdown>
  </div>
)}

      {!loading && !insights && !error && (
        <div className="rounded-lg border border-dashed p-8 text-center text-gray-500">
          Click <strong>Generate</strong> to receive
          personalized AI financial insights.
        </div>
      )}
    </div>
  );
};

export default AIInsightsCard;