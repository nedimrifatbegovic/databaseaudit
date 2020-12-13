import {
  ExistingUserDetails,
  IExistingUser,
} from "../../assets/interfaces/Interfaces";
import { GET_USER, GET_USER_FAIL, GET_USER_SUCCESS } from "../types";
import { put, takeEvery } from "redux-saga/effects";

import { getUserApi } from "../../components/Admin/components/GetUser/Api/getUser";

/** Load existing users internal/external */
function* fetchExistingUserAsync(action: IExistingUser) {
  try {
    const existinguser: ExistingUserDetails = yield getUserApi(
      action.existinguser
    );
    const newinput: ExistingUserDetails = existinguser;
    yield put({ type: GET_USER_SUCCESS, existinguser: newinput });
  } catch (error) {
    yield put({ type: GET_USER_FAIL, existinguser: undefined });
  }
}

export function* fetchExistingUserAsyncWatcher() {
  yield takeEvery(GET_USER, fetchExistingUserAsync);
}
