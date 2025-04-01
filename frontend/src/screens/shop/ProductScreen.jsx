import React, { useEffect, useState, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import api from '../../api/api.js';
import { CartContext } from '@/context/cartContext.jsx';

const ProductScreen = () => {
  const { id } = useParams(); 
  const [product, setProduct] = useState(null);
  const [error, setError] = useState(null);
  const { fetchCart } = useContext(CartContext); 
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await api.get(`/shop/product/${id}`, {
          headers: { Authorization: `Bearer ${token}` },
        }); 
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
      fetchCart(); 
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
        navigate("/shop"); 
        alert("Producto eliminado exitosamente");
    } catch (error) {
        setError("Error al eliminar el producto");
        console.error("Error al eliminar el producto", error);
    }
};

  if (!product) return <p>Cargando...</p>;

  const isProductOwner = product.createdBy === token; 

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
