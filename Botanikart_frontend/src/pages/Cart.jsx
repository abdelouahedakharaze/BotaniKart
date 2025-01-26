import React, { useEffect } from 'react'
import { Link, useLocation, useNavigate, useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { addToCart, removeFromCart } from '../actions/cartActions'
import Message from '../components/Message'

const CartPage = () => {
  const { id } = useParams()
  const location = useLocation()
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const productId = id
  const qty = location.search ? Number(location.search.split('=')[1]) : 1

  const cart = useSelector(state => state.cart)
  const { cartItems } = cart

  useEffect(() => {
    if (productId) {
      dispatch(addToCart(productId, qty))
    }
  }, [dispatch, productId, qty])

  const removeFromCartHandler = (id) => {
    dispatch(removeFromCart(id))
  }

  const checkoutHandler = () => {
    navigate('/login?redirect=/shipping')
  }

  return (
    <div className="min-h-screen bg-plant-50 p-6">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row gap-8">
        {/* Cart Items Column */}
        <div className="md:w-2/3">
          <h1 className="text-3xl font-bold mb-6 text-soil-900 font-serif">Gardening Cart</h1>

          {cartItems.length === 0 ? (
            <Message variant='info' className="bg-plant-100 border border-plant-500 text-plant-700">
              <span className="flex items-center gap-2">
                <i className="fas fa-seedling"></i>
                Your cart is empty!
                <Link to='/' className="text-soil-700 hover:text-soil-800 underline ml-2">
                  Explore Plants
                </Link>
              </span>
            </Message>
          ) : (
            <div className="space-y-4">
              {cartItems.map(item => (
                <div key={item.product} className="border-2 border-soil-200 rounded-lg p-4 bg-white shadow-sm hover:shadow-md transition-shadow">
                  <div className="flex flex-col sm:flex-row items-center gap-4">
                    {/* Plant Image */}
                    <div className="w-full sm:w-28 flex-shrink-0">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-full h-28 object-cover rounded-lg border-2 border-soil-100"
                      />
                    </div>

                    {/* Plant Details */}
                    <div className="flex-1 text-center sm:text-left space-y-2">
                      <Link
                        to={`/product/${item.product}`}
                        className="text-xl font-semibold text-soil-800 hover:text-soil-900 hover:underline font-serif"
                      >
                        {item.name}
                      </Link>
                      <p className="text-lg font-bold text-soil-700">
                        ${Number(item.price).toFixed(2)}
                      </p>
                      <p className="text-sm text-soil-600">
                        In Stock: {item.countInStock}
                      </p>
                    </div>

                    {/* Quantity Controls */}
                    <div className="flex items-center gap-4">
                      <select
                        value={item.qty}
                        onChange={(e) => dispatch(addToCart(item.product, Number(e.target.value)))}
                        className="w-20 p-2 border-2 border-soil-300 rounded-md focus:ring-2 focus:ring-soil-500 text-soil-700 bg-soil-50"
                      >
                        {[...Array(item.countInStock).keys()].map((x) => (
                          <option key={x + 1} value={x + 1}>
                            {x + 1}
                          </option>
                        ))}
                      </select>

                      <button
                        onClick={() => removeFromCartHandler(item.product)}
                        className="p-2 text-soil-700 hover:text-soil-800 hover:bg-soil-50 rounded-full transition-colors"
                      >
                        <i className="fas fa-trash text-lg"></i>
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Order Summary Column */}
        <div className="md:w-1/3">
          <div className="bg-soil-50 rounded-lg shadow-md p-6 border-2 border-soil-200">
            <h2 className="text-2xl font-bold mb-4 text-soil-900 font-serif">
              Garden Summary
            </h2>

            <div className="space-y-4 mb-6">
              <div className="flex justify-between items-center">
                <span className="text-soil-700">Items:</span>
                <span className="text-soil-800 font-bold">
                  {cartItems.reduce((acc, item) => acc + item.qty, 0)}
                </span>
              </div>

              <div className="flex justify-between items-center">
                <span className="text-soil-700">Total:</span>
                <span className="text-2xl font-bold text-soil-800">
                  ${cartItems.reduce((acc, item) => acc + (item.qty * item.price), 0).toFixed(2)}
                </span>
              </div>
            </div>

            <button
              onClick={checkoutHandler}
              disabled={cartItems.length === 0}
              className={`w-full py-3 px-4 rounded-md font-medium transition-all duration-200
                ${cartItems.length === 0
                  ? 'bg-soil-100 text-soil-300 cursor-not-allowed'
                  : 'bg-soil-700 hover:bg-soil-800 text-plant-100 shadow-md hover:shadow-lg'}`}
            >
              <i className="fas fa-shovel mr-2"></i>
              Proceed to Planting
            </button>

            {cartItems.length > 0 && (
              <Link
                to="/"
                className="mt-4 inline-block w-full text-center text-soil-700 hover:text-soil-800 underline"
              >
                Continue Shopping
              </Link>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default CartPage
