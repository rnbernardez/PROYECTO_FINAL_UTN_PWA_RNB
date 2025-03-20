import React from "react";
import { Link } from "react-router-dom";

const PurchaseOkScreen = () => {
  return (
    <div>
      <h2>¡Compra realizada con éxito! 🎉</h2>
      <p>Gracias por tu compra. Te hemos enviado un correo con los detalles.</p>
      <Link to="/shop">Volver a la tienda</Link>
    </div>
  );
};

export default PurchaseOkScreen;