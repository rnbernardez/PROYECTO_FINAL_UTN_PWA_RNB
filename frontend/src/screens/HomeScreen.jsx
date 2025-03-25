import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { fetchAllProducts } from '../services/apiService';
import '../styles/HomeScreenCSS.css';

const HomeScreen = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadProducts = async () => {
      try {
        const response = await fetchAllProducts();
        setProducts(response.data);
      } catch (err) {
        setError('Error al cargar los productos');
      } finally {
        setLoading(false);
      }
    };
    loadProducts();
  }, []);

  return (
    <div className="home-screen">
      <header>
        <h1>Bienvenido a la Tienda</h1>
        <p>Descubre nuestros productos y empieza a comprar</p>
      </header>
      
      <section>
        <h2>Productos Destacados</h2>
        {loading && <p>Cargando productos...</p>}
        {error && <p className="error">{error}</p>}
        <div className="product-list">
          {products.map((product) => (
            <div key={product._id} className="product-item">
              <img src={product.image} alt={product.name} />
              <h3>{product.name}</h3>
              <p>{product.description}</p>
              <Link to={`/shop/product/${product._id}`}>Ver más</Link>
            </div>
          ))}
        </div>
      </section>
      
      <footer>
        <p>&copy; 2025 Tienda Online. Todos los derechos reservados.</p>
      </footer>
    </div>
  );
};

export default HomeScreen;
