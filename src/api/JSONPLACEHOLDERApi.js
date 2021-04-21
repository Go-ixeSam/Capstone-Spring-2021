// api/productApi.js
import React from "react";
import { config } from "@fortawesome/fontawesome-svg-core";
import axiosClient from "api/axiosClient";

import * as variable from "../variables/Variables"
// import { useAxios, axiosWithoutToken, axiosTeamClient } from "api/axiosClient";
import {
  AxiosCalling,
  axiosWithoutToken,
  axiosTeamClient,
} from "api/axiosClient";
import { getToken } from "redux/Selector/Selectors";
import { useDispatch, useSelector } from "react-redux";
const axios = require('axios').default;
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
    return axiosTeamClient.post(url, params);
  },
  getDashboard: (params) => {
    const url = "/api/Dashboard/GetDashboard";
    return axiosTeamClient.get(url, params);
  },
  isAccept: (params) => {
    const url = "/api/Vegetable/IsAccept";

    //! kiểu put ở dưới là cách để thiết lập đối với những api mà sử dụng query param
    return axiosTeamClient.put(url, {}, { params: params });
  },
  getAllVegetableUnapproved: (params) => {
    const url = "/api/Vegetable/GetAllVegetableUnapproved";

    //! kiểu put ở dưới là cách để thiết lập đối với những api mà param nằm ở body
    return axiosTeamClient.get(url, params);
  },

  //* APi trả về cho ta 1 danh sách mà thể hiện số ngưỡng mà nếu vượt quá thì sẽ khóa account
  getAllPercent: (params) => {
    const url = "/api/PrecentReport/GetAll";
    return axiosTeamClient.get(url, { params: params });
  },

  //* api giúp ta chỉnh lại cái ngưỡng bị khóa
  editPrecentReport: (params) => {
    const url = "/api/PrecentReport";
    return axiosTeamClient.put(url, params);
  },

  //* Lấy danh sách top 10 để hiện lên dashboard
  getTop10: (params) => {
    const url = "/api/Dashboard/Top10";
    // return axiosTeamClient.get(url, {}, { params: params });
    return axios.get(variable.teamBaseURL+url+`?Status=${params}`);
  },

  //* laay thong tin de so sanh giua exchange va share cho dashboard
  getShareAndExchangeCompare: (params) => {
    const url = "/api/Dashboard/ShowDashBoardAboutShareAndExchange";
    return axiosTeamClient.get(url, {}, { params: params });
  },
};
export default JsonPlaceHolderApi;
