import { API_BASE_URL } from "./apiClient.js";

const parseJsonSafe = async (response) => {
  const ct = response.headers.get('content-type') || '';
  if (ct.includes('application/json')) {
    try { return await response.json(); } catch { return null; }
  }
  const text = await response.text();
  if (!text) return null;
  try { return JSON.parse(text); } catch { return { text }; }
};

export const generateNotesFromPDF = async (file) => {
  const token = localStorage.getItem('token');

  const formData = new FormData();
  formData.append("file", file);

  const headers = {};
  if (token) headers['Authorization'] = `Bearer ${token}`;

  const response = await fetch(`${API_BASE_URL}/notes/generate`, {
    method: "POST",
    headers,
    body: formData,
  });

  if (!response.ok) {
    const errorData = await parseJsonSafe(response);
    throw new Error((errorData && (errorData.error || errorData.message)) || response.statusText || "Failed to generate notes");
  }

  const data = await parseJsonSafe(response) || {};
  const structure = data.structure || {};
  const notesText = formatNotesFromStructure(structure, data.title);
  return notesText;
};

const formatNotesFromStructure = (structure, title) => {
  let output = `=== ${title || 'Notes'} ===\n\n`;
  
  if (structure.sections && Array.isArray(structure.sections)) {
    output += `## Sections\n${structure.sections.join('\n')}\n\n`;
  }
  
  if (structure.keyPoints && Array.isArray(structure.keyPoints)) {
    output += `## Key Points\n${structure.keyPoints.map(kp => `- ${kp}`).join('\n')}\n\n`;
  }
  
  if (structure.summary) {
    output += `## Summary\n${structure.summary}\n\n`;
  }
  
  if (structure.questions && Array.isArray(structure.questions)) {
    output += `## Review Questions\n${structure.questions.map((q, i) => `${i + 1}. ${q}`).join('\n')}\n\n`;
  }
  
  return output;
};

export const getUserNotes = async () => {
  const token = localStorage.getItem('token');
  if (!token) {
    throw new Error('No authentication token found');
  }

  const response = await fetch(`${API_BASE_URL}/notes`, {
    method: "GET",
    headers: {
      'Authorization': `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    const errorData = await parseJsonSafe(response);
    throw new Error((errorData && (errorData.error || errorData.message)) || response.statusText || "Failed to get notes");
  }

  return parseJsonSafe(response);
};
