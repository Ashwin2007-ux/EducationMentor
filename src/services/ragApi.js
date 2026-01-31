import { API_BASE_URL } from './apiClient.js';

const parseJsonSafe = async (response) => {
  const ct = response.headers.get('content-type') || '';
  if (ct.includes('application/json')) {
    try { return await response.json(); } catch { return null; }
  }
  const text = await response.text();
  if (!text) return null;
  try { return JSON.parse(text); } catch { return { text }; }
};

export async function sendMessage(question, file = null) {
  const token = localStorage.getItem('token');
  const formData = new FormData();
  formData.append('question', question);

  // If file is provided, upload it first then query
  if (file) {
    formData.append('file', file);
    
    // First upload the document
    const headers = {};
    if (token) headers['Authorization'] = `Bearer ${token}`;
    
    const uploadResponse = await fetch(`${API_BASE_URL}/rag/upload`, {
      method: 'POST',
      headers,
      body: formData,
    });

    if (!uploadResponse.ok) {
      const err = await parseJsonSafe(uploadResponse);
      throw new Error((err && (err.error || err.message)) || uploadResponse.statusText || 'Failed to upload document');
    }

    const uploadedDoc = await parseJsonSafe(uploadResponse);
    const documentId = uploadedDoc.documentId;

    // Then query the document
    const queryData = { question, documentId };
    const queryResponse = await fetch(`${API_BASE_URL}/rag/query`, {
      method: 'POST',
      headers: { ...headers, 'Content-Type': 'application/json' },
      body: JSON.stringify(queryData),
    });

    if (!queryResponse.ok) {
      const err = await parseJsonSafe(queryResponse);
      throw new Error((err && (err.error || err.message)) || queryResponse.statusText || 'Failed to query document');
    }

    const data = await parseJsonSafe(queryResponse);
    return {
      reply: data?.answer || data?.text || 'No response',
      ...data
    };
  } else {
    // If no file, just send a message (demo mode)
    const headers = {};
    if (token) headers['Authorization'] = `Bearer ${token}`;

    const response = await fetch(`${API_BASE_URL}/rag/query`, {
      method: 'POST',
      headers: { ...headers, 'Content-Type': 'application/json' },
      body: JSON.stringify({ question, documentId: null }),
    });

    if (!response.ok) {
      const err = await parseJsonSafe(response);
      throw new Error((err && (err.error || err.message)) || response.statusText || 'Failed to send message');
    }

    const data = await parseJsonSafe(response);
    return {
      reply: data?.answer || data?.text || 'No response',
      ...data
    };
  }
}
