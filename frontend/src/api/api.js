import axios from "axios";

const API_BASE_URL = import.meta.env.VITE_API_URL || "https://proyecto-final-utn-pwa-rnb.onrender.com";

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  } else {
    console.warn("No se encontró un token de autenticación. Se bloquearán solicitudes protegidas.");
    return Promise.reject(new Error("Usuario no autenticado"));
  }
  return config;
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error("Error en la API:", error.response?.data || error.message);
    if (error.response?.status === 401) {
      console.warn("Sesión expirada o usuario no autenticado. Redirigiendo al login...");
      localStorage.removeItem("token");
      window.location.href = "/user/login";
    }
    return Promise.reject(error);
  }
);

export default api;