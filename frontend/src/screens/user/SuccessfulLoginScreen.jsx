import React from "react";
import { Link } from "react-router-dom";
import Navbar from "../../components/Navbar.jsx";

const SuccessfulLoginScreen = () => {
  return (
    <>
      <Navbar />
      <div className="d-flex justify-content-center align-items-center vh-100">
        <div className="card p-4 shadow-sm text-center">
          <h2 className="mb-3">¡Bienvenido! 🎉</h2>
          <p>Has iniciado sesión correctamente.</p>
          <Link to="/shop" className="btn btn-primary mt-3">
            Ir a la tienda
          </Link>
        </div>
      </div>
    </>
  );
};

export default SuccessfulLoginScreen;