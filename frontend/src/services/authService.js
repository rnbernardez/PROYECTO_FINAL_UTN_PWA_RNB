import axios from "axios";

const API_URL = `${import.meta.env.VITE_API_URL}/api/user`; // Asegúrate de que coincida con el backend

export const login = async (email, password) => {
    const response = await axios.post(`${API_URL}/login`, { email, password });
    if (response.data.ok) {
        localStorage.setItem("token", response.data.token);
    }
    return response.data;
};

export const register = async (userData) => {
    const response = await axios.post(`${API_URL}/register`, userData);
    return response.data;
};