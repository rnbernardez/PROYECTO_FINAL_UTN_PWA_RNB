import React, { useState } from 'react';
import { api } from '../../api/api.js';

const AddProductScreen = () => {
  const [product, setProduct] = useState({
    name: '',
    description: '',
    price: '',
    category: '',
    sub_category: '',
    stock: '',
    images: '',
  });

  const handleChange = (e) => {
    setProduct({ ...product, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const token = localStorage.getItem("token"); // Tomamos el token del usuario
      const response = await api.post("/shop/add-product", product, {
        headers: { Authorization: `Bearer ${token}` }, // Enviamos el token en la petición
      });

      console.log("Producto agregado:", response.data);
      alert("Producto agregado con éxito");
    } catch (error) {
      console.error("Error al agregar producto", error);
      alert("Hubo un error al agregar el producto");
    }
  };

  return (
    <div>
      <h1>Agregar Producto</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          placeholder="Nombre"
          value={product.name}
          onChange={handleChange}
        />
        <textarea
          name="description"
          placeholder="Descripción"
          value={product.description}
          onChange={handleChange}
        ></textarea>
        <input
          type="number"
          name="price"
          placeholder="Precio"
          value={product.price}
          onChange={handleChange}
        />
        <input
          type="text"
          name="category"
          placeholder="Categoría"
          value={product.category}
          onChange={handleChange}
        />
        <input
          type="text"
          name="sub_category"
          placeholder="Subcategoría"
          value={product.sub_category}
          onChange={handleChange}
        />
        <input
          type="number"
          name="stock"
          placeholder="Stock"
          value={product.stock}
          onChange={handleChange}
        />
        <input
          type="text"
          name="images"
          placeholder="Imágenes (URL)"
          value={product.images}
          onChange={handleChange}
        />
        <button type="submit">Agregar</button>
      </form>
    </div>
  );
};

export default AddProductScreen;