import { DELETE_USER, SET_USER } from "../types";

import { IUserCall } from "../../assets/interfaces/Interfaces";

export const setUser = (props: IUserCall) => {
  return {
    type: SET_USER,
    user: props,
  };
};

export const deleteUser = () => {
  return {
    type: DELETE_USER,
  };
};
