import React from "react";
import { Link } from "react-router-dom";

const SuccessfulLoginScreen = () => {
  return (
    <div>
      <h2>¡Bienvenido! 🎉</h2>
      <p>Has iniciado sesión correctamente.</p>
      <Link to="/shop">Ir a la tienda</Link>
    </div>
  );
};

export default SuccessfulLoginScreen;