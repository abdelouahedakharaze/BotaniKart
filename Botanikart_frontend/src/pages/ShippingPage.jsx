import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import CheckoutSteps from '../components/CheckoutSteps'
import { useNavigate } from 'react-router-dom'
import { saveShippingAddress } from '../actions/cartActions'

const ShippingPage = () => {
  const cart = useSelector(state => state.cart)
  const { shippingAddress } = cart
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const [address, setAddress] = useState(shippingAddress.address || '')
  const [city, setCity] = useState(shippingAddress.city || '')
  const [postalCode, setPostalCode] = useState(shippingAddress.postalCode || '')
  const [country, setCountry] = useState(shippingAddress.country || '')

  const submitHandler = (e) => {
    e.preventDefault()
    dispatch(saveShippingAddress({ address, city, postalCode, country }))
    navigate('/payment')
  }

  return (
    <div className="max-w-3xl mx-auto p-6 bg-soil-50 min-h-Page">
      <CheckoutSteps step1 step2 />
      <h1 className="text-2xl font-bold text-soil-900 mb-6">Shipping</h1>
      
      <form onSubmit={submitHandler} className="space-y-4 bg-white p-6 rounded-lg shadow-sm border border-soil-100">
        <div className="mb-4">
          <label className="block text-sm font-medium text-soil-700 mb-2">Address</label>
          <input
            type="text"
            required
            className="w-full px-3 py-2 border border-soil-300 rounded-md focus:ring-plant-500 focus:border-plant-500"
            placeholder="Enter address"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium text-soil-700 mb-2">City</label>
          <input
            type="text"
            required
            className="w-full px-3 py-2 border border-soil-300 rounded-md focus:ring-plant-500 focus:border-plant-500"
            placeholder="Enter city"
            value={city}
            onChange={(e) => setCity(e.target.value)}
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium text-soil-700 mb-2">Postal Code</label>
          <input
            type="text"
            required
            className="w-full px-3 py-2 border border-soil-300 rounded-md focus:ring-plant-500 focus:border-plant-500"
            placeholder="Enter postal code"
            value={postalCode}
            onChange={(e) => setPostalCode(e.target.value)}
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium text-soil-700 mb-2">Country</label>
          <input
            type="text"
            required
            className="w-full px-3 py-2 border border-soil-300 rounded-md focus:ring-plant-500 focus:border-plant-500"
            placeholder="Enter country"
            value={country}
            onChange={(e) => setCountry(e.target.value)}
          />
        </div>

        <button
          type="submit"
          className="w-full py-2 px-4 bg-dark-green text-gray rounded-md hover:bg-medium-green transition-colors"
        >
          Continue
        </button>
      </form>
    </div>
  )
}

export default ShippingPage
