import React, { useState } from 'react';
import { User, Mail, Phone, MapPin, Package, Heart, Settings } from 'lucide-react';

const userProfile = {
  name: "Abdeouahed", // Changed name to Abdeouahed
  email: "abdeouahed@example.com",
  phone: "+1 (555) 123-4567",
  address: "123 Plant St, Green City, 12345",
  profilePicture: "/images/profile.jpg?height=150&width=150",
};

const orderHistory = [
  { id: 1, date: "2023-05-01", total: 59.97, status: "Delivered" },
  { id: 2, date: "2023-04-15", total: 34.99, status: "Shipped" },
  { id: 3, date: "2023-03-30", total: 89.95, status: "Processing" },
];

const wishlist = [
  { id: 1, name: "Fiddle Leaf Fig", price: 39.99 },
  { id: 2, name: "Snake Plant", price: 19.99 },
  { id: 3, name: "Peace Lily", price: 24.99 },
];

export default function UserProfile() {
  const [activeTab, setActiveTab] = useState("profile");

  return (
    <div className="min-h-screen bg-tan py-12"> {/* Updated to use 'bg-tan' */}
      <div className="container mx-auto px-4">
        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          <div className="md:flex">
            <div className="md:w-1/3 bg-dark-green p-8 text-white">
              <div className="text-center mb-8">
                <img src={userProfile.profilePicture} alt={userProfile.name} className="w-32 h-32 rounded-full mx-auto mb-4" />
                <h2 className="text-2xl font-bold">{userProfile.name}</h2>
              </div>
              <nav>
                <button
                  className={`w-full text-left py-2 px-4 rounded ${activeTab === 'profile' ? 'bg-medium-green' : 'hover:bg-medium-green'}`}
                  onClick={() => setActiveTab('profile')}
                >
                  <User size={18} className="inline-block mr-2" /> Profile
                </button>
                <button
                  className={`w-full text-left py-2 px-4 rounded ${activeTab === 'orders' ? 'bg-medium-green' : 'hover:bg-medium-green'}`}
                  onClick={() => setActiveTab('orders')}
                >
                  <Package size={18} className="inline-block mr-2" /> Order History
                </button>
                <button
                  className={`w-full text-left py-2 px-4 rounded ${activeTab === 'wishlist' ? 'bg-medium-green' : 'hover:bg-medium-green'}`}
                  onClick={() => setActiveTab('wishlist')}
                >
                  <Heart size={18} className="inline-block mr-2" /> Wishlist
                </button>
                <button
                  className={`w-full text-left py-2 px-4 rounded ${activeTab === 'settings' ? 'bg-medium-green' : 'hover:bg-medium-green'}`}
                  onClick={() => setActiveTab('settings')}
                >
                  <Settings size={18} className="inline-block mr-2" /> Settings
                </button>
              </nav>
            </div>
            <div className="md:w-2/3 p-8">
              {activeTab === 'profile' && (
                <div>
                  <h3 className="text-2xl font-bold text-dark-green mb-4">Profile Information</h3>
                  <div className="space-y-4">
                    <p className="flex items-center text-dark-brown">
                      <Mail size={18} className="mr-2" /> {userProfile.email}
                    </p>
                    <p className="flex items-center text-dark-brown">
                      <Phone size={18} className="mr-2" /> {userProfile.phone}
                    </p>
                    <p className="flex items-center text-dark-brown">
                      <MapPin size={18} className="mr-2" /> {userProfile.address}
                    </p>
                  </div>
                </div>
              )}
              {activeTab === 'orders' && (
                <div>
                  <h3 className="text-2xl font-bold text-dark-green mb-4">Order History</h3>
                  <table className="w-full">
                    <thead>
                      <tr className="bg-light-green text-dark-brown">
                        <th className="py-2 px-4 text-left">Order ID</th>
                        <th className="py-2 px-4 text-left">Date</th>
                        <th className="py-2 px-4 text-left">Total</th>
                        <th className="py-2 px-4 text-left">Status</th>
                      </tr>
                    </thead>
                    <tbody>
                      {orderHistory.map(order => (
                        <tr key={order.id} className="border-b border-light-green">
                          <td className="py-2 px-4">{order.id}</td>
                          <td className="py-2 px-4">{order.date}</td>
                          <td className="py-2 px-4">${order.total.toFixed(2)}</td>
                          <td className="py-2 px-4">{order.status}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
              {activeTab === 'wishlist' && (
                <div>
                  <h3 className="text-2xl font-bold text-dark-green mb-4">Wishlist</h3>
                  <ul className="space-y-4">
                    {wishlist.map(item => (
                      <li key={item.id} className="flex justify-between items-center border-b border-light-green pb-2">
                        <span className="text-dark-brown">{item.name}</span>
                        <span className="text-dark-green font-bold">${item.price.toFixed(2)}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
              {activeTab === 'settings' && (
                <div>
                  <h3 className="text-2xl font-bold text-dark-green mb-4">Account Settings</h3>
                  <p className="text-dark-brown mb-4">Here you can update your account settings, change your password, and manage your notification preferences.</p>
                  <button className="bg-medium-green text-white px-4 py-2 rounded hover:bg-dark-green transition-colors">
                    Edit Profile
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
