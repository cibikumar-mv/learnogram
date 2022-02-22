import {FETCH_ALL,FETCH_ONE,CREATE,UPDATE,DELETE,} from "../constants/actionTypes";

const reducer = (posts = [], action) => {
  switch (action.type) {
    case CREATE:
      return [...posts, action.payload];
    case FETCH_ONE:
      return action.payload
    default:
      return posts;
  }
};

export default reducer;
