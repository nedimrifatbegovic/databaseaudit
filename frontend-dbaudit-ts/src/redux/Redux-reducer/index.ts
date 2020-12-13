import ExistingUserReducer from "./ExistingUserReducer";
import UserReducer from "./UserReducer";
import { combineReducers } from "redux";

const allReducers = combineReducers({
  user: UserReducer,
  existinguser: ExistingUserReducer,
});

export default allReducers;
