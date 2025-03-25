import React, { useEffect, useState, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { api } from '../../api/api.js';
import { CartContext } from '@/context/cartContext.jsx'; // Importamos el contexto del carrito

const ProductScreen = () => {
  const { id } = useParams(); // Capturamos el ID del producto desde la URL
  const [product, setProduct] = useState(null);
  const [error, setError] = useState(null);
  const { fetchCart } = useContext(CartContext); // Accedemos a la función para actualizar el carrito
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await api.get(`/shop/product/${id}`, {
          headers: { Authorization: `Bearer ${token}` },
        }); // Llamada a la API
        setProduct(response.data.product);
      } catch (error) {
        setError("Error al obtener el producto");
        console.error("Error al obtener el producto", error);
      }
    };

    fetchProduct();
  }, [id, token]);

  const addToCart = async () => {
    try {
      await api.post("/cart/cart/add-product", { productId: product._id, quantity: 1 }, {
        headers: { Authorization: `Bearer ${token}` },
      });
      fetchCart(); // Actualizamos el carrito en el contexto
      alert("Producto agregado al carrito");
    } catch (error) {
      console.error("Error al agregar al carrito", error);
    }
  };

  const deleteProduct = async () => {
    try {
        await api.delete(`/shop/products/${product._id}`, {
            headers: { Authorization: `Bearer ${token}` },
        });
        navigate("/shop"); // Redirigir al usuario a la tienda después de eliminar el producto
        alert("Producto eliminado exitosamente");
    } catch (error) {
        setError("Error al eliminar el producto");
        console.error("Error al eliminar el producto", error);
    }
};

  if (!product) return <p>Cargando...</p>;

  // Verificamos si el producto fue creado por el usuario autenticado
  const isProductOwner = product.createdBy === token; // O usar el userId del token

  return (
    <div>
      <h1>{product.name}</h1>
      <p>{product.description}</p>
      <p>Precio: {product.price} USD</p>
      <button onClick={addToCart}>Añadir al Carrito</button>

      {isProductOwner && (
        <div>
          <button onClick={deleteProduct} style={{ backgroundColor: 'red', color: 'white' }}>
            Eliminar Producto
          </button>
        </div>
      )}

      {error && <p style={{ color: 'red' }}>{error}</p>}
    </div>
  );
};

export default ProductScreen;
