import React, { useState, useEffect } from "react";
import { sendTutorMessage } from "../../services/tutorApi";

const AITutorChat = () => {
  const [messages, setMessages] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [currentSessionId, setCurrentSessionId] = useState(null);

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (!inputValue.trim()) return;

    const userMessage = {
      id: Date.now(),
      text: inputValue,
      sender: "user",
    };

    setMessages((prev) => [...prev, userMessage]);
    const question = inputValue;
    setInputValue("");
    setIsTyping(true);

    try {
      const response = await sendTutorMessage(question, currentSessionId);

      const aiMessage = {
        id: Date.now() + 1,
        text: response.reply,
        sender: "ai",
      };

      setMessages((prev) => [...prev, aiMessage]);
      setCurrentSessionId(response.sessionId);

    } catch (error) {
      console.error("Error fetching response:", error);

      setMessages((prev) => [
        ...prev,
        {
          id: Date.now() + 1,
          text: "Sorry, I couldn't get a response right now. Please check your internet connection.",
          sender: "ai",
        },
      ]);
    } finally {
      setIsTyping(false);
    }
  };

  const handleClearChat = () => {
    setMessages([]);
    setCurrentSessionId(null);
  };

  return (
    <div className="h-screen flex flex-col bg-gradient-to-b from-blue-50 to-black">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-700">
        <h1 className="text-2xl font-bold">🎓 AI Tutor Chatbot</h1>
        <p className="text-blue-100 text-sm">Ask anything and get instant help from your AI tutor</p>
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.length === 0 ? (
          <div className="flex items-center justify-center h-full text-gray-900">
            <div className="text-center">
              <p className="text-lg font-semibold mb-2"> Welcome to AI Tutor!</p>
              <p className="text-sm">Start asking questions to get help</p>
            </div>
          </div>
        ) : (
          messages.map((message) => (
            <div
              key={message.id}
              className={`flex ${message.sender === "user" ? "justify-end" : "justify-start"}`}
            >
              <div
                className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${
                  message.sender === "user"
                    ? "bg-blue-600 text-white rounded-br-none"
                    : "bg-gray-400 text-gray-900 rounded-bl-none"
                }`}
              >
                <p className="text-sm">{message.text}</p>
              </div>
            </div>
          ))
        )}

        {isTyping && (
          <div className="flex justify-start">
            <div className="bg-gray-300 text-gray-900 px-4 py-2 rounded-lg rounded-bl-none">
              <div className="flex space-x-2">
                <div className="w-2 h-2 bg-gray-900 rounded-full animate-bounce"></div>
                <div className="w-2 h-2 bg-gray-900 rounded-full animate-bounce delay-100"></div>
                <div className="w-2 h-2 bg-gray-900 rounded-full animate-bounce delay-200"></div>
              </div>
            </div>
          </div>
        )}
      </div>

      <div className="bg-amber-900 border-t border-amber-700 p-4 shadow-lg">
        <form onSubmit={handleSendMessage} className="flex gap-2">
          <input
            type="text"
            className="flex-1 px-4 py-2 border border-gray-900 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Ask me anything..."
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            disabled={isTyping}
          />

          <button
            type="submit"
            disabled={isTyping || !inputValue.trim()}
            className="bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white px-6 py-2 rounded-lg font-medium transition-colors"
          >
            Send
          </button>

          <button
            type="button"
            onClick={handleClearChat}
            className="bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded-lg font-medium transition-colors"
          >
            Clear
          </button>
        </form>
      </div>
    </div>
  );
};

export default AITutorChat;
