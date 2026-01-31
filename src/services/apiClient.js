const raw = import.meta.env.VITE_API_BASE_URL || "http://localhost:5000/api";
const API_BASE_URL = raw.replace(/\/+$/g, '');

export { API_BASE_URL };