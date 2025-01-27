import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, Link } from 'react-router-dom';
import { listProducts } from '../actions/productActions';
import { listPosts } from '../actions/postActions';
import Product from '../components/Product';
import Loader from '../components/Loader';
import Message from '../components/Message';
import Paginate from '../components/Paginate';
import { Truck, ShieldCheck, PhoneCall, BookOpen, RefreshCcw } from 'lucide-react';

const HomePage = () => {
  const location = useLocation();
  const keyword = location?.search || '';
  const dispatch = useDispatch();

  const productList = useSelector((state) => state.productList);
  const { error: productError, loading: productLoading, products, page, pages } = productList;

  const postList = useSelector((state) => state.postList);
  const { error: postError, loading: postLoading, posts } = postList;

  useEffect(() => {
    dispatch(listProducts(keyword));
    dispatch(listPosts());
  }, [dispatch, keyword]);

  return (
    <div className="min-h-screen bg-stone-50">
      {/* Hero Section */}
      <section className="bg-emerald-900 text-stone-50 py-16">
        <div className="container mx-auto text-center px-4">
          <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-amber-500 to-amber-600 bg-clip-text text-transparent">
            Welcome to BotaniKart
          </h1>
          <p className="text-lg text-stone-200">
            Your one-stop destination for plants, gardening tips, and sustainable living.
          </p>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-16 bg-emerald-800">
        <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            { icon: Truck, label: 'Fast Delivery' },
            { icon: ShieldCheck, label: 'Secure Payment' },
            { icon: PhoneCall, label: '24/7 Support' },
          ].map(({ icon: Icon, label }) => (
            <div key={label} className="flex flex-col items-center text-center">
              <Icon className="w-12 h-12 mb-4 text-amber-500" />
              <h3 className="text-xl font-semibold text-stone-50">{label}</h3>
            </div>
          ))}
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-16 bg-stone-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center text-emerald-900 mb-8 border-b-4 border-amber-500 pb-4 inline-block">
            Featured Products
          </h2>

          {productLoading ? (
            <Loader />
          ) : productError ? (
            <Message variant="danger">{productError}</Message>
          ) : (
            <>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {products.slice(0, 6).map((prod) => (
                  <Product key={prod._id} prod={prod} />
                ))}
              </div>
              {pages > 1 && (
                <div className="flex justify-center mt-8">
                  <Paginate pages={pages} page={page} keyword={keyword} />
                </div>
              )}
            </>
          )}
        </div>
      </section>

      {/* Blog Section */}
      <section className="py-16 bg-stone-100">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-3xl font-bold text-emerald-900">Latest Articles</h2>
            <Link to="/blog" className="text-amber-600 hover:text-amber-700 flex items-center gap-2">
              <BookOpen className="w-5 h-5" />
              View All Posts
            </Link>
          </div>

          {postLoading ? (
            <Loader />
          ) : postError ? (
            <Message variant="danger">{postError}</Message>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {posts.slice(0, 4).map((post) => (
                <div key={post.id} className="bg-white rounded-lg shadow-md overflow-hidden border-2 border-stone-200">
                  {post.image && (
                    <img
                      src={post.image}
                      alt={post.title}
                      className="w-full h-48 object-cover"
                      onError={(e) => (e.target.style.display = 'none')}
                    />
                  )}
                  <div className="p-6">
                    <h3 className="text-xl font-semibold text-emerald-900 mb-2">{post.title}</h3>
                    <p className="text-stone-600 mb-4">{post.text.substring(0, 100)}...</p>
                    <Link
                      to={`/post/${post.id}`}
                      className="text-amber-600 hover:text-amber-700 font-medium flex items-center gap-2"
                    >
                      Read More <RefreshCcw className="w-4 h-4" />
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default HomePage;