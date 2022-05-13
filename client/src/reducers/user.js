import * as actionTypes from "../constants/actionTypes";

const userReducer = (state = { posts:[] }, action) => {
  switch (action.type) {
    case actionTypes.SAVE_USER_POST:
      return {...state, posts: action.payload};

    default:
      return state;
  }
};
export default userReducer;
