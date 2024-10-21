import React from 'react'

interface ProductCardProps {
  id: number;
  name: string;
  price: number;
  image: string;
}

const ProductCard: React.FC<ProductCardProps> = ({ id, name, price, image }) => {
  return (
    <div key={id} className="bg-white rounded-lg shadow-lg overflow-hidden transform transition hover:scale-105 hover:shadow-2xl">
      <img src={image} alt={name} className="w-full h-48 object-cover" />
      <div className="p-4">
        <h3 className="text-xl font-semibold mb-2 text-dark-green">{name}</h3>
        <p className="text-dark-brown mb-4">${price.toFixed(2)}</p>
        <button className="bg-medium-green text-white px-4 py-2 rounded-full hover:bg-dark-green transition duration-300">
          Add to Cart
        </button>
      </div>
    </div>
  )
}

export default ProductCard
