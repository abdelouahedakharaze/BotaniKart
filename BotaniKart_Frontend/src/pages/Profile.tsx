import React, { useState } from 'react'
import { Link } from 'react-router-dom'

interface UserProfile {
  name: string
  email: string
  address: string
  phone: string
}

const ProfilePage: React.FC = () => {
  const [profile, setProfile] = useState<UserProfile>({
    name: 'John Doe',
    email: 'john.doe@example.com',
    address: '123 Plant St, Green City, 12345',
    phone: '(123) 456-7890'
  })

  const [isEditing, setIsEditing] = useState(false)
  const [editedProfile, setEditedProfile] = useState<UserProfile>(profile)

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setEditedProfile(prev => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setProfile(editedProfile)
    setIsEditing(false)
  }

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <header className="bg-white shadow-md">
        <div className="container mx-auto px-4 py-6 flex justify-between items-center">
          <Link to="/" className="text-2xl font-bold text-green-600">Botanikart</Link>
          <nav>
            <ul className="flex space-x-4">
              <li><Link to="/products" className="text-gray-600 hover:text-green-600">Products</Link></li>
              <li><Link to="/blog" className="text-gray-600 hover:text-green-600">Blog</Link></li>
              <li><Link to="/cart" className="text-gray-600 hover:text-green-600">Cart</Link></li>
              <li><Link to="/profile" className="text-gray-600 hover:text-green-600">Profile</Link></li>
            </ul>
          </nav>
        </div>
      </header>

      {/* Profile Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto bg-white rounded-lg shadow-md overflow-hidden">
            <div className="p-6">
              <h1 className="text-3xl font-bold mb-6">Your Profile</h1>
              {isEditing ? (
                <form onSubmit={handleSubmit}>
                  <div className="mb-4">
                    <label htmlFor="name" className="block text-gray-700 font-bold mb-2">Name</label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={editedProfile.name}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-green-500"
                      required
                    />
                  </div>
                  <div className="mb-4">
                    <label htmlFor="email" className="block text-gray-700 font-bold mb-2">Email</label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={editedProfile.email}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-green-500"
                      required
                    />
                  </div>
                  <div className="mb-4">
                    <label htmlFor="address" className="block text-gray-700 font-bold mb-2">Address</label>
                    <input
                      type="text"
                      id="address"
                      name="address"
                      value={editedProfile.address}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-green-500"
                      required
                    />
                  </div>
                  <div className="mb-6">
                    <label htmlFor="phone" className="block text-gray-700 font-bold mb-2">Phone</label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={editedProfile.phone}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-green-500"
                      required
                    />
                  </div>
                  <div className="flex justify-end">
                    <button
                      type="button"
                      onClick={() => setIsEditing(false)}
                      className="bg-gray-300 text-gray-700 py-2 px-4 rounded-lg hover:bg-gray-400 transition duration-300 mr-4"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="bg-green-600 text-white py-2 px-4 rounded-lg hover:bg-green-700 transition duration-300"
                    >
                      Save Changes
                    </button>
                  </div>
                </form>
              ) : (
                <div>
                  <div className="mb-4">
                    <h2 className="text-xl font-semibold mb-2">Name</h2>
                    <p>{profile.name}</p>
                  </div>
                  <div className="mb-4">
                    <h2 className="text-xl font-semibold mb-2">Email</h2>
                    <p>{profile.email}</p>
                  </div>
                  <div className="mb-4">
                    <h2 className="text-xl font-semibold mb-2">Address</h2>
                    <p>{profile.address}</p>
                  </div>
                  <div className="mb-6">
                    <h2 className="text-xl font-semibold mb-2">Phone</h2>
                    <p>{profile.phone}</p>
                  </div>
                  <div className="flex justify-end">
                    <button
                      onClick={() => setIsEditing(true)}
                      className="bg-green-600 text-white py-2 px-4 rounded-lg hover:bg-green-700 transition duration-300"
                    >
                      Edit Profile
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-8">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap justify-between">
            <div className="w-full md:w-1/3 mb-6 md:mb-0">
              <h3 className="text-xl font-semibold mb-4">Botanikart</h3>
              <p>Your one-stop shop for all things plants.</p>
            </div>
            <div className="w-full md:w-1/3 mb-6 md:mb-0">
              <h3 className="text-xl font-semibold mb-4">Quick Links</h3>
              <ul>
                <li><Link to="/products" className="hover:text-green-400">Products</Link></li>
                <li><Link to="/blog" className="hover:text-green-400">Blog</Link></li>
                <li><Link to="/about" className="hover:text-green-400">About</Link></li>
                <li><Link to="/contact" className="hover:text-green-400">Contact</Link></li>
              </ul>
            </div>
            <div className="w-full md:w-1/3">
              <h3 className="text-xl font-semibold mb-4">Newsletter</h3>
              <form className="flex">
                <input type="email" placeholder="Your email" className="flex-grow px-4 py-2 rounded-l-full" />
                <button type="submit" className="bg-green-600 text-white px-4 py-2 rounded-r-full hover:bg-green-700 transition duration-300">
                  Subscribe
                </button>
              </form>
            </div>
          </div>
          <div className="mt-8 text-center">
            <p>&copy; 2023 Botanikart. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default ProfilePage