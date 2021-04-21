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

//* Hàm dùng để cập nhật ngưỡng báo cáo
export const updatePercentThreshold = createAsyncThunk(
  "PrecentReport/put",
  async (params, thunkAPI) => {
    const result = await JSONPLACEHOLDERApi.editPrecentReport(params);
    return result;
  }
);

//* Hàm dùng để load các ngưỡng báo cáo
export const getAllPercentReport = createAsyncThunk(
  "PrecentReport/GetAll",
  async (params, thunkAPI) => {
    const result = await JSONPLACEHOLDERApi.getAllPercent(null);
    return result;
  }
);

const systemConfig = createSlice({
  name: "systemConfig",
  initialState: {
    percentResult: [
      {
        id: 1,
        name: "Phần trăm số lượng account",
        precent: 40,
      },
      {
        id: 2,
        name: "Phần trăm số lượng bài Post",
        precent: 30,
      },
    ],
    loading: false, // * trường này dùng để hiển thị pop up loading trong lúc dợi API trả về response
    success: false, // * trường này dùng để hiển thị pop up success nếu như gọi API thành công
    fail: false, //* trường này dùng để hiển thị pop up fail nếu như gọi API thất bại
    error: "",
    selectedId: "",
    percent: "",
    percentNames: [],
    systemConfigForm: [
      {
        row: {
          cols: [
            {
              elementType: variable.select, // Loại input
              elementConfig: {
                name: variable.percentName,
                type: variable.select,
                labeltext: "Loại ngưỡng báo cáo",
                options: [],
                value: "",
              },
            },
            // {
            //   elementType: variable.input,
            //   elementConfig: {
            //     name: variable.percent,
            //     type: variable.text,
            //     labeltext: "Phần trăm báo cáo",
            //     value: "",
            //   },
            // },
          ],
        },
      },
    ],
  },
  reducers: {
    //   ! Hàm dùng để đưa các lựa chọn về loại percent vào form
    addPercentReportName: (state, action) => {
      //* Cái phần commend này là dùng để lấy từ API
      state.systemConfigForm[0].row.cols[0].elementConfig.options =action.payload;
      let arra = [];
      state.systemConfigForm[0].row.cols[0].elementConfig.options.map(
        (percent) => {
          arra.push({ key: percent.name, value: percent.id });
        }
      );
      state.percentNames = arra;
    },

    //* Hàm này dùng để lấy ra cái percent đúng với cái ID
    getPercentById: (state, action) => {
      state.systemConfigForm[0].row.cols[0].elementConfig.options.map((item) => {
        if (action.payload == item.id) {
          state.percent = item.precent;
        }
      });
    },
  },

  // ! Với kết quả trả về đều sẽ có 3 trường là meta,data và error, ta viết ở dưới này để coi sẽ phải làm những gì cho từng loại kêt quả
  extraReducers: {
    [getAllPercentReport.pending]: (state) => {
      state.loading = true;
    },
    [getAllPercentReport.rejected]: (state, action) => {
      state.error = action.error;
      state.loading = false;
    },
    [getAllPercentReport.fulfilled]: (state, action) => {
      state.percentResult = action.payload;
      state.loading = false;
    },
    [updatePercentThreshold.pending]: (state) => {
      state.loading = true;
    },
    [updatePercentThreshold.rejected]: (state, action) => {
      state.error = action.error;
      state.loading = false;
    },
    [updatePercentThreshold.fulfilled]: (state, action) => {
      state.percentResult = action.payload;
      state.loading = false;
    },
  },
});

const { reducer: systemConfigReducer, actions } = systemConfig; //createSlice sẽ trả về cho ta 2 biến là reducer và action
export const { addPercentReportName, getPercentById } = actions;
export default systemConfigReducer;
