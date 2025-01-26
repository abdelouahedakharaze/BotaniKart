import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useLocation, Link } from 'react-router-dom'
import { listProducts } from '../actions/productActions'
import { listPosts } from '../actions/postActions'
import Product from '../components/Product'
import Loader from '../components/Loader'
import Message from '../components/Message'
import Paginate from '../components/Paginate'

const HomePage = () => {
  const location = useLocation()
  let keyword = location && location.search
  const dispatch = useDispatch()
  
  // Product-related state
  const productList = useSelector(state => state.productList)
  const { error: productError, loading: productLoading, products, page, pages } = productList
  
  // Blog post-related state
  const postList = useSelector(state => state.postList)
  const { error: postError, loading: postLoading, posts } = postList

  useEffect(() => {
    dispatch(listProducts(keyword))
    dispatch(listPosts())
  }, [dispatch, keyword])

  return (
    <div className="min-h-Page bg-[var(--soil-50)] p-4">
      <div className="container mx-auto space-y-12">
        {/* Products Section */}
        <section>
          <h1 className="text-3xl font-bold text-[var(--soil-900)] mb-6">
            Featured Products
          </h1>

          {productLoading ? (
            <Loader />
          ) : productError ? (
            <Message variant="danger">{productError}</Message>
          ) : (
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {products.slice(0, 8).map((prod) => (
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
        </section>

        {/* Blog Posts Section */}
        <section>
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-3xl font-bold text-[var(--soil-900)]">
              Latest Blog Posts
            </h2>
            <Link 
              to="/blog" 
              className="text-[var(--plant-700)] hover:text-[var(--plant-900)]"
            >
              View All Posts →
            </Link>
          </div>

          {postLoading ? (
            <Loader />
          ) : postError ? (
            <Message variant="danger">{postError}</Message>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {posts.slice(0, 4).map(post => (
                <div 
                  key={post.id} 
                  className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow"
                >
                  {post.image && (
                    <img 
                      src={post.image} 
                      alt={post.title}
                      className="w-full h-48 object-cover"
                      onError={(e) => e.target.style.display = 'none'}
                    />
                  )}
                  <div className="p-6">
                    <h3 className="text-xl font-semibold mb-2 text-[var(--soil-900)]">
                      {post.title}
                    </h3>
                    <p className="text-gray-600 mb-4">
                      {post.text.substring(0, 100)}{post.text.length > 100 && '...'}
                    </p>
                    <Link 
                      to={`/post/${post.id}`} 
                      className="text-[var(--plant-700)] hover:text-[var(--plant-900)] font-medium"
                    >
                      Read More
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>
      </div>
    </div>
  )
}

export default HomePage