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

export const sendTutorMessage = async (question, sessionId = null) => {
  const token = localStorage.getItem('token');

  const headers = { 'Content-Type': 'application/json' };
  if (token) headers['Authorization'] = `Bearer ${token}`;

  const response = await fetch(`${API_BASE_URL}/tutor/ask`, {
    method: 'POST',
    headers,
    body: JSON.stringify({ question, sessionId }),
  });

  if (!response.ok) {
    const errorData = await parseJsonSafe(response);
    throw new Error((errorData && (errorData.error || errorData.message)) || response.statusText || 'Failed to send tutor message');
  }

  const data = await parseJsonSafe(response);
  return {
    reply: data?.answer || data?.reply || data?.message || null,
    sessionId: data?.sessionId || data?.session_id || null,
    raw: data,
  };
};

export const getChatSessions = async () => {
  const token = localStorage.getItem('token');
  if (!token) {
    throw new Error('No authentication token found');
  }

  const response = await fetch(`${API_BASE_URL}/chat/sessions`, {
    method: 'GET',
    headers: {
      'Authorization': `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    const errorData = await parseJsonSafe(response);
    throw new Error((errorData && (errorData.error || errorData.message)) || response.statusText || 'Failed to get chat sessions');
  }

  return parseJsonSafe(response);
};

export const getChatMessages = async (sessionId) => {
  const token = localStorage.getItem('token');
  if (!token) {
    throw new Error('No authentication token found');
  }

  const response = await fetch(`${API_BASE_URL}/chat/messages/${sessionId}`, {
    method: 'GET',
    headers: {
      'Authorization': `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    const errorData = await parseJsonSafe(response);
    throw new Error((errorData && (errorData.error || errorData.message)) || response.statusText || 'Failed to get chat messages');
  }

  return parseJsonSafe(response);
};
