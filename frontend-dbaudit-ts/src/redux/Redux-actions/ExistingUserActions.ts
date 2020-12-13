import { ExistingUser } from "../../assets/interfaces/Interfaces";
import { GET_USER } from "../types";

export const getUser = (props: ExistingUser) => {
  return {
    type: GET_USER,
    existinguser: props,
  };
};
