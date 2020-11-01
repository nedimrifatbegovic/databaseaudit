import { deleteUserSyncWatcher, fetchUserAsyncWatcher } from "./UserSaga";

import { all } from "redux-saga/effects";

export default function* rootSaga() {
  yield all([fetchUserAsyncWatcher(), deleteUserSyncWatcher()]);
}
