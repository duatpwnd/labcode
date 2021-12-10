import axios from "axios";
const axiosSet = () => {
  console.log("process.env", process.env);
  axios.defaults.baseURL = process.env.REACT_APP_API_URL;
  axios.interceptors.request.use(
    (config: any) => {
      console.log("요청전:", config);
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
