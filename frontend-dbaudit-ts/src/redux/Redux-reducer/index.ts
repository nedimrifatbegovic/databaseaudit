import UserReducer from "./UserReducer";
import { combineReducers } from "redux";

const allReducers = combineReducers({
  user: UserReducer,
});

export default allReducers;
