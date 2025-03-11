import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <div>
        <a href="https://vite.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.jsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Hola Capo!
      </p>
    </>
  )
}

export default App

/*
import React from "react"
import { Routes, Route } from "react-router-dom"

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
*/