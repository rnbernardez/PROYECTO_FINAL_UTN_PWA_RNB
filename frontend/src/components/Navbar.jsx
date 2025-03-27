import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";

function Navbar() {
  const [search, setSearch] = useState("");
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
    if (search.trim()) {
      navigate(`/shop/search/${search}`);
    }
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
            <li className="nav-item mx-2">
              <Link className="nav-link" to="/cart">
                <i className="bi bi-cart-fill me-1"></i> Carrito
              </Link>
            </li>
            <li className="nav-item mx-2">
              <Link className="nav-link" to="/user/register">Registrarse</Link>
            </li>
            <li className="nav-item mx-2">
              <Link className="nav-link" to="/user/login">Iniciar sesión</Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;