import { all, call } from "redux-saga/effects";
import { watchSignIn } from "./signIn";
function* rootSaga() {
  yield all([watchSignIn()]);
} // rootSaga를 만들어 줍니다.

export default rootSaga;
