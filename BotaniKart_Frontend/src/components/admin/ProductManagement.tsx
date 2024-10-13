import React, { useState, useEffect } from 'react'
import { getProducts, deleteProduct } from '../../services/products'
import ProductForm from '../products/ProductForm'
import { Button } from '../common/Button'
import { Modal } from '../common/Modal'

interface Product {
  id: string
  name: string
  price: number
  description: string
}

const ProductManagement: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([])
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null)

  useEffect(() => {
    fetchProducts()
  }, [])

  const fetchProducts = async () => {
    const fetchedProducts = await getProducts()
    setProducts(fetchedProducts)
  }

  const handleEdit = (product: Product) => {
    setSelectedProduct(product)
    setIsModalOpen(true)
  }

  const handleDelete = async (id: string) => {
    await deleteProduct(id)
    fetchProducts()
  }

  const handleCloseModal = () => {
    setIsModalOpen(false)
    setSelectedProduct(null)
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Product Management</h1>
      <Button onClick={() => setIsModalOpen(true)}>Add New Product</Button>
      <table className="w-full mt-4">
        <thead>
          <tr>
            <th>Name</th>
            <th>Price</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product) => (
            <tr key={product.id}>
              <td>{product.name}</td>
              <td>${product.price.toFixed(2)}</td>
              <td>
                <Button onClick={() => handleEdit(product)}>Edit</Button>
                <Button onClick={() => handleDelete(product.id)} variant="danger">Delete</Button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <Modal isOpen={isModalOpen} onClose={handleCloseModal}>
        <ProductForm product={selectedProduct} onSave={fetchProducts} onCancel={handleCloseModal} />
      </Modal>
    </div>
  )
}

export default ProductManagement