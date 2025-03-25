import { useState, useEffect } from 'react';
import axios from 'axios';

const useProducts = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const { data } = await axios.get(`${import.meta.env.VITE_API_URL}/api/shop`);
        setProducts(data);
      } catch (error) {
        console.error("Error al obtener productos", error);
      }
    };
    fetchProducts();
  }, []);

  return { products };
};

export default useProducts;