import React from 'react'
import { useFetch } from '../../hooks/useFetch'
import { Checkbox } from '../common/Input'

interface Category {
  id: string
  name: string
}

interface CategoryFilterProps {
  selectedCategories: string[]
  onCategoryChange: (categoryId: string) => void
}

const CategoryFilter: React.FC<CategoryFilterProps> = ({ selectedCategories, onCategoryChange }) => {
  const { data: categories, loading, error } = useFetch<Category[]>('/api/categories')

  if (loading) return <div>Loading categories...</div>
  if (error) return <div>Error loading categories</div>
  if (!categories) return null

  return (
    <div className="bg-white p-4 rounded-lg shadow-md">
      <h3 className="text-lg font-semibold mb-2">Categories</h3>
      {categories.map((category) => (
        <div key={category.id} className="mb-2">
          <Checkbox
            id={`category-${category.id}`}
            checked={selectedCategories.includes(category.id)}
            onChange={() => onCategoryChange(category.id)}
            label={category.name}
          />
        </div>
      ))}
    </div>
  )
}

export default CategoryFilter