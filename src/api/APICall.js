import { getALL } from "redux/index";
import * as variable from "variables/Variables";
import { SuccessPopUp, FailPopUp } from "components/Modal/Modal";
import React from "react";
export const fetchPostList = async (dispatch) => {
  let response;
  // * Bắt try catch ở đây là để tránh lỗi crash ứng dụng lỡ như trong quá trình dispatch đến getAll bị lỗi
  try {
    response = await dispatch(getALL());

    // * Nếu có sử dụng gì ở local này thì ta cứ lấy response ra mà dùng
  } catch (errpr) {
    console.log("Failed to fetch product list: ", errpr);
  }
  return response;
};
