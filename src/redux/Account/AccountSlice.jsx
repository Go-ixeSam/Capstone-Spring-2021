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
export const getALL = createAsyncThunk(
  "account/getFakeAPI",
  async (params, thunkAPI) => {
    const result = await JSONPLACEHOLDERApi.getAll(null);
    return result;
  }
);

export const sharingDetail = createAsyncThunk(
  "account/sharingDetail",
  async (params, thunkAPI) => {
    const result = await JSONPLACEHOLDERApi.shareDetail(params);
    return result;
  }
);

/**
 * * api trả về thông tin của cây dựa trên tên
 */
export const getPlantInfo = createAsyncThunk(
  "account/getPlantInfo",
  async (params, thunkAPI) => {
    const result = await JSONPLACEHOLDERApi.getPlantInfo(params);
    return result;
  }
);
export const login = createAsyncThunk(
  "account/",
  async (params, thunkAPI) => {
    const result = await JSONPLACEHOLDERApi.getPlantInfo(params);
    return result;
  }
);


const account = createSlice({
  name: "account",
  initialState: {
    token:"",
    accountData: [
      //  createAccountData(1,"alive","Khá bảnh","samxxx@gmail.com","08/17/1998","Nam","02/23/2021","08081501"),
      //  createAccountData(2,"dead","Khong bảnh lắm","samxxx@gmail.com","02/17/1990","Nam","02/23/2021","08081501"),
      //  createAccountData(3,"alive","Okiem ","samxxx@gmail.com","01/17/1991","Nữ","02/23/2021","08081501"),
      createAccountData("1", "a live", "Khá bảnh", "02/23/2021","12","samxxx@gmail.com","08/17/1998","Nam","090242342"),
      createAccountData("2", "dead", "Khong bảnh lắm", "02/23/2021","23","samxxx@gmail.com","02/17/1990","Nam","042342334"),
      createAccountData("3", "alive", "Okiem ", "02/23/2021","5","samxxx@gmail.com","01/17/1991","Nữ","0774342234"),
    ],
    accountTableHeader: [
      createHeader("Người dùng", false, true, variable.userName),
      createHeader("Ngày tạo", false, true, variable.createDate),
      createHeader("Email", false, true, variable.email),
      createHeader("Ngày sinh", false, true, variable.birthDate),
      createHeader("Giới tính", false, true, variable.sex),
      createHeader("Trạng thái", false, true, variable.accoutStatus),
      createHeader("Số điện thoại", true, false, variable.phone),
      createHeader("Số lượng bài bị báo cáo", true, false, variable.numberOfReport),
    ],
    current: {},
    loading: false, // * trường này dùng để hiển thị pop up loading trong lúc dợi API trả về response
    success: false, // * trường này dùng để hiển thị pop up success nếu như gọi API thành công
    fail: false, //* trường này dùng để hiển thị pop up fail nếu như gọi API thất bại
    error: "",
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
    addContract: (state, action) => {
      /**
       * ! reduxtoolkit đã tích hợp sẵn bộ immer cho phép ta mutate state trực tiếp
       * * Ở trước giao diện ta viết mutate trực tiếp nhưng thật ra behind the sence
       * * immer vẫn sẽ clone ra một object mới và chỉnh sửa rồi return như ta hay làm
       * *
       */
      state.contracts.record.push(action.payload);
    },
    modifyContract: (state, action) => {
      state.contracts.record = action.payload;
    },
    ModifyContractFomr: (state, action) => {
      state.contractForm = action.payload;
    },
  },

  // ! Với kết quả trả về đều sẽ có 3 trường là meta,data và error, ta viết ở dưới này để coi sẽ phải làm những gì cho từng loại kêt quả
  extraReducers: {
    [getALL.pending]: (state) => {
      state.loading = true;
      state.success = false;
      state.fail = false;
    },
    [getALL.rejected]: (state, action) => {
      // * Thực hiện hành động gì đó ở store khi kết quả trả về không có dữ liệu như mong muốn
      state.error = action.error;
      state.loading = false;
      state.success = true;
      state.fail = false;
      state.current = action.payload;
    },
    [getALL.fulfilled]: (state, action) => {
      // * Thực hiện hành động gì dó ở store khi kết quả có dữ liệu trả về thành công
      state.loading = false;
      state.success = true;
      state.fail = false;
      state.current = action.payload;
    },
    [getPlantInfo.pending]: (state) => {},
    [getPlantInfo.rejected]: (state, action) => {},
    [getPlantInfo.fulfilled]: (state, action) => {},
  },
});

const { reducer: accountReducer, actions } = account; //createSlice sẽ trả về cho ta 2 biến là reducer và action
export const { addContract, modifyContract, ModifyContractFomr } = actions;
export default accountReducer;
