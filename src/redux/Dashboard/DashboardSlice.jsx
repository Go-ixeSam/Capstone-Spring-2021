import JSONPLACEHOLDERApi from "api/JSONPLACEHOLDERApi";
import * as variable from "../../variables/Variables";
const { createSlice, createAsyncThunk } = require("@reduxjs/toolkit");

export const getDashboard = createAsyncThunk(
  "dashboard/getDashboard",
  async (params, thunkAPI) => {
    const result = await JSONPLACEHOLDERApi.getDashboard(null);
    return result;
  }
);
export const getTop10 = createAsyncThunk(
  "dashboard/getTop10",
  async (params, thunkAPI) => {
    const result = await JSONPLACEHOLDERApi.getTop10(params);
    return result;
  }
);
export const getShareAndExchangeCompare = createAsyncThunk(
  "dashboard/getShareAndExchangeCompare",
  async (params, thunkAPI) => {
    const result = await JSONPLACEHOLDERApi.getShareAndExchangeCompare(params);
    return result;
  }
);

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

const dashboardSlice = createSlice({
  name: "dashboard",
  initialState: {
    loading: false, // * trường này dùng để hiển thị pop up loading trong lúc dợi API trả về response
    success: false, // * trường này dùng để hiển thị pop up success nếu như gọi API thành công
    fail: false, //* trường này dùng để hiển thị pop up fail nếu như gọi API thất bại
    result: [],
    error: "",
    updateDashboard: [
      {
        row: {
          cols: [
            {
              elementType: variable.input,
              elementConfig: {
                name: "updateTime",
                type: variable.select,
                labeltext: "Thời gian xem báo cáo",
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
  reducers: {},

  // ! Với kết quả trả về đều sẽ có 3 trường là meta,data và error, ta viết ở dưới này để coi sẽ phải làm những gì cho từng loại kêt quả
  extraReducers: {
    [getDashboard.fulfilled]: (state, action) => {
      state.result = action.payload;
    },
    [getDashboard.rejected]: (state) => {
      console.log("Dashboard lấy về ko thành công");
    },
    [getDashboard.pending]: (state) => {
      console.log("Dashboard đang pending");
    },
  },
});

const { reducer: dashboardReducer, actions } = dashboardSlice; //createSlice sẽ trả về cho ta 2 biến là reducer và action
export const {} = actions;
export default dashboardReducer;
