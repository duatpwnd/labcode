import { createAction } from "typesafe-actions";
interface SignInRequestType {
  email: string;
  password: string;
}
type SignInSuccessType = null | { [key: string]: any };
type SignInFailType = boolean | { [key: string]: any };
// action types
export const SIGN_IN_REQUEST = "SIGN_IN_REQUEST";
export const SIGN_IN_SUCCESS = "SIGN_IN_SUCCESS";
export const SIGN_IN_FAILURE = "SIGN_IN_FAILURE";
export const SIGN_OUT = "SIGN_OUT";
// action creators
export const signInRequest = createAction(SIGN_IN_REQUEST)<SignInRequestType>();
export const signInSuccess = createAction(SIGN_IN_SUCCESS)<SignInSuccessType>();
export const signInFail = createAction(SIGN_IN_FAILURE)<SignInFailType>();
export const signOut = createAction(SIGN_OUT)();
/*
export function loadWidgets() {
  return { type: LOAD };
}
*/
