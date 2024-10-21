import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import 'react-toastify/dist/ReactToastify.css'; // Import the CSS

import Layout from './components/layout/Layout'
import Home from './pages/Home'
import ProductListAndCart from './pages/Products'
import ProductDetail from './pages/ProductDetail'
import BlogList from './pages/Blog'
import ArticlePage from './pages/BlogPost'
import CartPage from './pages/Cart'
import CheckoutPage from './pages/Checkout'
import Register from './pages/RegisterLogin'
import UserProfile from './pages/Profile'
import Orders from './pages/Orders'
import ErrorPage from './pages/ErrorPage'
import { ToastContainer } from 'react-toastify';

function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path='/register' element={<Register />} />
          <Route path="/" element={<Home />} />
          <Route path="/blog" element={<BlogList />} />
          <Route path="/article" element={<ArticlePage />} />
          <Route path="/product2" element={<ProductListAndCart />} />
          <Route path="/cart" element={<CartPage />} />
          <Route path="/checkout" element={<CheckoutPage />} />
          <Route path="/product/:id" element={<ProductDetail />} />
          <Route path="/profile" element={<UserProfile />} />
          <Route path="/orders" element={<Orders />} />
          <Route path="*" element={<ErrorPage />} />
        </Routes>
        <ToastContainer />
      </Layout>
    </Router>
  )
}

export default App
