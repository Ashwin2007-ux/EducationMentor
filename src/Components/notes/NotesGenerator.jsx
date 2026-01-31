import React, { useState } from "react";
import { generateNotesFromPDF } from "../../services/notesApi.js";

const NotesGenerator = () => {
  const [generatedNotes, setGeneratedNotes] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const [fileName, setFileName] = useState("");
  const [error, setError] = useState("");

  const handleGenerateNotes = async () => {
    if (!selectedFile) {
      setError("Please select a PDF file first.");
      return;
    }

    setIsLoading(true);
    setError("");
    
    try {
      const notes = await generateNotesFromPDF(selectedFile);
      setGeneratedNotes(notes);
    } catch (error) {
      console.error("Error generating notes:", error);
      setError(error.message || "Error generating notes. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

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
      setFileName(file.name);
    }
  };

  const handleClear = () => {
    setSelectedFile(null);
    setFileName("");
    setGeneratedNotes("");
    setError("");
    document.getElementById("fileInput").value = "";
  };

  const downloadNotes = () => {
    if (!generatedNotes) return;

    const element = document.createElement("a");
    const file = new Blob([generatedNotes], { type: "text/plain" });
    element.href = URL.createObjectURL(file);
    element.download = `notes_${fileName.replace(".pdf", "")}_${new Date().toISOString().split("T")[0]}.txt`;
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  const copyToClipboard = () => {
    if (!generatedNotes) return;
    navigator.clipboard.writeText(generatedNotes).then(() => {
      alert("Notes copied to clipboard!");
    });
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <div className="p-6">
        <h1 className="text-2xl font-semibold">Notes Generator</h1>
        <p className="text-sm text-gray-600 mt-2">Convert PDF documents into structured notes.</p>
      </div>

      {/* Main Content */}
      <div className="p-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          
          {/* Upload Section */}
          <div className="bg-white p-6 border rounded">
            <h2 className="text-lg font-medium mb-4">Upload PDF Document</h2>
            
            {/* File Input */}
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Select PDF File (Max 10MB)
              </label>
              <input
                id="fileInput"
                type="file"
                accept=".pdf"
                onChange={handleFileChange}
                className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100 cursor-pointer"
              />
            </div>

            {/* Selected File Display */}
            {fileName && (
              <div className="mb-4 p-3 bg-green-50 border border-green-200 rounded-md flex items-center gap-2">
                <span className="text-xl">✓</span>
                <p className="text-green-800 text-sm">
                  <span className="font-medium">Selected:</span> {fileName}
                </p>
              </div>
            )}

            {/* Error Display */}
            {error && (
              <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-md flex items-center gap-2">
                <span className="text-xl">⚠️</span>
                <p className="text-red-800 text-sm">{error}</p>
              </div>
            )}

            {/* Action Buttons */}
            <div className="space-y-3">
              <button
                onClick={handleGenerateNotes}
                disabled={isLoading || !selectedFile}
                className={`w-full py-3 px-4 rounded-md font-bold transition-colors flex items-center justify-center gap-2 ${
                  isLoading || !selectedFile
                    ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                    : "bg-blue-600 text-white hover:bg-blue-700"
                }`}
              >
{isLoading ? 'Processing PDF...' : 'Generate Notes'}
              </button>

              <button
                onClick={handleClear}
                className="w-full py-2 px-4 bg-gray-500 text-white rounded-md hover:bg-gray-600 transition-colors font-semibold"
              >
                Clear All
              </button>
            </div>
          </div>

          {/* Notes Output Section */}
          <div className="bg-white p-6 border rounded">
            <h2 className="text-lg font-medium mb-4">Generated Notes</h2>
            
            <div className="border rounded h-96 overflow-y-auto mb-4 p-4">
              {!generatedNotes ? (
                <div className="flex items-center justify-center h-full text-gray-500">
                  <div className="text-center">
                    <svg className="mx-auto h-12 w-12 text-gray-400 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                    <p className="text-lg font-semibold mb-1">No notes generated yet</p>
                    <p className="text-sm">Upload a PDF and click "Generate Notes" to get started</p>
                  </div>
                </div>
              ) : (
                <div className="prose prose-sm max-w-none text-gray-700 whitespace-pre-wrap leading-relaxed">
                  {generatedNotes}
                </div>
              )}
            </div>

            {/* Action Buttons for Notes */}
            {generatedNotes && (
              <div className="flex gap-2">
                <button onClick={downloadNotes} className="flex-1 py-2 px-4 bg-gray-800 text-white rounded text-sm">Download Notes</button>
                <button onClick={copyToClipboard} className="flex-1 py-2 px-4 bg-gray-200 rounded text-sm">Copy</button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotesGenerator;