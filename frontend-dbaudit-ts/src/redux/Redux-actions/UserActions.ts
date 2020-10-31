import { IUserCall } from "../../assets/interfaces/Interfaces";
import { SET_USER } from "../types";

export const setUser = (props: IUserCall) => {
  return {
    type: SET_USER,
    user: props,
  };
};
