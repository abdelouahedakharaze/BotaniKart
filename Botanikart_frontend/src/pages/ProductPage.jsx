import React, { useEffect, useState } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { listProductDetails, createProductReview } from '../actions/productActions';
import { PRODUCT_CREATE_REVIEW_RESET } from '../constants/productConstants';

// Components
import Rating from '../components/Rating';
import Loader from '../components/Loader';
import Message from '../components/Message';

const ProductPage = () => {
  const [qty, setQty] = useState(1);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState('');

  const { id } = useParams();
  const navigate = useNavigate();

  const dispatch = useDispatch();

  const productDetails = useSelector((state) => state.productDetails);
  const { loading, error, product } = productDetails;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const productReviewCreate = useSelector((state) => state.productReviewCreate);
  const {
    loading: loadingProductReview,
    error: errorProductReview,
    success: successProductReview,
  } = productReviewCreate;

  useEffect(() => {
    if (successProductReview) {
      setRating(0);
      setComment('');
      dispatch({ type: PRODUCT_CREATE_REVIEW_RESET });
    }

    dispatch(listProductDetails(id));
  }, [dispatch, id, successProductReview]);

  const addToCartHandler = () => {
    navigate(`/cart/${id}?qty=${qty}`);
  };

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(createProductReview(id, { rating, comment }));
  };

  return (
    <div className="max-w-6xl mx-auto px-4">
      <Link to="/" className="inline-block bg-gray-200 text-gray-800 py-2 px-4 rounded mb-4">
        Go Back
      </Link>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : (
        <div>
          {/* Product Details */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="md:col-span-1">
              <img
                src={'http://127.0.0.1:8000' + product.image}
                alt={product.name}
                className="w-full rounded shadow"
              />
            </div>

            <div className="md:col-span-1">
              <div className="space-y-4">
                <h3 className="text-2xl font-bold">{product.name}</h3>
                <Rating
                  value={product.rating}
                  text={`${product.numReviews} reviews`}
                  color="#f8e825"
                />
                <p className="text-lg font-semibold">Price: ${product.price}</p>
                <p className="text-gray-700">Description: {product.description}</p>
              </div>
            </div>

            <div className="md:col-span-1">
              <div className="border rounded-lg shadow p-4">
                <div className="flex justify-between mb-3">
                  <span>Price:</span>
                  <strong>${product.price}</strong>
                </div>
                <div className="flex justify-between mb-3">
                  <span>Status:</span>
                  <strong>{product.countInStock > 0 ? 'In Stock' : 'Out of Stock'}</strong>
                </div>
                {product.countInStock > 0 && (
                  <div className="mb-3">
                    <label htmlFor="qty" className="block mb-1">
                      Qty
                    </label>
                    <select
                      id="qty"
                      value={qty}
                      onChange={(e) => setQty(e.target.value)}
                      className="block w-full border-gray-300 rounded"
                    >
                      {[...Array(product.countInStock).keys()].map((x) => (
                        <option key={x + 1} value={x + 1}>
                          {x + 1}
                        </option>
                      ))}
                    </select>
                  </div>
                )}
                <button
                  onClick={addToCartHandler}
                  className="w-full bg-green-600 text-white py-2 rounded disabled:opacity-50"
                  disabled={product.countInStock === 0}
                >
                  Add to Cart
                </button>
              </div>
            </div>
          </div>

          {/* Reviews */}
          <div className="mt-8">
            <h4 className="text-xl font-bold mb-4">Reviews</h4>
            {product.reviews.length === 0 && (
              <Message variant="info">No Reviews</Message>
            )}
            <div className="space-y-4">
              {product.reviews.map((review) => (
                <div key={review._id} className="border rounded-lg shadow p-4">
                  <strong>{review.name}</strong>
                  <Rating value={review.rating} color="#f8e825" />
                  <p>{review.createdAt.substring(0, 10)}</p>
                  <p>{review.comment}</p>
                </div>
              ))}

              <div className="border rounded-lg shadow p-4">
                <h4 className="text-lg font-bold mb-4">Write a Review</h4>
                {loadingProductReview && <Loader />}
                {successProductReview && (
                  <Message variant="success">Review Submitted</Message>
                )}
                {errorProductReview && (
                  <Message variant="danger">{errorProductReview}</Message>
                )}
                {userInfo ? (
                  <form onSubmit={submitHandler}>
                    <div className="mb-4">
                      <label htmlFor="rating" className="block mb-1">
                        Rating
                      </label>
                      <select
                        id="rating"
                        value={rating}
                        onChange={(e) => setRating(e.target.value)}
                        className="block w-full border-gray-300 rounded"
                      >
                        <option value="">Select...</option>
                        <option value="1">1 - Poor</option>
                        <option value="2">2 - Fair</option>
                        <option value="3">3 - Good</option>
                        <option value="4">4 - Very Good</option>
                        <option value="5">5 - Excellent</option>
                      </select>
                    </div>

                    <div className="mb-4">
                      <label htmlFor="comment" className="block mb-1">
                        Review
                      </label>
                      <textarea
                        id="comment"
                        rows="5"
                        value={comment}
                        onChange={(e) => setComment(e.target.value)}
                        className="block w-full border-gray-300 rounded"
                      ></textarea>
                    </div>

                    <button
                      type="submit"
                      className="bg-blue-600 text-white py-2 px-4 rounded"
                      disabled={loadingProductReview}
                    >
                      Submit
                    </button>
                  </form>
                ) : (
                  <Message variant="info">
                    Please <Link to="/login">login</Link> to write a review
                  </Message>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductPage;
