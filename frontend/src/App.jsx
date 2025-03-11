import React from 'react'
import { Routes, Route } from 'react-router-dom'
import './App.css'
import './styles/global.css'
import './styles/components.css'
import './styles/responsive.css'
import './styles/layout.css'

function App() {
  
  return (
    <div>
        <Routes>
        <Route path='/home' element={<HomeScreen />} />
        <Route path='/login' element={<LoginScreen />} />
        <Route path='/register' element={<RegisterScreen />} />
        <Route path='/successful-login' element={<SuccessfulLoginScreen />} />
        <Route path='/my-user' element={<MyUserScreen />} />
        <Route path='/shop' element={<ShopScreen />} />
        <Route path='/product' element={<ProductScreen />} />
        <Route path='/add-product' element={<AddProductScreen />} />
        <Route path='/chart' element={<ChartScreen />} />
        <Route path='/add-card' element={<AddCardScreen />} />
        <Route path='/checkout' element={<CheckoutScreen />} />
        <Route path='/purchaseok' element={<PurchaseOkScreen />} />
      </Routes>
    </div>
  )
}

export default App
