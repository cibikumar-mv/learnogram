import { combineReducers } from "redux";
import auth from "./auth";
import posts from "./posts";
import user from "./user"

export default combineReducers({
  auth,
  posts,
  user,
});
