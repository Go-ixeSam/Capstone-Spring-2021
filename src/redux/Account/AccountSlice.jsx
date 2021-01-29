// import ContractType from "./contractType";
import * as variable from "../../variables/Variables";
import JSONPLACEHOLDERApi from "api/JSONPLACEHOLDERApi";

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

const account = createSlice({
  name: "account",
  initialState: {
    current: {},
    loadingL: false,
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
    [getALL.pending]: (state) => {},
    [getALL.rejected]: (state, action) => {
      // * Thực hiện hành động gì đó ở store khi kết quả trả về không có dữ liệu như mong muốn
      state.error = action.error;
      state.current = action.payload;
    },
    [getALL.fulfilled]: (state, action) => {
      // * Thực hiện hành động gì dó ở store khi kết quả có dữ liệu trả về thành công
      state.current = action.payload;
    },
  },
});

const { reducer: accountReducer, actions } = account; //createSlice sẽ trả về cho ta 2 biến là reducer và action
export const { addContract, modifyContract, ModifyContractFomr } = actions;
export default accountReducer;
