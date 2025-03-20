import React, { useState } from 'react';
import { api } from '../api/api';

const AddProductScreen = () => {
  const [product, setProduct] = useState({
    name: '',
    description: '',
    price: '',
  });
  
  const handleChange = (e) => {
    setProduct({ ...product, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      const token = localStorage.getItem("token"); // Tomamos el token del usuario
      const response = await api.post("/products", product, {
        headers: { Authorization: `Bearer ${token}` }, // Enviamos el token en la petición
      });

      console.log("Producto agregado:", response.data);
      alert("Producto agregado con éxito");
    } catch (error) {
      console.error("Error al agregar producto", error);
    }
  };

  return (
    <div>
      <h1>Agregar Producto</h1>
      <form onSubmit={handleSubmit}>
        <input type="text" name="name" placeholder="Nombre" onChange={handleChange} />
        <textarea name="description" placeholder="Descripción" onChange={handleChange}></textarea>
        <input type="number" name="price" placeholder="Precio" onChange={handleChange} />
        <button type="submit">Agregar</button>
      </form>
    </div>
  );
};

export default AddProductScreen;