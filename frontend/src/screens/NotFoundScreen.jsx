import React from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar'; // Importamos la Navbar

const NotFoundScreen = () => {
  return (
    <>
      <Navbar /> {/* Navbar agregada */}

      <div className="container d-flex flex-column align-items-center justify-content-center vh-100 text-center">
        <h1 className="display-1 fw-bold text-danger">404</h1>
        <h2 className="mb-3">Página no encontrada</h2>
        <p className="text-muted">Lo sentimos, la página que buscas no existe o ha sido movida.</p>
        <Link to="/" className="btn btn-primary mt-3">Volver al inicio</Link>
      </div>
    </>
  );
};

export default NotFoundScreen;