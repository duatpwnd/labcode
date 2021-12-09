import { createAction } from "typesafe-actions";
interface StateType {
  userInfo: null | { [key: string]: any };
}
// action types
export const SIGN_IN_REQUEST = "SIGN_IN_REQUEST";
export const SIGN_IN_SUCCESS = "SIGN_IN_SUCCESS";
export const SIGN_IN_FAILURE = "SIGN_IN_FAILURE";
// action creators
export const signInSuccess = createAction(SIGN_IN_SUCCESS)<StateType>();
/*
export function loadWidgets() {
  return { type: LOAD };
}
*/
