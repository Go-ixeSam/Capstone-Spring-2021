// api/productApi.js

import axiosClient from "api/axiosClient";
const JsonPlaceHolderApi = {
  getAll: (params) => {
    const url = "/posts";
    return axiosClient.get(url, { params });
  },
};
export default JsonPlaceHolderApi;
