// import ContractType from "./contractType";
import * as variable from "../../variables/Variables";
import JSONPLACEHOLDERApi from "api/JSONPLACEHOLDERApi";

const { createSlice, createAsyncThunk } = require("@reduxjs/toolkit");

const post = createSlice({
  name: "firebase",
  initialState: {
    firebaseData: [],
  },
  reducers: {
    addObject: (state, action) => {
      action.payload.forEach((element) => {
        let result = state.firebaseData.find(
          (obj) => obj.userId == element.userId
        );
        if (!result) {
          state.firebaseData.push(element);
        }
      });
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

const { reducer: firebaseReducer, actions } = post; //createSlice sẽ trả về cho ta 2 biến là reducer và action
export const { addObject } = actions;
export default firebaseReducer;
