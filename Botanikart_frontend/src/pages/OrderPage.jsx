import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';
import Message from '../components/Message';
import Loader from '../components/Loader';
import { getOrderDetails, payOrder, deliverOrder } from '../actions/orderActions';
import { ORDER_PAY_RESET, ORDER_DELIVER_RESET } from '../constants/orderConstants';

const OrderPage = () => {
    const { orderId } = useParams();

    const [sdkReady, setSdkReady] = useState(false);

    const orderDetails = useSelector((state) => state.orderDetails);
    const { order, error, loading } = orderDetails;

    const orderPay = useSelector((state) => state.orderPay);
    const { loading: loadingPay, success: successPay } = orderPay;

    const orderDeliver = useSelector((state) => state.orderDeliver);
    const { loading: loadingDeliver, success: successDeliver } = orderDeliver;

    const userLogin = useSelector((state) => state.userLogin);
    const { userInfo } = userLogin;

    if (!loading && !error) {
        order.itemsPrice = order.orderItems.reduce((acc, item) => acc + item.price * item.qty, 0).toFixed(2);
    }

    const addPayPalScript = () => {
        const script = document.createElement('script');
        script.type = 'text/javascript';
        script.src = 'https://www.paypal.com/sdk/js?client-id=AVffVSsk5xRljctxIjDhuu4bCNpXRL7NIOswpMhyPB5yObjU24Z8oFcUDPVb-ae1fXvMDiJFxYgvx4zY';
        script.async = true;
        script.onload = () => {
            setSdkReady(true);
        };
        document.body.appendChild(script);
    };

    const navigate = useNavigate();
    const dispatch = useDispatch();

    useEffect(() => {
        if (!userInfo) {
            navigate('/login');
        }

        if (!order || successPay || order._id !== Number(orderId) || successDeliver) {
            dispatch({ type: ORDER_PAY_RESET });
            dispatch({ type: ORDER_DELIVER_RESET });

            dispatch(getOrderDetails(orderId));
        } else if (!order.isPaid) {
            if (!window.paypal) {
                addPayPalScript();
            } else {
                setSdkReady(true);
            }
        }
    }, [dispatch, order, orderId, successPay, successDeliver]);

    const successPaymentHandler = (paymentResult) => {
        dispatch(payOrder(orderId, paymentResult));
    };

    const deliverHandler = () => {
        dispatch(deliverOrder(order));
    };

    return loading ? (
        <Loader />
    ) : error ? (
        <Message variant="danger">{error}</Message>
    ) : (
        <div>
            <h1 className="text-2xl font-semibold mb-6 text-gray-800">Order: {order._id}</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-white p-6 shadow-md rounded-md">
                    <h2 className="text-xl font-semibold mb-4 text-gray-700">Shipping</h2>
                    <p><strong className="text-gray-700">Name: </strong>{order.user.name}</p>
                    <p><strong className="text-gray-700">Email: </strong><a href={`mailto:${order.user.email}`} className="text-blue-600">{order.user.email}</a></p>
                    <p><strong className="text-gray-700">Shipping: </strong>{order.shippingAddress.address}, {order.shippingAddress.city}, {order.shippingAddress.postalCode}, {order.shippingAddress.country}</p>

                    {order.isDelivered ? (
                        <Message variant="success">Delivered on {order.deliveredAt}</Message>
                    ) : (
                        <Message variant="warning">Not Delivered</Message>
                    )}

                    <div className="mt-6">
                        <h2 className="text-xl font-semibold mb-4 text-gray-700">Payment Method</h2>
                        <p><strong className="text-gray-700">Method: </strong>{order.paymentMethod}</p>
                        {order.isPaid ? (
                            <Message variant="success">Paid on {order.paidAt}</Message>
                        ) : (
                            <Message variant="warning">Not Paid</Message>
                        )}
                    </div>

                    <div className="mt-6">
                        <h2 className="text-xl font-semibold mb-4 text-gray-700">Order Items</h2>
                        {order.orderItems.length === 0 ? (
                            <Message variant="info">Order is empty</Message>
                        ) : (
                            <ul className="space-y-4">
                                {order.orderItems.map((item, index) => (
                                    <li key={index} className="flex items-center space-x-4">
                                        <img src={item.image} alt={item.name} className="w-16 h-16 object-cover rounded" />
                                        <div className="flex-1">
                                            <Link to={`/product/${item.product}`} className="text-blue-600">{item.name}</Link>
                                        </div>
                                        <div className="text-right">
                                            {item.qty} X ${item.price} = ${(item.qty * item.price).toFixed(2)}
                                        </div>
                                    </li>
                                ))}
                            </ul>
                        )}
                    </div>
                </div>

                <div className="bg-white p-6 shadow-md rounded-md">
                    <h2 className="text-xl font-semibold mb-4 text-gray-700">Order Summary</h2>
                    <div className="space-y-4">
                        <div className="flex justify-between text-gray-700">
                            <span>Items:</span>
                            <span>${order.itemsPrice}</span>
                        </div>
                        <div className="flex justify-between text-gray-700">
                            <span>Shipping:</span>
                            <span>${order.shippingPrice}</span>
                        </div>
                        <div className="flex justify-between text-gray-700">
                            <span>Tax:</span>
                            <span>${order.taxPrice}</span>
                        </div>
                        <div className="flex justify-between font-semibold text-lg text-gray-800">
                            <span>Total Price:</span>
                            <span>${order.totalPrice}</span>
                        </div>

                        {!order.isPaid && (
                            <div className="mt-4">
                                {loadingPay && <Loader />}

                                {!sdkReady ? (
                                    <Loader />
                                ) : (
                                    <div>
                                        <button
                                            className="w-full py-2 bg-blue-600 text-white font-semibold rounded-md"
                                            onClick={() => successPaymentHandler({ status: 'success' })}
                                        >
                                            Pay Now
                                        </button>
                                    </div>
                                )}
                            </div>
                        )}

                        {loadingDeliver && <Loader />}
                        {userInfo && userInfo.isAdmin && order.isPaid && !order.isDelivered && (
                            <div className="mt-4">
                                <button
                                    className="w-full py-2 bg-green-600 text-white font-semibold rounded-md"
                                    onClick={deliverHandler}
                                >
                                    Mark as Delivered
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default OrderPage;
