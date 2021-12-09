import { combineReducers } from "redux";
import signIn from "./signIn";
const rootReducer = combineReducers({
  signIn,
});
export type RootState = ReturnType<typeof rootReducer>;
export default rootReducer;
