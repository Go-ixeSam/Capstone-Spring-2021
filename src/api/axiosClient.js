import axios from "axios";
import queryString from "query-string";
import * as variable from "variables/Variables";
import { useDispatch, useSelector } from "react-redux";
import { getToken } from "redux/Selector/Selectors";
import React from "react";
import { useState, useEffect } from "react";

// export function create () {
//   const [token,setToken]=React.useState(useSelector(state=>getToken(state)))
//   return [token]
// }
function useFriendStatus(friendID) {
  const [token, setToken] = useState("");
  const result = useSelector((state) => getToken(state));
  useEffect(() => {
    function handleStatusChange() {
      setToken(result);
    }
    handleStatusChange();
  });

  return token;
}
// import persitorStore from "redux/store"
// const {store}=persitorStore()
// console.log("store nè",store.getState().post)
// Set up default config for http requests here

// Please have a look at here `https://github.com/axios/axios#request-
// config` for the full list of configs

// console.log("store= ",store.getState().post)
// export const getTokenFromStore=()=>{
//   const [token,setToken]=useState(useSelector(state=>getToken(state)))
//   return token
// }
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
    Authorization: `Bearer ${localStorage.getItem("token")}`,
    "Access-Control-Allow-Headers": "*",
  },
  paramsSerializer: (params) => queryString.stringify(params),
});

axiosTeamClient.interceptors.request.use(
  async (config) => {
    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);

axiosTeamClient.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    throw error;
  }
);

/**
 * * Axios dành riêng cho những api ko cần token
 */
export const axiosWithoutToken = axios.create({
  baseURL: variable.teamBaseURL,
  headers: {
    "Content-type": "application/json",
    "Access-Control-Allow-Origin": "*",
  },
  paramsSerializer: (params) => queryString.stringify(params),
});
// ! Xử lí phần authen token, mỗi api đề có cái này mới
axiosWithoutToken.interceptors.request.use(async (config) => {
  config.headers = {
    "Access-Control-Allow-Origin": "*",
  };
  return config;
});
axiosWithoutToken.interceptors.response.use(
  (response) => {
    response.headers = {
      "Access-Control-Allow-Origin": "*",
    };
    return response;
  },
  (error) => {
    throw error;
  }
);

export default axiosClient;
