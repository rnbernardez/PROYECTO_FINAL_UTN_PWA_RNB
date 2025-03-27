import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

function Navbar() {
  const [search, setSearch] = useState("");
  const [user, setUser] = useState(null);
  const [cartCount, setCartCount] = useState(0);
  const navigate = useNavigate();

  // Cargar datos del usuario y carrito al montar el componente
  useEffect(() => {
    // Verificar usuario logueado
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }

    // Cargar carrito y contar productos
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    setCartCount(cart.length);
  }, []);

  // Escuchar cambios en el carrito (cuando se actualiza en localStorage)
  useEffect(() => {
    const handleStorageChange = () => {
      const cart = JSON.parse(localStorage.getItem("cart")) || [];
      setCartCount(cart.length);
    };

    // Agregar evento para escuchar cambios en localStorage
    window.addEventListener("storage", handleStorageChange);
    return () => {
      window.removeEventListener("storage", handleStorageChange);
    };
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    if (search.trim()) {
      navigate(`/shop/search/${search}`);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/home");
    setUser(null);
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <div className="container">
        {/* Nombre del E-commerce */}
        <Link className="navbar-brand" to="/">Pescado Libre</Link>

        {/* Botón de menú en dispositivos móviles */}
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
          <span className="navbar-toggler-icon"></span>
        </button>

        {/* Contenido de la Navbar */}
        <div className="collapse navbar-collapse" id="navbarNav">
          <form className="d-flex mx-auto" onSubmit={handleSearch}>
            <input
              className="form-control me-2"
              type="search"
              placeholder="Buscar productos..."
              aria-label="Buscar"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
            <button className="btn btn-outline-light" type="submit">Buscar</button>
          </form>

          <ul className="navbar-nav ms-auto">
            {/* Carrito de compras con contador */}
            <li className="nav-item mx-2">
              <Link className="nav-link" to="/cart">
                <i className="bi bi-cart-fill me-1"></i> Carrito
                {cartCount > 0 && <span className="badge bg-danger ms-1">{cartCount}</span>}
              </Link>
            </li>

            {/* Si el usuario está logueado, mostramos su nombre y el botón de cerrar sesión */}
            {user ? (
              <>
                <li className="nav-item mx-2">
                  <span className="nav-link">👤 {user.name}</span>
                </li>
                <li className="nav-item mx-2">
                  <button className="btn btn-outline-light" onClick={handleLogout}>Cerrar sesión</button>
                </li>
              </>
            ) : (
              <>
                {/* Si NO está logueado, mostramos los enlaces de login y registro */}
                <li className="nav-item mx-2">
                  <Link className="nav-link" to="/user/register">Registrarse</Link>
                </li>
                <li className="nav-item mx-2">
                  <Link className="nav-link" to="/user/login">Iniciar sesión</Link>
                </li>
              </>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;