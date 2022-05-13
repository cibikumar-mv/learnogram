import { FETCH_ALL, FETCH_ONE, CREATE, UPDATE, DELETE, START_LOADING, STOP_LOADING } from "../constants/actionTypes";

const reducer = (state = { isLoading: true, posts: [] }, action) => {
  switch (action.type) {
    case START_LOADING:
      return { ...state, isLoading: true };
    case STOP_LOADING:
      return { ...state, isLoading: false };
    case CREATE:
      return [...state, action.payload];
    case FETCH_ONE:
      return { ...state, post: action.payload };
    case UPDATE:
      return {
        ...state, posts: state.posts.map((post) =>
          post._id === action.payload._id ? action.payload : post
        ), post: action.payload
      };
    case FETCH_ALL:
      return { ...state, posts: action.payload };
    default:
      return state;
  }
};

export default reducer;
