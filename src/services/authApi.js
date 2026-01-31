import { API_BASE_URL } from './apiClient.js';

const parseJsonSafe = async (response) => {
  const contentType = response.headers.get('content-type') || '';
  if (contentType.includes('application/json')) {
    try {
      return await response.json();
    } catch (err) {
      return null;
    }
  }

  // Fallback: try to read text and parse
  const text = await response.text();
  if (!text) return null;
  try {
    return JSON.parse(text);
  } catch (err) {
    return { text };
  }
};

export const registerUser = async (username, email, password) => {
  const response = await fetch(`${API_BASE_URL}/auth/register`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ username, email, password }),
  });

  if (!response.ok) {
    const errorData = await parseJsonSafe(response);
    throw new Error((errorData && (errorData.error || errorData.message)) || response.statusText || 'Registration failed');
  }

  const data = (await parseJsonSafe(response)) || {};
  if (data.token) localStorage.setItem('token', data.token);
  return data;
};

export const loginUser = async (email, password) => {
  const response = await fetch(`${API_BASE_URL}/auth/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ email, password }),
  });

  if (!response.ok) {
    const errorData = await parseJsonSafe(response);
    throw new Error((errorData && (errorData.error || errorData.message)) || response.statusText || 'Login failed');
  }

  const data = (await parseJsonSafe(response)) || {};
  if (data.token) localStorage.setItem('token', data.token);
  return data;
};

export const logoutUser = () => {
  localStorage.removeItem('token');
};

export const getCurrentUser = () => {
  const token = localStorage.getItem('token');
  if (!token) return null;

  try {
    const payload = JSON.parse(atob(token.split('.')[1]));
    return payload;
  } catch (error) {
    return null;
  }
};
