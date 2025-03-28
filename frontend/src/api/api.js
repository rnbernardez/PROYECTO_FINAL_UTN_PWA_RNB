import axios from "axios";

const API_BASE_URL = import.meta.env.VITE_API_URL || 'https://proyecto-final-utn-pwa-rnb.onrender.com';

const api = axios.create({
  baseURL: API_BASE_URL, // Asegúrate que NO termine con /api
  headers: {
    "Content-Type": "application/json",
  },
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error("Error en la API:", error.response?.data || error.message);
    return Promise.reject(error);
  }
);

export default api;