import React, { useEffect, useState, useContext } from "react";
import api from "../../api/api.js";
import { CartContext } from "../../context/cartContext.jsx";

const CartScreen = () => {
  const { cart, fetchCart } = useContext(CartContext);
  const [loading, setLoading] = useState(false);
  const token = localStorage.getItem("token");

  useEffect(() => {
    if (token) {
      fetchCart(); // Solo llama a la API si el usuario está autenticado
    } else {
      console.warn("No hay usuario autenticado. Redirigiendo al login...");
      window.location.href = "/user/login"; // Redirige al login si no hay token
    }
  }, [token]);

  const updateQuantity = async (productId, newQuantity) => {
    if (newQuantity < 1) return;

    try {
      setLoading(true);
      await api.put("/cart/update", { productId, quantity: newQuantity });
      fetchCart();
    } catch (error) {
      console.error("Error al actualizar cantidad", error);
    } finally {
      setLoading(false);
    }
  };

  const removeFromCart = async (productId) => {
    try {
      setLoading(true);
      await api.delete(`/cart/remove-product/${productId}`);
      fetchCart();
    } catch (error) {
      console.error("Error al eliminar producto", error);
    } finally {
      setLoading(false);
    }
  };

  const clearCart = async () => {
    try {
      setLoading(true);
      await api.delete("/cart/clear");
      fetchCart();
    } catch (error) {
      console.error("Error al vaciar el carrito", error);
    } finally {
      setLoading(false);
    }
  };

  const addToCart = async (productId) => {
    try {
      setLoading(true);
      await api.post("/cart/add-product", { productId, quantity: 1 });
      fetchCart();
    } catch (error) {
      console.error("Error al agregar producto al carrito", error);
    } finally {
      setLoading(false);
    }
  };

  if (!cart || cart.products.length === 0)
    return (
      <div>
        <p>El carrito está vacío</p>
        <button onClick={() => addToCart("some-product-id")}>➕ Agregar Producto</button>
      </div>
    );

  return (
    <div>
      <h2>Carrito de Compras</h2>
      {cart.products.map((item) => (
        <div key={item.product._id}>
          <h3>{item.product.name}</h3>
          <p>Precio: {item.product.price} USD</p>
          <p>Cantidad: {item.quantity}</p>

          <button onClick={() => updateQuantity(item.product._id, item.quantity + 1)}>➕</button>
          <button onClick={() => updateQuantity(item.product._id, item.quantity - 1)}>➖</button>

          <button onClick={() => removeFromCart(item.product._id)}>❌ Eliminar</button>
        </div>
      ))}
      <button onClick={clearCart}>🗑 Vaciar Carrito</button>
      {loading && <p>Actualizando...</p>}
    </div>
  );
};

export default CartScreen;