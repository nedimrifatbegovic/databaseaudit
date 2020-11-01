import {
  DELETE_USER,
  DELETE_USER_FAIL,
  DELETE_USER_SUCCESS,
  SET_USER,
  SET_USER_FAIL,
  SET_USER_SUCCESS,
} from "../types";
import { IUserAction, IUserState } from "../../assets/interfaces/Interfaces";
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

function* deleteUserSync() {
  try {
    let user: IUserState = {
      email: "",
      password: "",
      type: "",
      status: false,
    };
    yield put({ type: DELETE_USER_SUCCESS, user: user });
  } catch (error) {
    yield put({ type: DELETE_USER_FAIL, user: undefined });
  }
}

export function* deleteUserSyncWatcher() {
  yield takeEvery(DELETE_USER, deleteUserSync);
}
