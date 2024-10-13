import React, { useState } from 'react'
import ProductList from '../components/products/ProductList'
import CategoryFilter from '../components/products/CategoryFilter'
import SearchBar from '../components/common/SearchBar'
import SortDropdown from '../components/common/SortDropdown'
import { useAnalytics } from '../hooks/useAnalytics'

const Products: React.FC = () => {
  useAnalytics('Products')
  const [category, setCategory] = useState<string | null>(null)
  const [searchTerm, setSearchTerm] = useState('')
  const [sortBy, setSortBy] = useState('name')

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-8">Our Products</h1>
      <div className="flex flex-col md:flex-row gap-4 mb-8">
        <CategoryFilter onSelectCategory={setCategory} />
        <SearchBar onSearch={setSearchTerm} />
        <SortDropdown onSort={setSortBy} />
      </div>
      <ProductList category={category} searchTerm={searchTerm} sortBy={sortBy} />
    </div>
  )
}

export default Products