import { IUserState } from "../interfaces/Interfaces";

export default function loginCheck(userState: IUserState, userType: string) {
  if (userState.type === userType && userState.status === true) {
    return true;
  } else {
    return false;
  }
}
