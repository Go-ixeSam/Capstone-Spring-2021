import { useDispatch, useSelector } from "react-redux";
import { login } from "redux/Login/LoginSlice";

// export async function loginToWeb(phone, pass) {
export const loginToWeb = async (phone, pass, dispatch) => {
  //   const dispatch = useDispatch();
  const response = "";
  try {
    response = await dispatch(login({ phoneNumber: phone, password: pass }));
    console.log("login result", response);
    // * Nếu có sử dụng gì ở locFal này thì ta cứ lấy response ra mà dùng
  } catch (errpr) {
    console.log("Lỗi ở signIn.jsx: ", errpr);
  }
  return response;
};
