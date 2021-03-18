// api/productApi.js

import axiosClient from "api/axiosClient";
import { axiosTeamClient, axiosWithoutToken } from "api/axiosClient";
const axios = require("axios").default;
const JsonPlaceHolderApi = {
  getAll: (params) => {
    const url = "/posts";
    return axiosClient.get(url, { params });
  },
  getPlantInfo: (params) => {
    const url = "/LeakInfoFromWiki";
    return axiosTeamClient.get(url, { params });
  },
  login: (params) => {
    const url = "/api/Login/WebLogin";
    return axiosWithoutToken.post(url, params);
  },
  shareDetail: (params) => {
    const url = "/api/ShareDetail";
    return axiosTeamClient.post(url, { params: params });
    // return axios.post("http://54.179.74.214:8080/api/ShareDetail", params, {
    //   headers: {
    //     Authorization:
    //       "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1bmlxdWVfbmFtZSI6IjAxMjM0NTY3ODkiLCJBY2NvdW50SWQiOiJjMjFmOGViYy1mMjNjLTQ2OTItOTI1My0yMWI5OGUwNzJjYWIiLCJuYmYiOjE2MTU5ODc3NzcsImV4cCI6MTYxNjI0Njk3NywiaWF0IjoxNjE1OTg3Nzc3fQ.G9H_djVdX-zXEQAYlMhH-oJZY1eB0A9PJdGADtV5bLs",
    //   },
    // });
  },
};
export default JsonPlaceHolderApi;
