import { useState } from 'react'
import './App.css'
import NavBar from "./Components/NavBar.jsx";
import Home from "./Components/Home.jsx";
import AITutorChat from "./Components/Chat/AITutorChat.jsx";
import RagChat from "./Components/Chat/RagChat.jsx";
import NotesGenerator from "./Components/notes/NotesGenerator.jsx";
import About from "./Components/About.jsx";

function App() {
  const [activePage, setActivePage] = useState("home");

  const renderPage = () => {
    switch(activePage) {
      case "home":
        return <Home />;
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

  return (
    <div className="flex flex-col h-screen bg-gray-50">
      <NavBar activePage={activePage} setActivePage={setActivePage} />
      <main className="flex-1 overflow-auto">
        {renderPage()}
      </main>
    </div>
  )
}

export default App
