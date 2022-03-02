import axios from "axios";
import history from "src/utils/history";
import { Cookies } from "react-cookie";
import { signInFail } from "src/actions/signIn";
import store from "src/store";
import { useEffect } from "react";
import toast from 'react-hot-toast';
const cookies = new Cookies();
const Axios = () => {
  useEffect(() => {
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
          toast.dismiss();
          toast("로그아웃 처리되었습니다.", {
            style: {
              color: '#ff4b4b',
            }
          });
          cookies.remove("user_info");
          store.dispatch(signInFail(false));
          history.push("/");
        }
        return Promise.reject(err.response);
      }
    );
  });
  return (
    <>
    </>
  )
};
export default Axios;
