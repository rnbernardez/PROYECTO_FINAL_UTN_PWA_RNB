import { useState, useEffect } from 'react';
import axios from 'axios';

const useCart = () => {
  const [cart, setCart] = useState(null);

  useEffect(() => {
    const fetchCart = async () => {
      try {
        const token = localStorage.getItem("token");
        const { data } = await axios.get("http://localhost:5000/api/cart", {
          headers: { Authorization: `Bearer ${token}` }
        });
        setCart(data.cart);
      } catch (error) {
        console.error("Error al obtener el carrito", error);
      }
    };
    fetchCart();
  }, []);

  return { cart, setCart };
};

export default useCart;