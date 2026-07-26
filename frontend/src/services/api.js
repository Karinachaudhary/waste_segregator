import axios from 'axios';

// Create Axios Instance targeting Node.js backend on port 5001
const API = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:5001/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

// Auto-attach JWT Authorization header if available
API.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
}, (error) => {
  return Promise.reject(error);
});

// API Helper Endpoints
export const wasteApi = {
  // Check Backend Health
  getHealth: () => API.get('/health'),

  // Upload & Classify Waste Item
  scanWasteItem: (data) => API.post('/waste/scan', data),

  // Get User Scan History & Stats
  getUserStats: () => API.get('/user/stats'),
};

export default API;
