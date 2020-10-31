import { all } from "redux-saga/effects";
import { fetchUserAsyncWatcher } from "./UserSaga";

export default function* rootSaga() {
  yield all([fetchUserAsyncWatcher()]);
}
