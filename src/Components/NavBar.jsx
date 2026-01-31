import React from 'react';

const NavBar = ({ activePage, setActivePage, user, onLogout }) => {
  const navItems = [
    { id: 'home', label: 'Home' },
    { id: 'ai-tutor', label: 'AI Tutor' },
    { id: 'rag-chat', label: 'RAG Chat' },
    { id: 'notes', label: 'Notes' },
    { id: 'about', label: 'About' },
  ];

  return (
    <nav className="bg-blue-600 text-white border-b border-gray-300">
      <div className="px-6 py-4">
        <div className="flex justify-between items-center mb-4">
          <div>
            <div className="text-3xl font-bold">EduMentor</div>
            <div className="text-sm text-blue-100">AI-Powered Learning Assistant</div>
          </div>

          <div className="flex items-center gap-4">
            <span className="text-sm">Welcome, {user?.username || 'Guest'}</span>
            {!user ? (
              <button
                onClick={() => setActivePage('login')}
                className="px-3 py-1 bg-green-500 hover:bg-green-600 rounded text-sm font-medium transition-colors"
              >
                Login
              </button>
            ) : (
              <button
                onClick={onLogout}
                className="px-3 py-1 bg-red-500 hover:bg-red-600 rounded text-sm font-medium transition-colors"
              >
                Logout
              </button>
            )}
          </div>
        </div>

        <div className="flex flex-wrap gap-2">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => setActivePage(item.id)}
              className={`px-4 py-2 rounded font-medium transition-all duration-200 ${
                activePage === item.id
                  ? 'bg-white text-blue-600 border border-gray-300'
                  : 'bg-blue-500 hover:bg-blue-700 text-white border border-blue-400'
              }`}
            >
              {item.label}
            </button>
          ))}
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
