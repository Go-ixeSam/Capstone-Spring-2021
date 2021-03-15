// api/productApi.js

import axiosClient from "api/axiosClient";
import {axiosTeamClient} from "api/axiosClient"
const JsonPlaceHolderApi = {
  getAll: (params) => {
    const url = "/posts";
    return axiosClient.get(url, { params });
  },
  getPlantInfo:(params)=>{
    const url ="/LeakInfoFromWiki"
    return axiosTeamClient.get(url,{params})
  }
};
export default JsonPlaceHolderApi;
