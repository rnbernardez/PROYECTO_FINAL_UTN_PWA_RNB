import React from 'react';
import { useNavigate } from 'react-router-dom';

const ProfileScreen = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token"); // Eliminamos el token
    navigate("/home"); // Redirigimos al inicio
  };

  return (
    <div>
      <h1>Perfil</h1>
      <button onClick={handleLogout}>Cerrar Sesión</button>
    </div>
  );
};

export default ProfileScreen;