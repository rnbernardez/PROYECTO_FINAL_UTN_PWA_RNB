import { Routes, Route } from 'react-router-dom';
import useAuth from './hooks/useAuth.js';
import HomeScreen from './screens/HomeScreen.jsx';
import VerifyAccountScreen from './screens/user/VerifyAccountScreen.jsx';
import LoginScreen from './screens/user/LoginScreen.jsx';
import RegisterScreen from './screens/user/RegisterScreen.jsx';
import ProfileScreen from './screens/user/ProfileScreen.jsx';
import SuccessfulLoginScreen from './screens/user/SuccessfulLoginScreen.jsx';
import ShopScreen from './screens/shop/ShopScreen.jsx';
import ProductScreen from './screens/shop/ProductScreen.jsx';
import AddProductScreen from './screens/shop/AddProductScreen.jsx';
import CartScreen from './screens/cart/CartScreen.jsx';
import AddCardScreen from './screens/cart/AddCardScreen.jsx';
import CheckoutScreen from './screens/cart/CheckoutScreen.jsx';
import PurchaseOkScreen from './screens/cart/PurchaseOkScreen.jsx';
import NotFoundScreen from './screens/NotFoundScreen.jsx';
import ProtectedRoute from './components/auth/ProtectedRoute.jsx';
import RequireAuth from './components/auth/RequireAuth.jsx';

function App() {
  const { user } = useAuth();
  return (
    <Routes>
      <Route path="/" element={<HomeScreen />} /> 
      <Route path="/home" element={<HomeScreen />} />
      <Route path="/verify/:token" element={<VerifyAccountScreen />} />
      
      <Route path="/user">
        <Route path="login" element={<LoginScreen />} />
        <Route path="register" element={<RegisterScreen />} />
        <Route path="verify/:token" element={<VerifyAccountScreen />} />
        <Route element={<ProtectedRoute />}> 
          <Route path="profile" element={<ProfileScreen />} />
          <Route path="successful-login" element={<SuccessfulLoginScreen />} />
        </Route>
      </Route>

      <Route path="/shop">
        <Route index element={<ShopScreen />} />
        <Route path="product/:id" element={<ProductScreen />} />
        <Route path="add-product" element={<RequireAuth><AddProductScreen /></RequireAuth>} />
      </Route>

      <Route element={<ProtectedRoute />}>
      <Route path="/cart" element={<RequireAuth><CartScreen /></RequireAuth>}>
        <Route index element={<CartScreen />} />
        <Route path="add-card" element={<RequireAuth><AddCardScreen /></RequireAuth>} />
        <Route path="checkout" element={<RequireAuth><CheckoutScreen /></RequireAuth>} />
        <Route path="purchaseok" element={<RequireAuth><PurchaseOkScreen /></RequireAuth>} />
        </Route>
      </Route>

      <Route path="*" element={<NotFoundScreen />} />
    </Routes>
  );
}

export default App;