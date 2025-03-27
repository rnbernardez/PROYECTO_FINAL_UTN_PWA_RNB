import { Link, useNavigate } from "react-router-dom";

const ProfileSidebar = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.clear();
    navigate("/user/login");
  };

  return (
    <div className="d-flex flex-column flex-shrink-0 p-3 bg-light vh-100 sidebar">
      {/* Botón para móviles */}
      <button 
        className="btn btn-outline-dark d-lg-none mb-3" 
        type="button" 
        data-bs-toggle="collapse" 
        data-bs-target="#sidebarMenu"
      >
        ☰ Menú
      </button>

      {/* Sidebar */}
      <div className="collapse d-lg-block" id="sidebarMenu">
        <h4 className="text-center">Mi Cuenta</h4>
        <ul className="nav nav-pills flex-column mb-auto">
          <li className="nav-item">
            <Link className="nav-link text-dark" to="/user/profile">👤 Mi Usuario</Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link text-dark" to="/user/products">📦 Mis Productos</Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link text-dark" to="/user/edit">✏️ Modificar Datos</Link>
          </li>
          <li className="nav-item">
            <button className="nav-link text-danger border-0 bg-transparent" onClick={handleLogout}>
              🚪 Cerrar Sesión
            </button>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default ProfileSidebar;