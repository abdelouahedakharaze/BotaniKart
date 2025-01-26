import axios from 'axios';
import {
    POST_LIST_REQUEST, POST_LIST_SUCCESS, POST_LIST_FAIL,
    POST_CREATE_REQUEST, POST_CREATE_SUCCESS, POST_CREATE_FAIL,
    POST_UPDATE_REQUEST, POST_UPDATE_SUCCESS, POST_UPDATE_FAIL,
    POST_DELETE_REQUEST, POST_DELETE_SUCCESS, POST_DELETE_FAIL,
    COMMENT_CREATE_REQUEST, COMMENT_CREATE_SUCCESS, COMMENT_CREATE_FAIL,
    HEART_TOGGLE_REQUEST, HEART_TOGGLE_SUCCESS, HEART_TOGGLE_FAIL,
    POST_GET_REQUEST, POST_GET_SUCCESS, POST_GET_FAIL
} from '../constants/postConstants';

// Fetch All Posts
export const listPosts = () => async (dispatch) => {
    try {
        dispatch({ type: POST_LIST_REQUEST });
        const { data } = await axios.get('http://127.0.0.1:8000/api/posts/');
        dispatch({ type: POST_LIST_SUCCESS, payload: data });
    } catch (error) {
        dispatch({
            type: POST_LIST_FAIL,
            payload: error.response?.data?.detail || error.message,
        });
    }
};

// Create Post
export const createPost = (postData) => async (dispatch, getState) => {
    try {
        dispatch({ type: POST_CREATE_REQUEST });
        const { userInfo } = getState().userLogin;
        
        const config = {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${userInfo.token}`,
            },
        };

        const { data } = await axios.post(
            'http://127.0.0.1:8000/api/posts/',
            { ...postData, text: postData.text }, // Match serializer's text field
            config
        );

        dispatch({ type: POST_CREATE_SUCCESS, payload: data });
    } catch (error) {
        dispatch({
            type: POST_CREATE_FAIL,
            payload: error.response?.data?.detail || error.message,
        });
    }
};

// Update Post
export const updatePost = (postId, postData) => async (dispatch, getState) => {
    try {
        dispatch({ type: POST_UPDATE_REQUEST });
        const { userInfo } = getState().userLogin;

        const config = {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${userInfo.token}`,
            },
        };

        const { data } = await axios.put(
            `http://127.0.0.1:8000/api/posts/${postId}/`,
            postData,
            config
        );

        dispatch({ type: POST_UPDATE_SUCCESS, payload: data });
    } catch (error) {
        dispatch({
            type: POST_UPDATE_FAIL,
            payload: error.response?.data?.detail || error.message,
        });
    }
};

// Delete Post
export const deletePost = (postId) => async (dispatch, getState) => {
    try {
        dispatch({ type: POST_DELETE_REQUEST });
        const { userInfo } = getState().userLogin;

        const config = {
            headers: {
                Authorization: `Bearer ${userInfo.token}`,
            },
        };

        await axios.delete(
            `http://127.0.0.1:8000/api/posts/${postId}/`,
            config
        );

        dispatch({ type: POST_DELETE_SUCCESS });
    } catch (error) {
        dispatch({
            type: POST_DELETE_FAIL,
            payload: error.response?.data?.detail || error.message,
        });
    }
};

// Create Comment
export const createComment = (postId, text) => async (dispatch, getState) => {
    try {
        dispatch({ type: COMMENT_CREATE_REQUEST });
        const { userInfo } = getState().userLogin;

        const config = {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${userInfo.token}`,
            },
        };

        // Send as { text } instead of { commentData }
        const { data } = await axios.post(
            `http://127.0.0.1:8000/api/posts/${postId}/add_comment/`,
            { text },  // Changed from commentData to { text }
            config
        );

        dispatch({ type: COMMENT_CREATE_SUCCESS, payload: data });
    } catch (error) {
        dispatch({
            type: COMMENT_CREATE_FAIL,
            payload: error.response?.data?.detail || error.message,
        });
    }
};

// Toggle Heart
export const toggleHeart = (postId) => async (dispatch, getState) => {
    try {
        dispatch({ type: HEART_TOGGLE_REQUEST });
        const { userInfo } = getState().userLogin;

        const config = {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${userInfo.token}`,
            },
        };

        const { data } = await axios.post(
            `http://127.0.0.1:8000/api/posts/${postId}/add_heart/`,
            {},
            config
        );

        dispatch({ type: HEART_TOGGLE_SUCCESS, payload: data });
    } catch (error) {
        dispatch({
            type: HEART_TOGGLE_FAIL,
            payload: error.response?.data?.detail || error.message,
        });
    }
};
export const getPost = (postId) => async (dispatch) => {
    try {
        dispatch({ type: POST_GET_REQUEST });
        const { data } = await axios.get(`http://127.0.0.1:8000/api/posts/${postId}/`);
        dispatch({ type: POST_GET_SUCCESS, payload: data });
    } catch (error) {
        dispatch({
            type: POST_GET_FAIL,
            payload: error.response?.data?.detail || error.message,
        });
    }
};