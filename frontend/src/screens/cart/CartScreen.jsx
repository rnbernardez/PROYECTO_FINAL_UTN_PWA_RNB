import React, { useEffect, useState, useContext } from "react";
import { api } from "../api/api";
import { CartContext } from "../context/CartContext.jsx";

const CartScreen = () => {
  const { cart, fetchCart } = useContext(CartContext);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchCart(); // Cargar carrito al abrir la pantalla
  }, []);

  const updateQuantity = async (productId, newQuantity) => {
    if (newQuantity < 1) return; // Evitar cantidades negativas

    try {
      setLoading(true);
      const token = localStorage.getItem("token");
      await api.put(
        "/cart/update",
        { productId, quantity: newQuantity },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      fetchCart(); // Actualizar carrito después del cambio
    } catch (error) {
      console.error("Error al actualizar cantidad", error);
    } finally {
      setLoading(false);
    }
  };

  const removeFromCart = async (productId) => {
    try {
      setLoading(true);
      const token = localStorage.getItem("token");
      await api.delete(`/cart/remove-product/${productId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      fetchCart(); // Actualizar carrito después de eliminar un producto
    } catch (error) {
      console.error("Error al eliminar producto", error);
    } finally {
      setLoading(false);
    }
  };

  const clearCart = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem("token");
      await api.delete("/cart/clear", {
        headers: { Authorization: `Bearer ${token}` },
      });
      fetchCart(); // Actualizar carrito después de vaciarlo
    } catch (error) {
      console.error("Error al vaciar el carrito", error);
    } finally {
      setLoading(false);
    }
  };

  const addToCart = async (productId) => {
    try {
      setLoading(true);
      const token = localStorage.getItem("token");
      await api.post(
        "/cart/add-product",
        { productId, quantity: 1 },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      fetchCart(); // Actualizar carrito después de agregar un producto
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
        <button onClick={() => addToCart("some-product-id")}>
          ➕ Agregar Producto
        </button>
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

          <button onClick={() => updateQuantity(item.product._id, item.quantity + 1)}>
            ➕
          </button>
          <button onClick={() => updateQuantity(item.product._id, item.quantity - 1)}>
            ➖
          </button>

          <button onClick={() => removeFromCart(item.product._id)}>❌ Eliminar</button>
        </div>
      ))}
      <button onClick={clearCart}>🗑 Vaciar Carrito</button>
      {loading && <p>Actualizando...</p>}
    </div>
  );
};

export default CartScreen;