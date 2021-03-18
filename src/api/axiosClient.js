// api/axiosClient.js
import axios from "axios";
import queryString from "query-string";
import * as variable from "variables/Variables";
import { useDispatch, useSelector } from "react-redux";
import { getToken } from "redux/Selector/Selectors";
// Set up default config for http requests here

// Please have a look at here `https://github.com/axios/axios#request-
// config` for the full list of configs

const axiosClient = axios.create({
  baseURL: variable.jsonplaceholerAPI,
  headers: {
    "content-type": "application/json",
  },
  //   ! Việc parse param của asiox có hơi
  // !vấn đề nên ta sẽ sử dụng query string để xủ lí việc này

  //? Ví dụ như ta phải viét query stirng thế này : ?userid=""&password="". Khá là mệt,
  //?dùng cái thư việ này ta chỉ cần bỏ param vào thôi, còn lại nó sẽ tự chuyển thành query trên
  paramsSerializer: (params) => queryString.stringify(params),
});
axiosClient.interceptors.request.use(async (config) => {
  return config;
});

// * mỗi reponse ta sẽ phải thực hiện lấy
axiosClient.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    throw error;
  }
);

export const axiosTeamClient = axios.create({
  baseURL: variable.teamBaseURL,
  headers: {
    "Content-type": "application/json",
    Authorization:
      "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1bmlxdWVfbmFtZSI6IjAxMjM0NTY3ODkiLCJBY2NvdW50SWQiOiJjMjFmOGViYy1mMjNjLTQ2OTItOTI1My0yMWI5OGUwNzJjYWIiLCJuYmYiOjE2MTU5ODc3NzcsImV4cCI6MTYxNjI0Njk3NywiaWF0IjoxNjE1OTg3Nzc3fQ.G9H_djVdX-zXEQAYlMhH-oJZY1eB0A9PJdGADtV5bLs",
  },
  paramsSerializer: (params) => queryString.stringify(params),
});

/**
 * * Axios dành riêng cho những api ko cần token
 */
export const axiosWithoutToken = axios.create({
  baseURL: variable.teamBaseURL,
  headers: {
    "Content-type": "application/json",
  },
  paramsSerializer: (params) => queryString.stringify(params),
});

// ! Xử lí phần authen token, mỗi api đề có cái này mới
axiosWithoutToken.interceptors.request.use(async (config) => {
  return config;
});
axiosWithoutToken.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    throw error;
  }
);

axiosTeamClient.interceptors.request.use(async (config) => {
  //* Phần token ta sẽ lấy ở store sau khi user đăng nhập thành công =)
  const token = useSelector((state) => getToken(state));
  config.headers = {
    Authorization: `Bearer ${token}`,
    // Accept: "application/json",
    // "Content-Type": "application/x-www-form-urlencoded",
  };
  return config;
  // },
  // (errorr) => {
  //   Promise.reject(errorr);
});

// * mỗi reponse ta sẽ phải thực hiện lấy
axiosTeamClient.interceptors.response.use(
  //*reponse.data để lấy về json yêu cầu, ta thực hiện ở đây luôn cho lẹ
  // ! nghĩ lại thì ta cần nhiều thư hơn đơn thuần là data
  (response) => {
    return response;
  },
  (error) => {
    // * Nếu ta muốn xem cái này thì ở kết quả trả về ta .error thì ta sẽ thấy rõ
    // * Và nếu muốn xem status code thì ở .request cũng sẽ có đủ
    throw error;
  }
);

export default axiosClient;
