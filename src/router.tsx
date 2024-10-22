import { Routes, Route } from 'react-router-dom'

import Home from './pages/home'
import Cart from './pages/cart'
import Success from './pages/cart/success'

export default function AppRouter() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/checkout">
        <Route path="" element={<Cart />} />
        <Route path="success" element={<Success />} />
      </Route>
      <Route path="/*" element={<h1>404</h1>} />
    </Routes>
  )
}
