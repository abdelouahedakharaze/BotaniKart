import React, { useState } from 'react';
import { Star, Truck } from 'lucide-react';

const product = {
  id: 1,
  name: "Monstera Deliciosa",
  price: 29.99,
  rating: 4.5,
  description: "The Monstera Deliciosa, also known as the Swiss Cheese Plant, is famous for its quirky natural leaf holes. These tropical plants are easy to grow and can dramatically improve any interior setting.",
  features: [
    "Air purifying",
    "Pet-friendly",
    "Low maintenance",
    "Tropical vibes",
  ],
  image: "/placeholder.svg?height=400&width=400" // Only one image
};

export default function ProductDetail() {
  const [quantity, setQuantity] = useState(1);

  const incrementQuantity = () => setQuantity(q => q + 1);
  const decrementQuantity = () => setQuantity(q => Math.max(1, q - 1));

  return (
    <div className="min-h-screen bg-tan py-12"> {/* Updated to use 'bg-tan' */}
      <div className="container mx-auto px-4">
        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          <div className="md:flex">
            <div className="md:w-1/2 p-4">
              <img 
                src={product.image} 
                alt={product.name} 
                className="w-full h-96 object-cover rounded-lg" 
              />
            </div>
            <div className="md:w-1/2 p-8">
              <h1 className="text-3xl font-bold text-dark-green mb-4">{product.name}</h1>
              <div className="flex items-center mb-4">
                <div className="flex text-yellow-400 mr-2">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} size={20} fill={i < Math.floor(product.rating) ? "currentColor" : "none"} />
                  ))}
                </div>
                <span className="text-dark-green">{product.rating} stars</span>
              </div>
              <p className="text-2xl font-bold text-dark-green mb-4">${product.price.toFixed(2)}</p>
              <p className="text-dark-brown mb-6">{product.description}</p>
              <ul className="mb-6">
                {product.features.map((feature, index) => (
                  <li key={index} className="flex items-center text-dark-brown mb-2">
                    <svg className="w-4 h-4 mr-2 text-dark-green" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                    </svg>
                    {feature}
                  </li>
                ))}
              </ul>
              <div className="flex items-center mb-6">
                <button onClick={decrementQuantity} className="bg-light-green text-dark-brown px-3 py-1 rounded-l">-</button>
                <span className="bg-tan text-dark-brown px-4 py-1">{quantity}</span>
                <button onClick={incrementQuantity} className="bg-light-green text-dark-brown px-3 py-1 rounded-r">+</button>
              </div>
              <button className="w-full bg-medium-green text-white py-3 rounded-lg hover:bg-dark-green transition-colors mb-4">
                Add to Cart
              </button>
              <p className="flex items-center text-dark-brown">
                <Truck size={20} className="mr-2" />
                Free shipping on orders over $50
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
