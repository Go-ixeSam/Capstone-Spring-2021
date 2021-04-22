// import ContractType from "./contractType";
import * as variable from "../../variables/Variables";
import JSONPLACEHOLDERApi from "api/JSONPLACEHOLDERApi";
import {
  createPostData,
  convertDateToString,
  createAccountData,
  createHeader,
} from "util/ContructorCreation";
const { createSlice, createAsyncThunk } = require("@reduxjs/toolkit");

/**
 * * Có một chút khác biệt khi ta tạo async action,
 * * thay vì hồi trước slice mà ta tạo ra sẽ cho ta 2 biến là reducer và actions thì
 * * bây h ta ko để actions tổn ngổn vậy nữa mà sẽ export ra thằng cái async action nào cần luônluôn
 */

/**
 * * tham số đầu sẽ là param mà ta muốn pass vào cái hàm này
 * * cái tiếp theo là một thứ mà hàm 'createAsyncThunk' cung cấp cho phép ta đc dispatch những
 * * action ở các nơi khác để dùng trong hàm này: thunkAPI.dispatch()
 */
export const login = createAsyncThunk("login", async (params, thunkAPI) => {
  const result = await JSONPLACEHOLDERApi.login(params);
  return result;
});

const loginSlice = createSlice({
  name: "login",
  initialState: {
    token: "",
    notificationCount: 0,
    current: {},
    loading: false, // * trường này dùng để hiển thị pop up loading trong lúc dợi API trả về response
    success: false, // * trường này dùng để hiển thị pop up success nếu như gọi API thành công
    fail: false, //* trường này dùng để hiển thị pop up fail nếu như gọi API thất bại
    error: "",
    expiresTime: "",
    signInForm: [
      {
        row: {
          cols: [
            {
              elementType: variable.input,
              elementConfig: {
                name: variable.username,
                type: variable.text,
                labeltext: "User name",
                placeholder: "Username",
                value: "",
              },
              validation: [],
              valid: {},
            },
          ],
        },
      },
      {
        row: {
          cols: [
            {
              elementType: variable.input,
              elementConfig: {
                name: variable.password,
                type: variable.password,
                labeltext: "",
                placeholder: "Password",
                value: "",
              },
              validation: [],
              valid: {},
            },
          ],
        },
      },
    ],
  },
  reducers: {
    logOut: (state, action) => {
      console.log("Đã vào logout");
      state.token = "";
      localStorage.setItem("token", "");
    },

    //! 2 hàm dưới dùng để cho người dùng biết có bao nhiêu notfication đã đến và đã đc xử lí xong
    increaseNotificationCount: (state, action) => {
      state.notificationCount++;
    },
    decreaseNotificationCount: (state, action) => {
      state.notificationCount = state.notificationCount - action.payload;
    },
  },

  // ! Với kết quả trả về đều sẽ có 3 trường là meta,data và error, ta viết ở dưới này để coi sẽ phải làm những gì cho từng loại kêt quả
  extraReducers: {
    [login.pending]: (state) => {},
    [login.rejected]: (state, action) => {
      state.token = "";
    },
    [login.fulfilled]: (state, action) => {
      console.log("actioon: ", action.payload);
      state.token = action.payload.data.token;
      state.expiresTime = action.payload.data.expiresTime;
      localStorage.setItem("token", action.payload.data.token);
      // variable.token=action.payload.data.token;
    },
  },
});

const { reducer: loginReducer, actions } = loginSlice; //createSlice sẽ trả về cho ta 2 biến là reducer và action
export const {
  logOut,
  increaseNotificationCount,
  decreaseNotificationCount,
} = actions;
export default loginReducer;
