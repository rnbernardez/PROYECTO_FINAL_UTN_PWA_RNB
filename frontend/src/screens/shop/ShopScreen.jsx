import React, { useEffect, useState } from 'react';
import { api } from '../api/api'; // Importamos la API

const ShopScreen = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await api.get("/products"); // Llamada a la API
        setProducts(response.data.products); // Guardamos los productos en el estado
      } catch (error) {
        console.error("Error al obtener los productos", error);
      }
    };

    fetchProducts();
  }, []);

  return (
    <div>
      <h1>Tienda</h1>
      <ul>
        {products.map((product) => (
          <li key={product._id}>
            <h3>{product.name}</h3>
            <p>{product.price} USD</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ShopScreen;