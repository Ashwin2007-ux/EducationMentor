import { useState, useEffect } from 'react'
import { API_BASE_URL } from './services/apiClient.js';
import './App.css'
import NavBar from "./Components/NavBar.jsx";
import Home from "./Components/Home.jsx";
import AITutorChat from "./Components/Chat/AITutorChat.jsx";
import RagChat from "./Components/Chat/RagChat.jsx";
import NotesGenerator from "./Components/notes/NotesGenerator.jsx";
import About from "./Components/About.jsx";
import Login from "./Components/Auth/Login.jsx";
import Register from "./Components/Auth/Register.jsx";

function App() {
  const [activePage, setActivePage] = useState("home");
  const [user, setUser] = useState(null);

  // Check if user is logged in on app start
  useEffect(() => {
    const initAuth = async () => {
      const token = localStorage.getItem('token');
      const userData = localStorage.getItem('user');

      if (token && userData) {
        setUser(JSON.parse(userData));
        return;
      }

      // Try silent default login to enable features when no backend DB
      try {
        const res = await fetch(`${API_BASE_URL}/auth/login`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email: 'admin@edumentor.com', password: 'admin123' })
        });

        if (res.ok) {
          const data = await res.json();
          if (data.token && data.user) {
            localStorage.setItem('token', data.token);
            localStorage.setItem('user', JSON.stringify(data.user));
            setUser(data.user);
          }
        }
      } catch {
        // ignore - backend might be unreachable
      }
    };

    initAuth();
  }, []);

  

  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setActivePage('home');
  };

  const handleLogin = (userData) => {
    if (userData) {
      setUser(userData);
      try { localStorage.setItem('user', JSON.stringify(userData)); } catch {}
      setActivePage('home');
    }
  };

  const switchToRegister = () => setActivePage('register');


  const renderPage = () => {
    switch(activePage) {
      case "home":
        return <Home setActivePage={setActivePage} />;
      case "ai-tutor":
        return <AITutorChat />;
      case "rag-chat":
        return <RagChat />;
      case "notes":
        return <NotesGenerator />;
      case "about":
        return <About />;
      default:
        return <Home />;
    }
  };

  // Always show main app (login removed)

  // Show main app if authenticated
  return (
    <div className="flex flex-col h-screen bg-gray-50">
      <NavBar
        activePage={activePage}
        setActivePage={setActivePage}
        user={user}
        onLogout={handleLogout}
      />
      <main className="flex-1 overflow-auto">
        {renderPage()}
        {activePage === 'login' && (
          <Login onLogin={handleLogin} onSwitchToRegister={() => switchToRegister()} />
        )}
        {activePage === 'register' && (
          <Register onSwitchToLogin={() => setActivePage('login')} />
        )}
      </main>
    </div>
  )
}

export default App
