import axios from 'axios';

const client = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || 'http://localhost:8081/api',
  headers: { 'Content-Type': 'application/json' },
});

// Attach the logged-in user's token, if any, to every request.
client.interceptors.request.use((config) => {
  const token = localStorage.getItem('transitops_token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Normalize backend error shape (see GlobalExceptionHandler) into a plain message.
client.interceptors.response.use(
  (res) => res,
  (err) => {
    const data = err.response?.data;
    const message = data?.error || data?.message || err.message || 'Request failed';
    return Promise.reject({ ...err, message });
  }
);

export default client;
