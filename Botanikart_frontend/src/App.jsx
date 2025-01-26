import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './store';

// Component imports
import Header from './components/Header';
import Footer from './components/Footer';

// Page imports
import HomePage from './pages/HomePage';
import ProductListPage from './pages/ProductListPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import ProfilePage from './pages/ProfilePage';
import ShippingPage from './pages/ShippingPage';
import CartPage from './pages/Cart';
import PlaceorderPage from './pages/PlaceorderPage';
import OrderListPage from './pages/OrderListPage';
import UserListPage from './pages/UserListPage';
import UserEditPage from './pages/UserEditPage';
import ProductPage from './pages/ProductPage';
import PaymentPage from './pages/PaymentPage';
import OrderPage from './pages/OrderPage';
import BlogPage from './pages/BlogPage';
import PostPage from './pages/PostPage';

const App = () => {
  return (
    <Provider store={store}>
      <Router>
        <Header />
        
        <Routes>
          {/* Public Routes */}
          <Route path="/blog/" element={<BlogPage />} />
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/products" element={<ProductListPage />} />
          <Route path="/order/:orderId" element={<OrderPage />} /> {/* Corrected this line */}

          {/* User Routes */}
          <Route path="/post/:id" element={<PostPage />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/cart/:id" element={<CartPage />} />
          <Route path="/cart" element={<CartPage />} />
          <Route path="/shipping" element={<ShippingPage />} />
          <Route path="/placeorder" element={<PlaceorderPage />} />
          <Route path="/product/:id" element={<ProductPage />} />
          <Route path="/payment" element={<PaymentPage />} />

          {/* Order History */}
          <Route path="/orders" element={<OrderListPage />} />

          {/* Admin Routes */}
          <Route path="/admin/userlist" element={<UserListPage />} />
          <Route path="/admin/user/:id/edit" element={<UserEditPage />} />
          
          {/* Fallback Route */}
          <Route path="*" element={<HomePage />} />
        </Routes>

        <Footer />
      </Router>
    </Provider>
  );
};

export default App;
