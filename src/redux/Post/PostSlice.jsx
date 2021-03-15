// import ContractType from "./contractType";
// import * as variable from "../../variables/Variables";
import JSONPLACEHOLDERApi from "api/JSONPLACEHOLDERApi";
import {
  createPostData,
  convertDateToString,
  createHeader,
} from "util/ContructorCreation";
import * as variable from "variables/Variables";

const { createSlice, createAsyncThunk } = require("@reduxjs/toolkit");
const currentDate = new Date();
/**
 * * Hàm có mục đích cho việc test
 * ! trả về ngày tiếp theo
 */
function getNextDate(currentDate) {
  return currentDate.setDate(new Date().getDate() + 1);
}

function createDateForTest() {
  // var currentDate = new Date();
  var data = [];
  for (var i = 0; i >= 5; i++) {
    data.push(createPostData(i, "sam", currentDate, 3, 12));
    currentDate = getNextDate(currentDate);
  }
  return data;
}

const post = createSlice({
  name: "post",
  initialState: {
    [variable.advanceTableData]: [
      createPostData("sam", "03/05/2021", 1, 3, 14),
      createPostData("sam", "07/06/2021", 2, 5, 24),
      createPostData("sam", "12/23/2021", 3, 7, 4),
      createPostData("sam", "02/19/2021", 4, 12, 3),
    ],
    tableHeader: [
      createHeader("Creator", false, true, [variable.creator]),
      createHeader("Date submitted", false, true, [variable.dateSubmitted]),
      createHeader("ID", true, false, [variable.id]),
      createHeader("Report", true, false, [variable.reportCount]),
      createHeader("Negative commend", true, false, [
        variable.negativeCommendCount,
      ]),
    ],
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
