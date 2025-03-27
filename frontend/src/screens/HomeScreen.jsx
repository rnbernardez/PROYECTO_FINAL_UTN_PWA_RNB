import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { fetchAllProducts } from '../services/apiService';
import Navbar from '../components/Navbar.jsx'; // Importamos la Navbar

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
    <>
      <Navbar /> {/* Navbar agregada */}
      
      <div className="container mt-4">
        <header className="text-center mb-4">
          <h1 className="fw-bold">Bienvenido a la Tienda</h1>
          <p className="text-muted">Descubre nuestros productos y empieza a comprar</p>
        </header>

        <section>
          <h2 className="mb-3">Productos Destacados</h2>
          {loading && <p className="text-primary">Cargando productos...</p>}
          {error && <p className="text-danger">{error}</p>}

          <div className="row">
            {products.map((product) => (
              <div key={product._id} className="col-md-4 mb-4">
                <div className="card h-100 shadow-sm">
                  <img src={product.image} className="card-img-top" alt={product.name} />
                  <div className="card-body">
                    <h5 className="card-title">{product.name}</h5>
                    <p className="card-text">{product.description}</p>
                    <Link to={`/shop/product/${product._id}`} className="btn btn-primary">
                      Ver más
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        <footer className="text-center mt-5 py-3 bg-light">
          <p className="mb-0">&copy; 2025 Tienda Online. Todos los derechos reservados.</p>
        </footer>
      </div>
    </>
  );
};

export default HomeScreen;