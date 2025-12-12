import React from 'react';

const Home = () => {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="bg-blue-600 text-white py-20 border-b border-gray-300">
        <div className="px-6 py-4">
          <div className="text-center">
            <h1 className="text-5xl font-bold mb-6">Welcome to EduMentor</h1>
            <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
              Your AI-powered learning companion. Get instant help with homework, summarize documents, and enhance your study experience.
            </p>
            <div className="flex gap-4 justify-center flex-wrap">
              <button className="bg-white text-blue-700 px-8 py-3 rounded-lg font-bold hover:bg-gray-100 transition-colors">
                Get Started
              </button>
              <button className="bg-blue-500 text-white px-8 py-3 rounded-lg font-bold hover:bg-blue-600 transition-colors border border-white">
                Learn More
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
<section className="py-20 border-b border-gray-300">
  <div className="px-6 py-4">
    <h2 className="text-4xl font-bold text-center mb-16 text-gray-900">
      Powerful Learning Tools
    </h2>

    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">

      {/* Feature 1 */}
      <div className="bg-white border border-gray-300 rounded p-6">
        <div className="p-4">
          <h3 className="text-2xl font-bold text-gray-900 mb-3">
            AI Tutor Chatbot
          </h3>
          <p className="text-gray-600 leading-relaxed">
            Ask questions and get instant answers from our AI tutor.
            Perfect for learning new concepts and clarifying doubts.
          </p>
        </div>
      </div>

      {/* Feature 2 */}
      <div className="bg-white border border-gray-300 rounded p-6">
        <div className="p-4">
          <h3 className="text-2xl font-bold text-gray-900 mb-3">
            RAG Chatbot
          </h3>
          <p className="text-gray-600 leading-relaxed">
            Upload your study materials and chat with an AI that understands
            your documents. Smart retrieval and contextual answers.
          </p>
        </div>
      </div>

      {/* Feature 3 */}
      <div className="bg-white border border-gray-300 rounded p-6">
        <div className="p-4">
          <h3 className="text-2xl font-bold text-gray-900 mb-3">
            Notes Generator
          </h3>
          <p className="text-gray-600 leading-relaxed">
            Transform your rough notes into well-structured, organized notes.
            AI-powered summarization and formatting.
          </p>
        </div>
      </div>

    </div>
  </div>
</section>
    </div>
  );
};

export default Home;
