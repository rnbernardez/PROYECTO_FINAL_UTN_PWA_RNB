import React from 'react'
import useProducts from '../hooks/useProducts';

/* const [products, setProducts] = useState([]);

useEffect(() => {
    getProducts().then(data => setProducts(data.products));
}, []); */

const ShopScreen = () => {
  const { products } = useProducts();

  return (
    <div>
      <h1>Tienda</h1>
      <ul>
        {products.map(product => (
          <li key={product._id}>
            <h2>{product.name}</h2>
            <p>{product.description}</p>
            <p>Precio: ${product.price}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ShopScreen;