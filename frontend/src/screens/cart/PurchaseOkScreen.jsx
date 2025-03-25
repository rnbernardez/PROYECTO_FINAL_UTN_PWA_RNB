import React, { useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import { CartContext } from "../context/cartContext.jsx";

const PurchaseOkScreen = () => {
  const { fetchCart } = useContext(CartContext);

  useEffect(() => {
    fetchCart(); // Asegurar que el carrito se vació correctamente
  }, []);

  return (
    <div>
      <h2>¡Compra realizada con éxito! 🎉</h2>
      <p>Gracias por tu compra.</p>
      <Link to="/shop">Volver a la tienda</Link>
    </div>
  );
};

export default PurchaseOkScreen;