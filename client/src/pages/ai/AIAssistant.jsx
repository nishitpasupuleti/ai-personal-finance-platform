import PageContainer from "../../components/common/PageContainer";

import AIInsightsCard from "../../components/ai/AIInsightsCard";
import AIChat from "../../components/ai/AIChat";

const AIAssistant = () => {
  return (
    <PageContainer>
      <h1 className="mb-2 text-3xl font-bold">
        🤖 AI Assistant
      </h1>

      <p className="mb-8 text-gray-500">
        Analyze your finances and ask questions
        about your spending, budgets and
        transactions.
      </p>

      <AIInsightsCard />

      <div className="mt-8">
        <AIChat />
      </div>
    </PageContainer>
  );
};

export default AIAssistant;