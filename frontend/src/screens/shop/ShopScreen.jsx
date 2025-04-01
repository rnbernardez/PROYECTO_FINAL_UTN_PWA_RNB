import React, { useEffect, useState } from 'react';
import api from '../../api/api.js';
import { Link } from 'react-router-dom'; 

const ShopScreen = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await api.get("/shop");
        setProducts(response.data);
      } catch (error) {
        setError("Hubo un error al cargar los productos");
        console.error("Error al obtener los productos", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  if (loading) return <p>Cargando productos...</p>;

  if (error) return <p>{error}</p>;

  return (
    <div>
      <h1>Tienda</h1>
      {products.length === 0 ? (
        <p>No hay productos disponibles.</p>
      ) : (
        <ul>
          {products.map((product) => (
            <li key={product._id}>
              <h3>{product.name}</h3>
              <p>{product.price} USD</p>
              <Link to={`/shop/product/${product._id}`}>Ver detalles</Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default ShopScreen;
