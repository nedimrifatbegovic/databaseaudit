import {
  DELETE_USER_FAIL,
  DELETE_USER_SUCCESS,
  SET_USER_FAIL,
  SET_USER_SUCCESS,
} from "../types";
import { IUserAction, IUserState } from "../../assets/interfaces/Interfaces";

const initialState: IUserState = {
  email: "",
  password: "",
  type: "",
  status: false,
};

const UserReducer = (state: IUserState = initialState, action: IUserAction) => {
  switch (action.type) {
    case SET_USER_SUCCESS:
      return action.user;
    case SET_USER_FAIL:
      return undefined;
    case DELETE_USER_SUCCESS:
      return action.user;
    case DELETE_USER_FAIL:
      return undefined;
    default:
      return state;
  }
};

export default UserReducer;
