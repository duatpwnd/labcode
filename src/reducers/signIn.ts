import { createReducer, ActionType } from "typesafe-actions";
import { SIGN_IN_SUCCESS, signInSuccess } from "src/actions/signIn";
interface StateType {
  userInfo: null | { [key: string]: any };
}
const actions = { signInSuccess }; // 모든 액션 생성함수들을 actions 객체에 넣습니다
type SignInAction = ActionType<typeof actions>; // ActionType 를 사용하여 모든 액션 객체들의 타입을 준비해줄 수 있습니다
const INITIAL_STATE: StateType = {
  userInfo: null,
};
const reducer = createReducer<StateType, SignInAction>(INITIAL_STATE, {
  [SIGN_IN_SUCCESS]: (state, action) => ({
    userInfo: action.payload.userInfo,
  }),
});
export default reducer;
