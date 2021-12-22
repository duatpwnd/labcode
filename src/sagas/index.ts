import { all, fork } from "redux-saga/effects";
import { watchSignIn } from "./signIn";
function* rootSaga() {
  yield all([fork(watchSignIn)]);
} // rootSaga를 만들어 줍니다.

export default rootSaga;
