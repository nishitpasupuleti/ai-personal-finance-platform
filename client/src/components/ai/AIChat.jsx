import { useState } from "react";
import ReactMarkdown from "react-markdown";
import api from "../../api/axios";

const AIChat = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSend = async (e) => {
    e.preventDefault();
    if (!input.trim() || loading) return;

    const userMessage = input.trim();
    setInput("");
    setError("");
    setMessages((prev) => [...prev, { role: "user", content: userMessage }]);
    setLoading(true);

    try {
      const { data } = await api.post("/ai/chat", { message: userMessage });
      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: data.response },
      ]);
    } catch (err) {
      setError(
        err.response?.data?.message ||
          "Failed to get response from AI. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="rounded-xl bg-white p-6 shadow-sm">
      <h2 className="mb-2 text-xl font-semibold">💬 Ask AI</h2>
      <p className="mb-6 text-gray-500">Ask questions about your finances.</p>

      {/* Chat Messages */}
      <div className="mb-4 max-h-[400px] min-h-[150px] overflow-y-auto rounded-lg border bg-gray-50 p-4 space-y-4">
        {messages.length === 0 ? (
          <p className="text-gray-400 text-center py-8">
            Start a conversation with your AI financial assistant. Ask about your current balance, budgets, spending habits, or request a summary!
          </p>
        ) : (
          messages.map((msg, index) => (
            <div
              key={index}
              className={`flex flex-col ${
                msg.role === "user" ? "items-end" : "items-start"
              }`}
            >
              <div
                className={`max-w-[80%] rounded-2xl px-4 py-2.5 text-sm ${
                  msg.role === "user"
                    ? "bg-black text-white rounded-tr-none"
                    : "bg-white text-gray-800 border rounded-tl-none [&_ul]:list-disc [&_ul]:ml-4 [&_p]:mb-2 [&_p:last-child]:mb-0 [&_strong]:font-semibold"
                }`}
              >
                {msg.role === "user" ? (
                  <p className="whitespace-pre-wrap">{msg.content}</p>
                ) : (
                  <ReactMarkdown>{msg.content}</ReactMarkdown>
                )}
              </div>
            </div>
          ))
        )}

        {loading && (
          <div className="flex items-center gap-2 text-gray-500 text-sm italic">
            <div className="h-4 w-4 animate-spin rounded-full border-2 border-black border-t-transparent" />
            AI is thinking...
          </div>
        )}

        {error && (
          <div className="rounded-lg border border-red-200 bg-red-50 p-3 text-sm text-red-600">
            {error}
          </div>
        )}
      </div>

      {/* Input Form */}
      <form onSubmit={handleSend} className="flex gap-3">
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Ask about your balance, top expenses, monthly budget progress..."
          className="flex-1 rounded-lg border p-3 text-sm focus:border-black focus:outline-none"
          disabled={loading}
        />
        <button
          type="submit"
          disabled={loading || !input.trim()}
          className="rounded-lg bg-black px-6 py-3 text-sm font-semibold text-white hover:bg-gray-800 disabled:opacity-50 transition cursor-pointer"
        >
          Send
        </button>
      </form>
    </div>
  );
};

export default AIChat;