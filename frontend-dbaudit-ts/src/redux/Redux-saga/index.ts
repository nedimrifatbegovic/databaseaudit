import { deleteUserSyncWatcher, fetchUserAsyncWatcher } from "./UserSaga";

import { all } from "redux-saga/effects";
import { fetchExistingUserAsyncWatcher } from "./ExistingUserSaga";

export default function* rootSaga() {
  yield all([
    fetchUserAsyncWatcher(),
    deleteUserSyncWatcher(),
    fetchExistingUserAsyncWatcher(),
  ]);
}
