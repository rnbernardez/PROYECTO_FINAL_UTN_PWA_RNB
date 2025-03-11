import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import HomeScreen from './screens/HomeScreen';
import NotFoundScreen from './screens/NotFoundScreen'; 
import { LoginScreen, RegisterScreen, ProfileScreen, SuccessfulLoginScreen } from './screens/user';
import { ShopScreen, ProductScreen, AddProductScreen } from './screens/shop'; 
import { CartScreen, AddCardScreen, CheckoutScreen, PurchaseOkScreen } from './screens/cart';

function App() {
  return (
    <Routes>
      {/* Redirección de "/" a "/home" */}
      <Route path="/" element={<Navigate to="/home" />} />
      <Route path="/home" element={<HomeScreen />} />

      {/* Rutas de Usuario */}
      <Route path="/user">
        <Route path="login" element={<LoginScreen />} />
        <Route path="register" element={<RegisterScreen />} />
        <Route path="profile" element={<ProfileScreen />} />
        <Route path="successful-login" element={<SuccessfulLoginScreen />} />
      </Route>

      {/* Rutas de Tienda */}
      <Route path="/shop">
        <Route index element={<ShopScreen />} /> {/* /shop */}
        <Route path="product/:id" element={<ProductScreen />} /> {/* /shop/product/:id */}
        <Route path="add-product" element={<AddProductScreen />} /> {/* /shop/add-product */}
      </Route>

      {/* Rutas de Carrito y Compras */}
      <Route path="/cart">
        <Route index element={<CartScreen />} /> {/* /cart */}
        <Route path="add-card" element={<AddCardScreen />} /> {/* /cart/add-card */}
        <Route path="checkout" element={<CheckoutScreen />} /> {/* /cart/checkout */}
        <Route path="purchaseok" element={<PurchaseOkScreen />} /> {/* /cart/purchaseok */}
      </Route>

      {/* Página 404 */}
      <Route path="*" element={<NotFoundScreen />} />
    </Routes>
  );
}

export default App;