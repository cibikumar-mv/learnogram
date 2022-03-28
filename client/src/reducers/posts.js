import { FETCH_ALL, FETCH_ONE, CREATE, UPDATE, DELETE, } from "../constants/actionTypes";

const reducer = (posts = [], action) => {
  switch (action.type) {
    case CREATE:
      return [...posts, action.payload];
    case FETCH_ONE:
      return action.payload
    case UPDATE:
      return posts.map((post) =>
        post._id === action.payload._id ? action.payload : post
      );
    case FETCH_ALL:
      return action.payload;
    default:
      return posts;
  }
};

export default reducer;
