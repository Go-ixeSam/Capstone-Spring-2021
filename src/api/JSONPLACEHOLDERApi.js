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
  },
  getDashboard: (params) => {
    const url = "/api/Dashboard/GetDashboard";
    return axiosTeamClient.get(url, { params: params });
  },
  isAccept: (params) => {
    const url = "/api/Vegetable/IsAccept";
    return axiosTeamClient.put(url, { params: params });
  },
  getAllVegetableUnapproved: (params) => {
    const url = "/api/Vegetable/GetAllVegetableUnapproved";
    return axiosTeamClient.get(url, { params: params });
  },

  //* APi trả về cho ta 1 danh sách mà thể hiện số ngưỡng mà nếu vượt quá thì sẽ khóa account
  getAllPercent: (params) => {
    const url = "/api/PrecentReport/GetAll";
    return axiosTeamClient.get(url, { params: params });
  },

  //* api giúp ta chỉnh lại cái ngưỡng bị khóa
  editPrecentReport: (params) => {
    const url = "/api/PrecentReport";
    return axiosTeamClient.put(url, { params: params });
  },
  
};
export default JsonPlaceHolderApi;
