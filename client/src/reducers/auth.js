import * as actionTypes from "../constants/actionTypes";

const authReducer = (state = { authData: null }, action) => {
  switch (action.type) {
    case actionTypes.AUTH:
      localStorage.setItem("profile", JSON.stringify({ ...action?.data }));

      return { ...state, authData: action.data, loading: false, errors: null };

    case actionTypes.LOGOUT:
      localStorage.clear();

      return { ...state, authData: null };
    
      case actionTypes.SAVE:
        return action.data;

    default:
      return state;
  }
};
export default authReducer;
