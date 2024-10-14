import React, { useState } from 'react'
import { Button } from '../common/Button'
import { Input, Textarea } from '../common/Input'

interface ProductFormData {
  name: string
  description: string
  price: number
  stock: number
  image: string
}

interface ProductFormProps {
  initialData?: ProductFormData
  onSubmit: (data: ProductFormData) => void
}

const ProductForm: React.FC<ProductFormProps> = ({ initialData, onSubmit }) => {
  const [formData, setFormData] = useState<ProductFormData>(
    initialData || {
      name: '',
      description: '',
      price: 0,
      stock: 0,
      image: '',
    }
  )

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSubmit(formData)
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <Input
        label="Product Name"
        name="name"
        value={formData.name}
        onChange={handleChange}
        required
      />
      <Textarea
        label="Description"
        name="description"
        value={formData.description}
        onChange={handleChange}
        required
      />
      <Input
        label="Price"
        name="price"
        type="number"
        value={formData.price.toString()}
        onChange={handleChange}
        required
        min="0"
        step="0.01"
      />
      <Input
        label="Stock"
        name="stock"
        type="number"
        value={formData.stock.toString()}
        onChange={handleChange}
        required
        min="0"
      />
      <Input
        label="Image URL"
        name="image"
        value={formData.image}
        onChange={handleChange}
        required
      />
      <Button type="submit">
        {initialData ? 'Update Product' : 'Add Product'}
      </Button>
    </form>
  )
}

export default ProductForm