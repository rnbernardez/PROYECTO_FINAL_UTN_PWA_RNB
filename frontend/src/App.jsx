function App() {
  const { user } = useAuth();
  return (
    <Routes>
      <Route path="/" element={<HomeScreen />} /> {/* Cambio clave aquí */}
      
      {/* Rutas existentes sin modificar */}
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

      {/* Resto de tus rutas exactamente como están */}
      <Route path="/shop">
        <Route index element={<ShopScreen />} />
        <Route path="product/:id" element={<ProductScreen />} />
        <Route path="add-product" element={<RequireAuth><AddProductScreen /></RequireAuth>} />
      </Route>

      <Route path="/cart">
        <Route index element={<CartScreen />} />
        <Route path="add-card" element={<RequireAuth><AddCardScreen /></RequireAuth>} />
        <Route path="checkout" element={<RequireAuth><CheckoutScreen /></RequireAuth>} />
        <Route path="purchaseok" element={<RequireAuth><PurchaseOkScreen /></RequireAuth>} />
      </Route>

      <Route path="*" element={<NotFoundScreen />} />
    </Routes>
  );
}