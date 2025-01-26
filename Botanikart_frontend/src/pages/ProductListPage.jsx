import React, {useState, useEffect} from 'react'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import Loader from '../components/Loader'
import Message from '../components/Message'
import Paginate from '../components/Paginate'
import { useLocation, useNavigate, useParams } from 'react-router-dom'
import { listProducts, deleteProduct, createProduct } from '../actions/productActions'
import { PRODUCT_CREATE_RESET } from '../constants/productConstants'

const ProductListPage = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const productList = useSelector(state => state.productList)
    const {loading, error, products, pages, page} = productList
    const productDelete = useSelector(state => state.productDelete)
    const {loading: loadingDelete, error: errorDelete, success: successDelete} = productDelete
    const productCreate = useSelector(state => state.productCreate)
    const {loading: loadingCreate, error: errorCreate, success: successCreate, product: createdProduct} = productCreate
    const userLogin = useSelector(state => state.userLogin)
    const {userInfo} = userLogin
    const location = useLocation()
    let keyword = location && location.search

    useEffect(() => {
        dispatch({type: PRODUCT_CREATE_RESET})
        if (!userInfo?.isAdmin) navigate('/login')
        if (successCreate) navigate(`/admin/product/${createdProduct._id}/edit`)
        else dispatch(listProducts(keyword))
    }, [dispatch, navigate, userInfo, successDelete, successCreate, keyword])

    const deleteHandler = (id) => {
        if (window.confirm('Are you sure you want to delete this product?')) {
            dispatch(deleteProduct(id))
        }
    }

    const createProductHandler = () => dispatch(createProduct())

    return (
        <div className="p-6 bg-soil-50 min-h-Page">
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-bold text-soil-900">Products</h1>
                <button
                    onClick={createProductHandler}
                    className="bg-plant-600 hover:bg-plant-700 text-white px-4 py-2 rounded-md transition-colors flex items-center"
                >
                    <i className="fas fa-plus mr-2"></i>
                    Create Product
                </button>
            </div>

            {loadingDelete && <Loader />}
            {errorDelete && <Message variant="danger">{errorDelete}</Message>}
            {loadingCreate && <Loader />}
            {errorCreate && <Message variant="danger">{errorCreate}</Message>}

            {loading ? <Loader /> : error ? <Message variant="danger">{error}</Message> : (
                <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-soil-200 border border-soil-200 rounded-lg">
                        <thead className="bg-soil-50">
                            <tr>
                                <th className="px-6 py-3 text-left text-sm font-medium text-soil-900 border-b border-soil-200">ID</th>
                                <th className="px-6 py-3 text-left text-sm font-medium text-soil-900 border-b border-soil-200">NAME</th>
                                <th className="px-6 py-3 text-left text-sm font-medium text-soil-900 border-b border-soil-200">PRICE</th>
                                <th className="px-6 py-3 text-left text-sm font-medium text-soil-900 border-b border-soil-200">CATEGORY</th>
                                <th className="px-6 py-3 text-left text-sm font-medium text-soil-900 border-b border-soil-200">BRAND</th>
                                <th className="px-6 py-3 text-left text-sm font-medium text-soil-900 border-b border-soil-200">ACTIONS</th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-soil-200">
                            {products.map(product => (
                                <tr key={product._id} className="hover:bg-soil-50">
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-soil-700">{product._id}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-soil-700">{product.name}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-soil-700">${product.price}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-soil-700">{product.category}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-soil-700">{product.brand}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-soil-700 space-x-2">
                                        <Link
                                            to={`/admin/product/${product._id}/edit`}
                                            className="text-plant-700 hover:text-plant-800 p-2 hover:bg-plant-50 rounded-md"
                                        >
                                            <i className="fas fa-edit"></i>
                                        </Link>
                                        <button
                                            onClick={() => deleteHandler(product._id)}
                                            className="text-red-600 hover:text-red-700 p-2 hover:bg-red-50 rounded-md"
                                        >
                                            <i className="fas fa-trash"></i>
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    <div className="mt-4">
                        <Paginate pages={pages} page={page} isAdmin={true} />
                    </div>
                </div>
            )}
        </div>
    )
}

export default ProductListPage