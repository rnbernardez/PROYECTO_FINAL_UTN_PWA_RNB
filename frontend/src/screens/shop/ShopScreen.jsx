import React, { useEffect, useState } from 'react';
import { api } from '../api/api'; // Importamos la API
import { Link } from 'react-router-dom'; // Usamos Link para redirigir a la página de detalles del producto

const ShopScreen = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true); // Estado para mostrar el cargando
  const [error, setError] = useState(null); // Estado para los errores

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await api.get("/shop"); // Llamada a la API para obtener los productos
        setProducts(response.data); // Guardamos los productos en el estado
      } catch (error) {
        setError("Hubo un error al cargar los productos");
        console.error("Error al obtener los productos", error);
      } finally {
        setLoading(false); // Terminamos de cargar los productos
      }
    };

    fetchProducts();
  }, []); // Este hook solo se ejecuta una vez al montar el componente

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
