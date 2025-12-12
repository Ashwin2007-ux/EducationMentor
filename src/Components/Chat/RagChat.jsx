import React, { useState } from "react";

const RagChat = () => {
  const [inputValue, setInputValue] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    setInputValue("");
  };

  return (
    <div className="min-h-screen bg-black flex flex-col">

      <div className="bg-yellow-500 text-black p-6 border-b border-yellow-300">
        <h1 className="text-2xl font-bold">RAG Chatbot</h1>
      </div>

      <div className="flex-1 p-6 flex flex-col gap-10">

     
        <div className="bg-black border border-yellow-400 p-6">
          <p className="font-semibold text-yellow-400 text-lg mb-4">Upload Document</p>

          <label className="cursor-pointer">
            <div className="inline-block bg-yellow-500 text-black px-6 py-3 font-semibold border border-yellow-300 hover:bg-yellow-400 transition">
              Choose File
            </div>
            <input type="file" className="hidden" />
          </label>

          
        </div>

  
        <div className="bg-gray-900 border-2 border-yellow-500 p-4 rounded">

          <label className="text-yellow-400 font-semibold text-lg block mb-2">
            Chat Window
          </label>


          <div className="bg-gray-800 border border-gray-600 p-3 text-gray-300 h-40 mb-4 overflow-y-auto rounded">
            <p className="text-right text-yellow-400">You: Example user message…</p>
          </div>

          <form onSubmit={handleSubmit} className="flex gap-2 items-center">

            <input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder="Type your message..."
             className="border-2 border-yellow-400 bg-black text-yellow-300 px-16 py-6 w-96 h-14 placeholder-gray-500 rounded"


            />

            <button
              type="submit"
              className="bg-yellow-500 text-black px-4 py-2 font-semibold rounded text-sm"
            >
              Send
            </button>
          </form>

        </div>

      </div>
    </div>
  );
};

export default RagChat;
