import { combineReducers, applyMiddleware } from "redux";
import { legacy_createStore as createStore } from 'redux';
import { thunk } from 'redux-thunk';
import { composeWithDevTools } from "redux-devtools-extension";

import { 
    productListReducer, 
    productDetailReducer, 
    productDeleteReducer,
    productCreateReducer, 
    productUpdateReducer,
    productReviewCreateReducer,
    productTopRatedReducer
} from "./reducers/productReducers";
import { cartReducer } from "./reducers/cartReducers";
import { 
    userLoginReducer, 
    userRegisterReducer, 
    userDetailsReducer, 
    userUpdateProfileReducer, 
    userListReducer, 
    userDeleteReducer,
    userUpdateReducer,
} from "./reducers/userReducers";
import { 
    orderCreateReducer, 
    orderDetailsReducer, 
    orderPayReducer, 
    orderListMyReducer,
    orderListReducer,
    orderDeliverReducer, 
} from "./reducers/orderReducers";

// Import blog-related reducers
import { 
    postListReducer, 
    postCreateReducer, 
    postUpdateReducer, 
    postDeleteReducer,
    commentCreateReducer,
    heartToggleReducer,
    postDetailsReducer,
} from "./reducers/postReducers";

// Combine reducers
const reducer = combineReducers({
    productList: productListReducer,
    productDetails: productDetailReducer,
    productDelete: productDeleteReducer,
    productCreate: productCreateReducer,
    productUpdate: productUpdateReducer,
    productReviewCreate: productReviewCreateReducer,
    productTopRated: productTopRatedReducer,
    cart: cartReducer,
    userLogin: userLoginReducer,
    userRegister: userRegisterReducer,
    userDetails: userDetailsReducer,
    userUpdateProfile: userUpdateProfileReducer,
    userList: userListReducer,
    userDelete: userDeleteReducer,
    userUpdate: userUpdateReducer,
    orderCreate: orderCreateReducer,
    orderDetails: orderDetailsReducer,
    orderPay: orderPayReducer,
    orderListMy: orderListMyReducer,
    orderList: orderListReducer,
    orderDeliver: orderDeliverReducer,
    
    // Add blog-related state management
    postList: postListReducer, 
    postCreate: postCreateReducer,
    postUpdate: postUpdateReducer,
    postDelete: postDeleteReducer,
    commentCreate: commentCreateReducer,
    heartToggle: heartToggleReducer,
    postDetails: postDetailsReducer,
});

// Fetching cart, user, and shipping data from local storage
const cartItemFromStorage = localStorage.getItem('cartItems') ? 
    JSON.parse(localStorage.getItem('cartItems')) : []

const userInfoFromStorage = localStorage.getItem('userInfo') ? 
    JSON.parse(localStorage.getItem('userInfo')) : null

const shippingAddressFromStorage = localStorage.getItem('shippingAddress') ? 
    JSON.parse(localStorage.getItem('shippingAddress')) : {}

const initialState = {
    cart: {
        cartItems: cartItemFromStorage,
        shippingAddress: shippingAddressFromStorage,
    },
    userLogin: { userInfo: userInfoFromStorage },
    
    // Initial state for blog
    postList: { posts: [], loading: false, error: null }, 
    postCreate: { success: false, loading: false, error: null },
    postUpdate: { success: false, loading: false, error: null },
    postDelete: { success: false, loading: false, error: null },
    commentCreate: { success: false, loading: false, error: null },
    heartToggle: { success: false, loading: false, error: null },
    postDetails: { loading: false, post: {}, error: null },
};

// Middleware
const middleware = [thunk];

// Create store
const store = createStore(reducer, initialState, 
    composeWithDevTools(applyMiddleware(...middleware)));

export default store;
