import ai from "../services/ai.service.js";
import getFinancialSummary from "../utils/financialSummary.js";

export const generateFinancialInsights = async (req, res, next) => {
  try {
    const financialSummary = await getFinancialSummary(req.user.id);

    if (!financialSummary.summary.totalTransactions) {
      return res.status(400).json({
        success: false,
        message: "No transactions found.",
      });
    }
const prompt = `You are an expert financial advisor and data analyst. 
Your task is to analyze the provided JSON data and generate a concise, highly accurate Financial Analysis Report.

### Core Directives
1. **Strict Grounding:** Base your analysis ONLY on the provided JSON. Do not invent information, assume missing values, or write generic filler. If data like budgets or recurring transactions are empty, briefly note them as unconfigured rather than analyzing zeros.
2. **Formatting Specs:** Return ONLY raw Markdown text. Do NOT wrap the output in \`\`\`markdown backticks and do NOT include any conversational filler.
3. **Typography:** Use "₹" for all monetary values. Format numbers using the standard Indian numbering system (e.g., ₹1,00,000). **Bold** all critical numbers, percentages, categories, and key financial terms.
4. **Emoji Usage:** Keep emojis minimal, apt, and strictly professional. Use them primarily as instructed in the structure below to enhance readability. Do not clutter the analytical text with emojis.
5. **Length & Tone:** Keep the tone crisp, objective, and professional. The entire report MUST be under 300 words.

### Required Structure
Follow this exact hierarchy and content guide:

# 📊 Financial Analysis Report

## 1. 💰 Financial Overview
[Briefly summarize total income, total expenses, current balance, and overall cash flow health.]

## 2. 💳 Spending Habits
[Highlight the top expense categories, major single transactions, and where spending is most concentrated.]

## 3. 📈 Positive Observations
[Use bullet points starting with "✅" to highlight strong indicators like high savings rates or low liabilities.]

## 4. ⚠️ Areas of Improvement
[Use bullet points starting with "📌" to identify risks, such as high category spending, lack of budgeting, or low transaction volume.]

## 5. 💡 Top 3 Recommendations
[Use a numbered list (1., 2., 3.) to provide exactly three actionable, data-driven steps to improve financial health.]

### Input Data
${JSON.stringify(financialSummary, null, 2)}
`;

    const response = await ai.models.generateContent({
    model: "gemini-3.1-flash-lite",
    contents: prompt,
    });

    return res.status(200).json({
      success: true,
      insights: response.text,
    });
  } catch (error) {
    next(error);
  }
};

export const askAIChat = async (req, res, next) => {
  try {
    const { message } = req.body;

    if (!message) {
      return res.status(400).json({
        success: false,
        message: "Message is required.",
      });
    }

    const financialSummary = await getFinancialSummary(req.user.id);

    const prompt = `You are an expert financial advisor and data analyst assistant.
The user is asking you a question about their finances.
Use their financial summary data below to answer their query accurately, contextually, and helpfully.

### Core Directives
1. **Strict Grounding:** Base your answers on the provided JSON data. If the user asks about budgets, transactions, categories, or overall financial status, use the real values. If some configuration is missing (e.g. no budgets or recurring transactions), point it out politely.
2. **Formatting Specs:** Return raw Markdown text. Do NOT wrap the output in \`\`\`markdown backticks and do NOT include any conversational filler.
3. **Typography:** Use "₹" for all monetary values. Format numbers using the standard Indian numbering system (e.g., ₹1,00,000). **Bold** all critical numbers, percentages, categories, and key terms.
4. **Length & Tone:** Keep the tone crisp, objective, helpful, and professional.

### Financial Summary Data
${JSON.stringify(financialSummary, null, 2)}

### User's Message
"${message}"
`;

    const response = await ai.models.generateContent({
      model: "gemini-3.1-flash-lite",
      contents: prompt,
    });

    return res.status(200).json({
      success: true,
      response: response.text,
    });
  } catch (error) {
    next(error);
  }
};