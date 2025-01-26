import { 
  POST_LIST_REQUEST, POST_LIST_SUCCESS, POST_LIST_FAIL,
  POST_CREATE_REQUEST, POST_CREATE_SUCCESS, POST_CREATE_FAIL,
  POST_UPDATE_REQUEST, POST_UPDATE_SUCCESS, POST_UPDATE_FAIL,
  POST_DELETE_REQUEST, POST_DELETE_SUCCESS, POST_DELETE_FAIL,
  COMMENT_CREATE_REQUEST, COMMENT_CREATE_SUCCESS, COMMENT_CREATE_FAIL,
  HEART_TOGGLE_REQUEST, HEART_TOGGLE_SUCCESS, HEART_TOGGLE_FAIL,
  POST_GET_REQUEST, POST_GET_SUCCESS, POST_GET_FAIL,
} from "../constants/postConstants";

export const postListReducer = (state = { posts: [] }, action) => {
  switch (action.type) {
    case POST_LIST_REQUEST:
      return { ...state, loading: true, error: null };
    case POST_LIST_SUCCESS:
      return { loading: false, posts: action.payload, error: null };
    case POST_CREATE_SUCCESS:
      return { 
        ...state, 
        posts: [action.payload, ...state.posts],
        error: null 
      };
    case POST_UPDATE_SUCCESS:
      return {
        ...state,
        posts: state.posts.map(post =>
          post.id === action.payload.id ? action.payload : post
        ),
        error: null
      };
    case POST_DELETE_SUCCESS:
      return {
        ...state,
        posts: state.posts.filter(post => post.id !== action.payload),
        error: null
      };
    case POST_LIST_FAIL:
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};

export const postDetailsReducer = (state = { post: null }, action) => {
  switch (action.type) {
    case POST_GET_REQUEST:
      return { ...state, loading: true, error: null };
    case POST_GET_SUCCESS:
      return { loading: false, post: action.payload, error: null };
    case POST_GET_FAIL:
      return { ...state, loading: false, error: action.payload };
    case HEART_TOGGLE_SUCCESS:
      return {
        ...state,
        post: {
          ...state.post,
          hearts_count: action.payload.hearts_count
        },
        error: null
      };
    case COMMENT_CREATE_SUCCESS:
      return {
        ...state,
        post: {
          ...state.post,
          comments: [...state.post.comments, action.payload]
        },
        error: null
      };
    default:
      return state;
  }
};

export const postCreateReducer = (state = {}, action) => {
  switch (action.type) {
    case POST_CREATE_REQUEST:
      return { loading: true, error: null };
    case POST_CREATE_SUCCESS:
      return { loading: false, success: true, post: action.payload };
    case POST_CREATE_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const postUpdateReducer = (state = {}, action) => {
  switch (action.type) {
    case POST_UPDATE_REQUEST:
      return { loading: true, error: null };
    case POST_UPDATE_SUCCESS:
      return { loading: false, success: true };
    case POST_UPDATE_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const postDeleteReducer = (state = {}, action) => {
  switch (action.type) {
    case POST_DELETE_REQUEST:
      return { loading: true, error: null };
    case POST_DELETE_SUCCESS:
      return { loading: false, success: true };
    case POST_DELETE_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const commentCreateReducer = (state = {}, action) => {
  switch (action.type) {
    case COMMENT_CREATE_REQUEST:
      return { loading: true, error: null };
    case COMMENT_CREATE_SUCCESS:
      return { loading: false, success: true, comment: action.payload };
    case COMMENT_CREATE_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const heartToggleReducer = (state = {}, action) => {
  switch (action.type) {
    case HEART_TOGGLE_REQUEST:
      return { loading: true, error: null };
    case HEART_TOGGLE_SUCCESS:
      return { 
        loading: false, 
        success: true, 
        hearts_count: action.payload.hearts_count 
      };
    case HEART_TOGGLE_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};