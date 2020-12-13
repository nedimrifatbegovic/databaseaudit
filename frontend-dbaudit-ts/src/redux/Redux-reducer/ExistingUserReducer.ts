import {
  ExistingUserDetails,
  IExistingUser,
} from "../../assets/interfaces/Interfaces";
import { GET_USER_FAIL, GET_USER_SUCCESS } from "../types";

const initialState: ExistingUserDetails = {
  email: "",
  password: "",
  companyName: "",
  /* Only for internal users */
  folderId: undefined,
};

const ExistingUserReducer = (
  state: ExistingUserDetails = initialState,
  action: IExistingUser
) => {
  switch (action.type) {
    case GET_USER_SUCCESS:
      return action.existinguser;
    case GET_USER_FAIL:
      return undefined;
    default:
      return state;
  }
};

export default ExistingUserReducer;
