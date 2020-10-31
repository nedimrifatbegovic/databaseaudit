import { IUserAction, IUserState } from "../../assets/interfaces/Interfaces";
import { SET_USER, SET_USER_FAIL, SET_USER_SUCCESS } from "../types";
import { put, takeEvery } from "redux-saga/effects";

import { connectUser } from "../../components/Login/Api/loginApi";

// api..

function* fetchUserAsync(action: IUserAction) {
  try {
    const status: boolean = yield connectUser(action.user);
    let user: IUserState = {
      email: action.user.email,
      password: action.user.password,
      type: action.user.type,
      status: status,
    };
    yield put({ type: SET_USER_SUCCESS, user: user });
  } catch (error) {
    yield put({ type: SET_USER_FAIL, user: undefined });
  }
}

export function* fetchUserAsyncWatcher() {
  yield takeEvery(SET_USER, fetchUserAsync);
}
