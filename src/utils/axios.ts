import axios from "axios";
import history from "src/utils/history";
import { Cookies } from "react-cookie";
import { signInFail } from "src/actions/signIn";
import store from "src/store";
const cookies = new Cookies();
const axiosSet = () => {
  axios.defaults.baseURL = process.env.REACT_APP_API_URL;
  axios.interceptors.request.use(
    (config: any) => {
      const userInfo = cookies.get("user_info");
      if (userInfo != undefined) {
        config.headers.Authorization = "Bearer " + userInfo.jwt.accessToken;
        config.headers.common["Authorization"] =
          "Bearer " + userInfo.jwt.accessToken;
      }
      return config;
    },
    (error) => {
      return error;
    }
  );
  axios.interceptors.response.use(
    (response) => {
      return response;
    },
    (err: any) => {
      console.log("요청후에러:", err.response);
      if (err.response.data.statusCode == 401) {
        history.push("/");
        store.dispatch(signInFail(false));
        cookies.remove("user_info");
      }
      return Promise.reject(err.response);
    }
  );
};
export default axiosSet;
