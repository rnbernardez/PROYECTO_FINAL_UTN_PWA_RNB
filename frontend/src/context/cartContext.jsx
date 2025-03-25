import React, { createContext, useState, useEffect } from "react";
import { api } from "../api/api.js";

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState(null);

  const fetchCart = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) return;

      const response = await api.get("/cart", {
        headers: { Authorization: `Bearer ${token}` },
      });

      setCart(response.data.cart);
    } catch (error) {
      console.error("Error al obtener el carrito", error);
    }
  };

  useEffect(() => {
    fetchCart();
  }, []);

  return (
    <CartContext.Provider value={{ cart, fetchCart }}>
      {children}
    </CartContext.Provider>
  );
};