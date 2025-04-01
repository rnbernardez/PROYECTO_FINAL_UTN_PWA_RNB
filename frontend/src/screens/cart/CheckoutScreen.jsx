import React, { useContext, useState } from "react";
import api from "../../api/api.js";
import { CartContext } from "@/context/cartContext.jsx";
import { useNavigate } from "react-router-dom";

const CheckoutScreen = () => {
  const { cart, fetchCart } = useContext(CartContext);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleCheckout = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem("token");
  
      const response = await api.post("/cart/checkout", {}, {
        headers: { Authorization: `Bearer ${token}` },
      });
  
      if (response.data.ok) {
        try {
          await api.delete("/cart/clear", {
            headers: { Authorization: `Bearer ${token}` },
          });
  
          fetchCart(); 
  
          alert(response.data.message);
          navigate("/cart/purchaseok"); 
        } catch (clearError) {
          console.error("Error al vaciar el carrito", clearError);
          alert("Hubo un problema al vaciar el carrito");
        }
      } else {
        alert("Hubo un problema con la compra");
      }
    } catch (error) {
      console.error("Error en el checkout", error);
      alert("Hubo un problema con la compra");
    } finally {
      setLoading(false);
    }
  };

  if (!cart || cart.products.length === 0) {
    return <p>El carrito está vacío. Agrega productos antes de finalizar la compra.</p>;
  }

  const total = cart.products.reduce((acc, item) => acc + item.product.price * item.quantity, 0);

  return (
    <div>
      <h2>Resumen del Pedido</h2>
      {cart.products.map((item) => (
        <div key={item.product._id}>
          <h3>{item.product.name}</h3>
          <p>Precio: {item.product.price} USD</p>
          <p>Cantidad: {item.quantity}</p>
          <p>Subtotal: {item.product.price * item.quantity} USD</p>
        </div>
      ))}
      <h3>Total: $ {total} </h3>

      <button onClick={handleCheckout} disabled={loading}>
        {loading ? "Procesando..." : "Finalizar Compra"}
      </button>
    </div>
  );
};

export default CheckoutScreen;