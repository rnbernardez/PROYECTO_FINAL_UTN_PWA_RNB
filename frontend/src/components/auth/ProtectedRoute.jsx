import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';

// Función para obtener el estado de autenticación (ejemplo)
const isAuthenticated = () => {
  return !!localStorage.getItem("token"); // Verificamos si hay un token en localStorage
};

const ProtectedRoute = () => {
  return isAuthenticated() ? <Outlet /> : <Navigate to="/user/login" />;
};

export default ProtectedRoute;
