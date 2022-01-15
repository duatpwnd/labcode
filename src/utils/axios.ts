import axios from "axios";
import history from "src/utils/history";
import { Cookies } from "react-cookie";
const cookies = new Cookies();

const axiosSet = () => {
  console.log("process.env", process.env);
  axios.defaults.baseURL = process.env.REACT_APP_API_URL;
  axios.interceptors.request.use(
    (config: any) => {
      const userInfo = cookies.get("user_info");
      console.log("요청전:", userInfo);
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
      return Promise.reject(err.response);
    }
  );
};
export default axiosSet;
