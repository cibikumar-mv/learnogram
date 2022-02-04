import * as actionTypes from "../constants/actionTypes";

const authReducer = (state, action) => {
  switch (action.type) {
    case actionTypes.AUTH:
      return state;

    case actionTypes.LOGOUT:
      return state;

    default:
      return state;
  };
};
export default authReducer;