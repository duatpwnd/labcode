import { all, fork, takeLatest, call, put } from "redux-saga/effects";
import axios from "axios";
import { SIGN_IN_SUCCESS, SIGN_IN_REQUEST } from "src/actions/signIn";
function signInAPI(data) {
  console.log("data", data);
  return axios.post(``, data);
}
function* signIn(action) {
  try {
    console.log("액션명", action);
    // call을 통하여 동기적으로 호출, fork를 통하여 비동기적으로 호출
    const result = yield call(signInAPI, action.payload);
    yield put({
      type: SIGN_IN_SUCCESS,
      payload: result.data,
    });
  } catch (e) {
    //   yield put({
    //     type: LOG_IN_FAILURE,
    //     error: e,
    //   });
  }
}

export function* watchSignIn() {
  console.log("watchSignIn");
  yield takeLatest(SIGN_IN_REQUEST, signIn);
}
