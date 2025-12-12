import React, { useState } from 'react';

const AITutorChat = () => {
  const [messages, setMessages] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (!inputValue.trim()) return;

    const userMessage = {
      id: messages.length + 1,
      text: inputValue,
      sender: "user"
    };

    setMessages([...messages, userMessage]);
    setInputValue('');
    setIsTyping(true);

    setTimeout(() => {
      setIsTyping(false);
    }, 1200);
  };

  const clearChat = () => {
    setMessages([]);
  };

  return (
    <div className="h-full flex flex-col bg-[#0d1b2a]">

     
      <div className="bg-blue-600 text-white p-4 border-b border-gray-300">
        <h1 className="text-xl font-bold">AI Tutor Chatbot</h1>
      </div>

   
      <div className="flex-1  p-4 space-y-3 bg-white border border-gray-300 m-4">
      </div>

   
      <div className="p-2 bg-black border-t border-gray-300">
        <form onSubmit={handleSendMessage} className="flex gap-2">
          
          <input
            type="text"
            className="border border-gray-400 p-2 flex-1"
            placeholder="Type something..."
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
          />

          <button className="bg-blue-600 text-amber-700 px-4" type="submit">
            Send
          </button>

          <button
            type="button"
            onClick={clearChat}
            className="bg-gray-500 text-black px-3"
          >
            Clear
          </button>
        </form>
      </div>

    </div>
  );
};

export default AITutorChat;
