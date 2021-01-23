// import ContractType from "./contractType";
import * as variable from "../../variables/Variables";
import JSONPLACEHOLDERApi from "api/JSONPLACEHOLDERApi";

const { createSlice, createAsyncThunk } = require("@reduxjs/toolkit");

const post = createSlice({
  name: "post",
  initialState: {
    current: {},
    loadingL: false,
    error: "",
    userPostVisible: false,
  },
  reducers: {
    setVisible: (state, action) => {
      state.userPostVisible = action.payload;
    },
  },
//   extraReducers: {
//     [getALL.pending]: (state) => {},
//     [getALL.rejected]: (state, action) => {
//       state.error = action.error;
//     },
//     [getALL.fulfilled]: (state, action) => {
//       state.current = action.payload;
//     },
//   },
});

const { reducer: postReducer, actions } = post; //createSlice sẽ trả về cho ta 2 biến là reducer và action
export const { setVisible } = actions;
export default postReducer;
