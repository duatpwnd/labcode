import { all, fork, takeLatest, call, put } from "redux-saga/effects";
import axios from "axios";
import { SIGN_IN_SUCCESS } from "src/actions/signIn";
function signInAPI(data) {
  return axios.post(`http://localhost:4000/auth/login`, data, {
    withCredentials: true,
  });
}
function* signIn(action) {
  try {
    const result = yield call(signInAPI, action.data);

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
  yield takeLatest(SIGN_IN_SUCCESS, signIn);
}
