import { takeLatest, call, put } from "redux-saga/effects";
import axios from "axios";
import apiUrl from "src/utils/api";
import { Cookies } from "react-cookie";
import {
  SIGN_IN_SUCCESS,
  SIGN_IN_REQUEST,
  SIGN_IN_FAILURE,
} from "src/actions/signIn";
import history from "src/utils/history";
const cookies = new Cookies();
function signInAPI(data) {
  return axios
    .post(apiUrl.signIn, data)
    .then((result: any) => {
      return result;
    })
    .catch((err: { [key: string]: any }) => {
      console.log("로그인에러", err);
      return err;
    });
}
function* signIn(action) {
  // call을 통하여 동기적으로 호출, fork를 통하여 비동기적으로 호출
  const result = yield call(signInAPI, action.payload);

  if (result.data.statusCode == 200) {
    console.log("성공");
    let date = new Date();
    date.setTime(date.getTime() + 1000 * 60 * 60);
    yield put({
      type: SIGN_IN_SUCCESS,
      payload: result.data.data,
    });
    cookies.set("user_info", result.data.data, {
      path: "/",
      expires: date,
    });
    history.push({
      pathname: "/projects/list",
      search: `?currentPage=1&search=&isActive=false`,
      state: {
        nav: false,
      },
    });
  } else {
    console.log("실패", result.data);
    yield put({
      type: SIGN_IN_FAILURE,
      payload: result.data.message,
    });
  }
  return result;
}

export function* watchSignIn() {
  yield takeLatest(SIGN_IN_REQUEST, signIn);
}
