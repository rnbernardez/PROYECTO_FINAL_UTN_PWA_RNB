import axios from "axios";

const API_BASE_URL = import.meta.env.VITE_API_URL;

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// 🔥 Interceptor para incluir el token JWT en cada petición si el usuario está autenticado
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token"); // Suponiendo que guardamos el token aquí
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// 🔥 Interceptor para manejar errores globalmente
api.interceptors.response.use(
  (response) => response, // Si la respuesta es exitosa, simplemente la retorna
  (error) => {
    console.error("Error en la API:", error.response?.data || error.message);

    // Manejo específico de errores
    if (error.response?.status === 401) {
      console.warn("Usuario no autenticado o sesión expirada");
      // Aquí podríamos redirigir al usuario al login, por ejemplo
    } else if (error.response?.status === 403) {
      console.warn("Acceso prohibido");
    } else if (error.response?.status === 500) {
      console.warn("Error en el servidor, inténtalo más tarde.");
    }

    return Promise.reject(error); // Importante para que el frontend maneje el error
  }
);

export default api;