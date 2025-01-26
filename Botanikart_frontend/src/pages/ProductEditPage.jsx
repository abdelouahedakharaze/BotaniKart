import React, {useState, useEffect} from 'react'
import axios from 'axios'
import { Link, useParams} from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import Loader from '../components/Loader'
import Message from '../components/Message'
import {listProductDetails, updateProduct} from '../actions/productActions'
import { PRODUCT_UPDATE_RESET } from '../constants/productConstants'
import { useNavigate } from 'react-router-dom'

const ProductEditPage = () => {
    const {productId} = useParams()
    const [name, setName] = useState('')
    const [price, setPrice] = useState(0)
    const [image, setImage] = useState('')
    const [brand, setBrand] = useState('')
    const [category, setCategory] = useState('')
    const [countInStock, setCountInStock] = useState(0)
    const [description, setDescription] = useState('')
    const [uploading, setUploading] = useState(false)
    
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const productDetails = useSelector(state => state.productDetails)
    const {error, loading, product} = productDetails
    const productUpdate = useSelector(state => state.productUpdate)
    const {error: errorUpdate, loading: loadingUpdate, success: successUpdate} = productUpdate

    useEffect(() => {
        if (successUpdate) {
            dispatch({type: PRODUCT_UPDATE_RESET})
            navigate('/admin/productlist')
        } else {
            if (!product.name || product._id !== Number(productId)) {
                dispatch(listProductDetails(productId))
            } else {
                setName(product.name)
                setPrice(product.price)
                setImage(product.image)
                setBrand(product.brand)
                setCategory(product.category)
                setCountInStock(product.countInStock)
                setDescription(product.description)
            }
        }
    }, [dispatch, product, productId, navigate, successUpdate])

    const submitHandler = (e) => {
        e.preventDefault()
        dispatch(updateProduct({
            _id: productId,
            name,
            price,
            image,
            brand,
            category,
            countInStock,
            description
        }))
    }

    const uploadFileHandler = async (e) => {
        const file = e.target.files[0]
        const formData = new FormData()
        formData.append('image', file)
        formData.append('product_id', productId)
        setUploading(true)

        try {
            const config = { headers: { "Content-Type": 'multipart/form-data' } }
            const {data} = await axios.post('http://127.0.0.1:8000/api/products/upload/', formData, config)
            setImage(data)
            setUploading(false)
        } catch(error) {
            setUploading(false)
        }
    }

    return (
        <div className="p-6 bg-soil-50 min-h-Page">
            <Link 
                to='/admin/productlist'
                className="inline-block mb-6 px-4 py-2 bg-soil-700 text-white rounded-md hover:bg-soil-800 transition-colors"
            >
                Go Back
            </Link>

            <div className="max-w-3xl mx-auto bg-white p-6 rounded-lg shadow-sm border border-soil-100">
                <h1 className="text-2xl font-bold text-soil-900 mb-6">Edit Product</h1>
                {loadingUpdate && <Loader />}
                {errorUpdate && <Message variant='danger'>{errorUpdate}</Message>}

                {loading ? <Loader /> : error ? <Message variant='danger'>{error}</Message> : (
                    <form onSubmit={submitHandler} className="space-y-4">
                        <div className="mb-4">
                            <label className="block text-sm font-medium text-soil-700 mb-2">Name</label>
                            <input
                                type="text"
                                className="block w-full rounded-md border border-soil-300 p-2 focus:ring-plant-500 focus:border-plant-500"
                                placeholder="Enter name"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                            />
                        </div>

                        <div className="mb-4">
                            <label className="block text-sm font-medium text-soil-700 mb-2">Price</label>
                            <input
                                type="number"
                                className="block w-full rounded-md border border-soil-300 p-2 focus:ring-plant-500 focus:border-plant-500"
                                placeholder="Enter price"
                                value={price}
                                onChange={(e) => setPrice(e.target.value)}
                            />
                        </div>

                        <div className="mb-4">
                            <label className="block text-sm font-medium text-soil-700 mb-2">Image</label>
                            <input
                                type="text"
                                className="block w-full rounded-md border border-soil-300 p-2 focus:ring-plant-500 focus:border-plant-500 mb-2"
                                placeholder="Enter image URL"
                                value={image}
                                onChange={(e) => setImage(e.target.value)}
                            />
                            <input
                                type="file"
                                className="block w-full text-sm text-soil-700 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-medium file:bg-plant-600 file:text-white hover:file:bg-plant-700"
                                onChange={uploadFileHandler}
                            />
                            {uploading && <Loader />}
                        </div>

                        <div className="mb-4">
                            <label className="block text-sm font-medium text-soil-700 mb-2">Brand</label>
                            <input
                                type="text"
                                className="block w-full rounded-md border border-soil-300 p-2 focus:ring-plant-500 focus:border-plant-500"
                                placeholder="Enter brand"
                                value={brand}
                                onChange={(e) => setBrand(e.target.value)}
                            />
                        </div>

                        <div className="mb-4">
                            <label className="block text-sm font-medium text-soil-700 mb-2">Stock</label>
                            <input
                                type="number"
                                className="block w-full rounded-md border border-soil-300 p-2 focus:ring-plant-500 focus:border-plant-500"
                                placeholder="Enter stock"
                                value={countInStock}
                                onChange={(e) => setCountInStock(e.target.value)}
                            />
                        </div>

                        <div className="mb-4">
                            <label className="block text-sm font-medium text-soil-700 mb-2">Category</label>
                            <input
                                type="text"
                                className="block w-full rounded-md border border-soil-300 p-2 focus:ring-plant-500 focus:border-plant-500"
                                placeholder="Enter category"
                                value={category}
                                onChange={(e) => setCategory(e.target.value)}
                            />
                        </div>

                        <div className="mb-4">
                            <label className="block text-sm font-medium text-soil-700 mb-2">Description</label>
                            <textarea
                                className="block w-full rounded-md border border-soil-300 p-2 focus:ring-plant-500 focus:border-plant-500"
                                placeholder="Enter description"
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                                rows="4"
                            />
                        </div>

                        <button
                            type="submit"
                            className="w-full py-2 px-4 bg-plant-600 text-white rounded-md hover:bg-plant-700 transition-colors font-medium"
                        >
                            Update
                        </button>
                    </form>
                )}
            </div>
        </div>
    )
}

export default ProductEditPage