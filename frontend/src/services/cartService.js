import axios from "axios";

const API_URL = "http://localhost:5000/api/cart";

export const getCart = async () => {
    const token = localStorage.getItem("token");
    const response = await axios.get(`${API_URL}`, {
        headers: { Authorization: `Bearer ${token}` }
    });
    return response.data;
};

export const checkout = async () => {
    const token = localStorage.getItem("token");
    const response = await axios.post(`${API_URL}/checkout`, {}, {
        headers: { Authorization: `Bearer ${token}` }
    });
    return response.data;
};