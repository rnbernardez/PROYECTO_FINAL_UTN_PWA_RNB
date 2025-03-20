import React, { useEffect, useState, useContext } from 'react';
import { useParams } from 'react-router-dom';
import { api } from '../api/api';
import { CartContext } from '../context/CartContext'; // Importamos el contexto del carrito

const ProductScreen = () => {
  const { id } = useParams(); // Capturamos el ID del producto desde la URL
  const [product, setProduct] = useState(null);
  const { fetchCart } = useContext(CartContext); // Accedemos a la función para actualizar el carrito

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await api.get(`/products/${id}`); // Llamada a la API
        setProduct(response.data.product);
      } catch (error) {
        console.error("Error al obtener el producto", error);
      }
    };

    fetchProduct();
  }, [id]);

  const addToCart = async () => {
    try {
      const token = localStorage.getItem("token"); // Obtenemos el token del usuario autenticado
      await api.post("/cart/add", { productId: product._id, quantity: 1 }, {
        headers: { Authorization: `Bearer ${token}` },
      });
      fetchCart(); // Actualizamos el carrito en el contexto
      alert("Producto agregado al carrito");
    } catch (error) {
      console.error("Error al agregar al carrito", error);
    }
  };

  if (!product) return <p>Cargando...</p>;

  return (
    <div>
      <h1>{product.name}</h1>
      <p>{product.description}</p>
      <p>Precio: {product.price} USD</p>
      <button onClick={addToCart}>Añadir al Carrito</button>
    </div>
  );
};

export default ProductScreen;