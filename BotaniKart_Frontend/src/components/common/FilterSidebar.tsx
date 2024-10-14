import React from 'react'
import { Checkbox } from './Input'

interface FilterOption {
  id: string
  label: string
}

interface FilterSidebarProps {
  categories: FilterOption[]
  selectedCategories: string[]
  onCategoryChange: (categoryId: string) => void
}

const FilterSidebar: React.FC<FilterSidebarProps> = ({
  categories,
  selectedCategories,
  onCategoryChange,
}) => {
  return (
    <div className="w-64 bg-white p-4 rounded-lg shadow-md">
      <h2 className="text-lg font-semibold mb-4">Filter by Category</h2>
      {categories.map((category) => (
        <div key={category.id} className="mb-2">
          <Checkbox
            id={`category-${category.id}`}
            checked={selectedCategories.includes(category.id)}
            onChange={() => onCategoryChange(category.id)}
            label={category.label}
          />
        </div>
      ))}
    </div>
  )
}

export default FilterSidebar