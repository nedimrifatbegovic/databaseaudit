import { IUserAction, IUserState } from "../../assets/interfaces/Interfaces";
import { SET_USER_FAIL, SET_USER_SUCCESS } from "../types";

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
    default:
      return state;
  }
};

export default UserReducer;
