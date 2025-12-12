import React, { useState } from "react";

const NotesGenerator = () => {
  const [inputNotes, setInputNotes] = useState("");
  const [generatedNotes, setGeneratedNotes] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleGenerateNotes = () => {
    if (!inputNotes.trim()) return;

    setIsLoading(true);
    setTimeout(() => {
      setGeneratedNotes("Your structured notes will appear here...\n\n" + inputNotes);
      setIsLoading(false);
    }, 1200);
  };

  const handleClear = () => {
    setInputNotes("");
    setGeneratedNotes("");
  };

  return (
    <div className="min-h-screen bg-blue-50 flex flex-col">
\
      <div className="bg-[#0a0f1f] text-white p-6">
        <h1 className="text-3xl font-bold">Notes Generator</h1>
        <p className="text-cyan-300">Convert your rough notes into clean structured notes</p>
      </div>

      <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-6 flex-1">


        <div className="bg-white p-5 rounded shadow">
          <h2 className="text-xl font-bold mb-3">Your Notes</h2>

          <textarea
            value={inputNotes}
            onChange={(e) => setInputNotes(e.target.value)}
            placeholder="Type or paste your notes here..."
            className="w-full h-52 p-3 border rounded text-sm"
          />

          <button
            onClick={handleGenerateNotes}
            className="w-full bg-blue-600 text-white py-2 rounded mt-3"
          >
            {isLoading ? "Processing..." : "Generate Notes"}
          </button>

          <button
            onClick={handleClear}
            className="w-full bg-gray-900 text-purple-300 py-2 rounded mt-3"
          >
            Clear
          </button>
        </div>

        {/* Output Section */}
        <div className="bg-white p-5 rounded shadow flex flex-col">
          <h2 className="text-xl font-bold mb-3">Structured Notes</h2>

          {!generatedNotes ? (
            <div className="bg-black flex-1 flex items-center justify-center text-amber-500">
              No notes yet. Enter text and click Generate.
            </div>
          ) : (
            <div className="flex-1 bg-gray-100 p-3 rounded overflow-y-auto text-sm whitespace-pre-wrap">
              {generatedNotes}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default NotesGenerator;
