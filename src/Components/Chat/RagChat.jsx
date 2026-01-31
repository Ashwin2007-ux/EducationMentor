import React, { useState } from "react";
import { sendMessage } from "../../services/ragApi";

const RagChat = () => {
  const [inputValue, setInputValue] = useState("");
  const [messages, setMessages] = useState([]);
  const [selectedFile, setSelectedFile] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setError("");
    
    if (file) {
      if (file.type !== "application/pdf") {
        setError("Only PDF files are allowed");
        e.target.value = "";
        return;
      }
      if (file.size > 10 * 1024 * 1024) {
        setError("File size too large. Maximum 10MB allowed.");
        e.target.value = "";
        return;
      }
      setSelectedFile(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!inputValue.trim()) return;

    const userMessage = { sender: "user", text: inputValue };
    setMessages((prev) => [...prev, userMessage]);

    const question = inputValue;
    setInputValue("");
    setIsLoading(true);
    setError("");

    try {
      const response = await sendMessage(question, selectedFile);

      const botMessage = {
        sender: "bot",
        text: response.reply || response.answer || response.text || "No response",
      };

      setMessages((prev) => [...prev, botMessage]);
      
      if (selectedFile) {
        setSelectedFile(null);
        const fileInput = document.getElementById("fileInput");
        if (fileInput) fileInput.value = "";
      }
    } catch (error) {
      console.error(error);
      const errorText = error.message || "Error processing request";
      setMessages((prev) => [
        ...prev,
        { sender: "bot", text: ` ${errorText}` },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleClear = () => {
    setMessages([]);
    setInputValue("");
    setSelectedFile(null);
    setError("");
    const fileInput = document.getElementById("fileInput");
    if (fileInput) fileInput.value = "";
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-black-500 to-gray-900 flex flex-col">

      {/* Header */}
      <div className="bg-gradient-to-r from-yellow-500 to-yellow-600 text-black p-6 shadow-lg border-b-4 border-yellow-700">
        <h1 className="text-3xl font-bold"> RAG Chatbot</h1>
        <p className="text-yellow-900 text-sm mt-1">Upload PDFs and ask questions about their content</p>
      </div>

      <div className="flex-1 flex flex-col p-6 gap-6">

        <div className="bg-black border-2 border-yellow-400 p-6 rounded-lg shadow-md">
          <p className="font-semibold text-yellow-700 text-lg mb-4">Upload PDF Document</p>

          <div className="flex gap-4 items-center mb-4">
            <label className="cursor-pointer">
              <div className="inline-block bg-yellow-500 hover:bg-yellow-600 text-black px-6 py-3 font-semibold border border-yellow-700 rounded-lg transition-colors">
                Choose File
              </div>
              <input 
                id="fileInput"
                type="file" 
                accept=".pdf"
                className="hidden" 
                onChange={handleFileChange}
              />
            </label>
            
            {selectedFile && (
              <div className="text-sm font-medium text-green-700 bg-green-50 px-4 py-2 rounded border border-green-200">
                ✓ {selectedFile.name}
              </div>
            )}
          </div>

          {error && (
            <div className="text-sm text-red-700 bg-red-50 px-4 py-2 rounded border border-red-200">
              {error}
            </div>
          )}
        </div>

        {/* Chat Window */}
        <div className="flex-1 flex flex-col bg-gray-900 border-2 border-yellow-500 p-6 rounded-lg shadow-md">

          <label className="text-yellow-700 font-bold text-lg block mb-4">
             Chat Window
          </label>

          <div className="flex-1 bg-yellow-50 border border-yellow-200 p-4 mb-4 overflow-y-auto rounded-lg">
            {messages.length === 0 ? (
              <div className="flex items-center justify-center h-full text-gray-500">
                <div className="text-center">
                  <p className="text-lg font-semibold mb-2">👋 Welcome!</p>
                  <p className="text-sm">Upload a PDF and ask questions about it</p>
                </div>
              </div>
            ) : (
              messages.map((msg, index) => (
                <div key={index} className={`mb-3 ${msg.sender === 'user' ? 'text-right' : 'text-left'}`}>
                  <p className={`inline-block px-4 py-2 rounded-lg max-w-xs ${
                    msg.sender === 'user' 
                      ? 'bg-yellow-500 text-black' 
                      : 'bg-gray-300 text-gray-900'
                  }`}>
                    {msg.text}
                  </p>
                </div>
              ))
            )}
            {isLoading && (
              <div className="text-center">
                <div className="inline-block bg-gray-300 text-gray-900 px-4 py-2 rounded-lg">
                  <div className="flex space-x-2">
                    <div className="w-2 h-2 bg-gray-900 rounded-full animate-bounce"></div>
                    <div className="w-2 h-2 bg-gray-900 rounded-full animate-bounce delay-100"></div>
                    <div className="w-2 h-2 bg-gray-900 rounded-full animate-bounce delay-200"></div>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Input Form */}
          <form onSubmit={handleSubmit} className="flex gap-2 items-center">
            <input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder="Type your question..."
              disabled={isLoading}
              className="flex-1 border-2 border-yellow-400 bg-white text-gray-900 px-4 py-3 h-12 placeholder-gray-500 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500"
            />

            <button
              type="submit"
              disabled={isLoading || !inputValue.trim()}
              className="bg-yellow-500 hover:bg-yellow-600 disabled:bg-gray-400 text-black px-6 py-3 font-bold rounded-lg transition-colors"
            >
              Send
            </button>

            <button
              type="button"
              onClick={handleClear}
              className="bg-gray-500 hover:bg-gray-600 text-white px-4 py-3 font-semibold rounded-lg transition-colors"
            >
              Clear
            </button>
          </form>

        </div>

      </div>
    </div>
  );
};

export default RagChat;
