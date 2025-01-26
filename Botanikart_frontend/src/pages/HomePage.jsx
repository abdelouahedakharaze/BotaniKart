import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useLocation } from 'react-router-dom'
import { listProducts } from '../actions/productActions'
import Product from '../components/Product'
import Loader from '../components/Loader'
import Message from '../components/Message'
import Paginate from '../components/Paginate'

const HomePage = () => {
  const location = useLocation()
  let keyword = location && location.search
  const dispatch = useDispatch()
  const productList = useSelector(state => state.productList)
  const { error, loading, products, page, pages } = productList

  useEffect(() => {
    dispatch(listProducts(keyword))
  }, [dispatch, keyword])

  return (
    <div className="min-h-Page bg-[var(--soil-50)] p-4">
      <div className="container mx-auto">
        <h1 className="text-3xl font-bold text-[var(--soil-900)] my-6">
          Latest Products
        </h1>

        {loading ? (
          <Loader />
        ) : error ? (
          <Message variant="danger">{error}</Message>
        ) : (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {products.map((prod) => (
                <div key={prod._id}>
                  <Product prod={prod} />
                </div>
              ))}
            </div>

            <div className="flex justify-center">
              <Paginate 
                pages={pages} 
                page={page} 
                keyword={keyword} 
                className="text-[var(--plant-700)]"
              />
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default HomePage