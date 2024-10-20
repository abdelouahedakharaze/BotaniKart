import React, { useState } from 'react';
import { toast } from 'react-toastify'; // Import toast
import { Link } from 'react-router-dom';

const LoginRegisterPage: React.FC = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [loginData, setLoginData] = useState({ email: '', password: '' });
  const [registerData, setRegisterData] = useState({ name: '', email: '', password: '', confirmPassword: '' });

  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Login submitted:', loginData);
    
    // Here you would typically send the login data to your backend
    // Simulating a successful login for demonstration
    toast.success('Login successful!'); // Toast message for successful login
  };

  const handleRegisterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Register submitted:', registerData);
    
    // Here you would typically send the registration data to your backend
    // Simulating a successful registration for demonstration
    toast.success('Registration successful!'); // Toast message for successful registration
  };

  const handleLoginInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setLoginData(prev => ({ ...prev, [name]: value }));
  };

  const handleRegisterInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setRegisterData(prev => ({ ...prev, [name]: value }));
  };

  return (
    <div className="min-h-screen bg-tan">
      <div className="max-w-md mx-auto bg-white rounded-lg shadow-md overflow-hidden mt-10">
        <div className="flex">
          <button
            className={`flex-1 py-4 text-center font-semibold ${isLogin ? 'bg-white text-medium-green' : 'bg-gray-200 text-dark-brown'}`}
            onClick={() => setIsLogin(true)}
          >
            Login
          </button>
          <button
            className={`flex-1 py-4 text-center font-semibold ${!isLogin ? 'bg-white text-medium-green' : 'bg-gray-200 text-dark-brown'}`}
            onClick={() => setIsLogin(false)}
          >
            Register
          </button>
        </div>
        <div className="p-6">
          {isLogin ? (
            <form onSubmit={handleLoginSubmit}>
              <div className="mb-4">
                <label htmlFor="login-email" className="block text-dark-brown font-bold mb-2">Email</label>
                <input
                  type="email"
                  id="login-email"
                  name="email"
                  value={loginData.email}
                  onChange={handleLoginInputChange}
                  className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-medium-green"
                  required
                />
              </div>
              <div className="mb-6">
                <label htmlFor="login-password" className="block text-dark-brown font-bold mb-2">Password</label>
                <input
                  type="password"
                  id="login-password"
                  name="password"
                  value={loginData.password}
                  onChange={handleLoginInputChange}
                  className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-medium-green"
                  required
                />
              </div>
              <button
                type="submit"
                className="w-full bg-medium-green text-white py-2 px-4 rounded-lg hover:bg-dark-green transition duration-300"
              >
                Login
              </button>
            </form>
          ) : (
            <form onSubmit={handleRegisterSubmit}>
              <div className="mb-4">
                <label htmlFor="register-name" className="block text-dark-brown font-bold mb-2">Name</label>
                <input
                  type="text"
                  id="register-name"
                  name="name"
                  value={registerData.name}
                  onChange={handleRegisterInputChange}
                  className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-medium-green"
                  required
                />
              </div>
              <div className="mb-4">
                <label htmlFor="register-email" className="block text-dark-brown font-bold mb-2">Email</label>
                <input
                  type="email"
                  id="register-email"
                  name="email"
                  value={registerData.email}
                  onChange={handleRegisterInputChange}
                  className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-medium-green"
                  required
                />
              </div>
              <div className="mb-4">
                <label htmlFor="register-password" className="block text-dark-brown font-bold mb-2">Password</label>
                <input
                  type="password"
                  id="register-password"
                  name="password"
                  value={registerData.password}
                  onChange={handleRegisterInputChange}
                  className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-medium-green"
                  required
                />
              </div>
              <div className="mb-6">
                <label htmlFor="register-confirm-password" className="block text-dark-brown font-bold mb-2">Confirm Password</label>
                <input
                  type="password"
                  id="register-confirm-password"
                  name="confirmPassword"
                  value={registerData.confirmPassword}
                  onChange={handleRegisterInputChange}
                  className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-medium-green"
                  required
                />
              </div>
              <button
                type="submit"
                className="w-full bg-medium-green text-white py-2 px-4 rounded-lg hover:bg-dark-green transition duration-300"
              >
                Register
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export default LoginRegisterPage;
