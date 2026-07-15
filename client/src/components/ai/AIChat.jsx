import { useState } from "react";

const AIChat = () => {
  const [message, setMessage] =
    useState("");

  return (
    <div className="rounded-xl bg-white p-6 shadow-sm">
      <h2 className="mb-2 text-xl font-semibold">
        💬 Ask AI
      </h2>

      <p className="mb-6 text-gray-500">
        Ask questions about your finances.
      </p>

      <div className="mb-4 rounded-lg border bg-gray-50 p-4">
        <p className="text-gray-400">
          Start a conversation with your AI
          financial assistant.
        </p>
      </div>

      <div className="flex gap-3">
        <input
          value={message}
          onChange={(e) =>
            setMessage(e.target.value)
          }
          placeholder="Ask something..."
          className="flex-1 rounded-lg border p-3"
        />

        <button className="rounded-lg bg-black px-6 text-white">
          Send
        </button>
      </div>
    </div>
  );
};

export default AIChat;