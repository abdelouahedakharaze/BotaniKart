import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import 'react-toastify/dist/ReactToastify.css'; // Import the CSS

// import { AuthProvider } from './contexts/AuthContext'
// import { CartProvider } from './contexts/CartContext'
// import { ThemeProvider } from './contexts/ThemeContext'
import Layout from './components/layout/Layout'
import AuthPage from './components/testableComponents/Component1'
import Home from './pages/Home'
import ProductListAndCart from './pages/Products'
import ProductDetail from './pages/ProductDetail'
import BlogList from './pages/Blog'
import ArticlePage from './pages/BlogPost'
import CartPage from './pages/Cart'
import CheckoutPage from './pages/Checkout'
// import Login from './pages/Login'
import Register from './pages/RegisterLogin'
import UserProfile from './pages/Profile'
import Orders from './pages/Orders'
// import Wishlist from './pages/Wishlist'
// import LoyaltyProgram from './pages/LoyaltyProgram'
import ErrorPage from './pages/ErrorPage'
// import ArticlePage from './components/testableComponents/Component3'
import ProductListWithCart from './components/testableComponents/Component4'
// import ProductListAndCart from './components/testableComponents/Component5'
import PaymentPage from './components/testableComponents/Component6'
// import CartPage from './components/testableComponents/Component7'
import PaymentPage2 from './components/testableComponents/Component8'
// import HomePage from './components/testableComponents/Component9'
// import ProductDetail from './components/testableComponents/Component10'
// import BlogList from './components/testableComponents/Component11'
// import UserProfile from './components/testableComponents/Component12'
import HomePageExtra from './components/testableComponents/Component13'
import Component from './components/testableComponents/Component14'
import ComponentShowcase from './components/testableComponents/Component15'



import { ToastContainer } from 'react-toastify';
function App() {
  return (
    
    <Router>

      {/* <ThemeProvider>
        <AuthProvider>
          <CartProvider> */}
            <Layout>
             
              <Routes>
                <Route path='/register' element={<Register />} />
                <Route path="/" element={<Home />} />
                <Route path="/blog" element={<BlogList />} />
                <Route path="/article" element={<ArticlePage />} />
                <Route path="/product2" element={<ProductListAndCart />} />
                <Route path="/cart" element={<CartPage />} />
                <Route path="/payment" element={<PaymentPage2 />} />
                <Route path="/checkout" element={<CheckoutPage />} />
                <Route path="/product/:id" element={<ProductDetail />} />






          
             
                
                
                
                {/* <Route path="/home" element={<HomePage />} /> */}
                {/* <Route path="/blog2" element={<BlogList />} /> */}
                <Route path="/profile" element={<UserProfile />} />
                
                <Route path="/auth" element={<AuthPage />} />
                
                {/* <Route path="/products" element={<Products />} /> */}
                {/* <Route path="/product/:id" element={<ProductDetail />} /> */}
                
                {/* <Route path="/blog/:id" element={<BlogPost />} /> */}
                {/* <Route path="/cart" element={<Cart />} /> */}
                {/* <Route path="/checkout" element={<Checkout />} /> */}
                {/* <Route path="/login" element={<Login />} /> */}
                {/* <Route path="/register" element={<Register />} /> */}
                {/* <Route path="/profile" element={<Profile />} /> */}
                <Route path="/orders" element={<Orders />} />
                {/* <Route path="/wishlist" element={<Wishlist />} /> */}
                {/* <Route path="/loyalty" element={<LoyaltyProgram />} /> */}
                <Route path="*" element={<ErrorPage />} />
              </Routes>
              <ToastContainer />
            </Layout>
          {/* </CartProvider>
        </AuthProvider>
      </ThemeProvider> */}
    </Router>
  )
}

export default App