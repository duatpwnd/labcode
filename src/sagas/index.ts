import { all, fork } from "redux-saga/effects";
import { watchSignIn } from "./signIn";
function* rootSaga() {
  // all은 배열안의 여러 사가를 동시에 실행시켜줌
  yield all([fork(watchSignIn)]);
} // rootSaga를 만들어 줍니다.

export default rootSaga;
