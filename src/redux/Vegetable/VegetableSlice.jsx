// import ContractType from "./contractType";
// import * as variable from "../../variables/Variables";
import JSONPLACEHOLDERApi from "api/JSONPLACEHOLDERApi";
import garden from "assets/img/garden.jpg";
import richasdo from "assets/img/richasdo.jpg";
import vegetable from "assets/img/vegetable_web_admin.jpg";
import {
  createHeader,

  createReportedPostData,
  createVegetableData
} from "util/ContructorCreation";
import * as variable from "variables/Variables";

const { createSlice, createAsyncThunk } = require("@reduxjs/toolkit");
//* Ham de chap thuan nhung rau co thong tin chinh xac
export const isAccept = createAsyncThunk(
  "vegetable/isAccept",
  async (params, thunkAPI) => {
    const result = await JSONPLACEHOLDERApi.isAccept(params);
    return result;
  }
);
export const getAllVegetableUnapproved = createAsyncThunk(
  "vegetable/getAllVegetableUnapproved",
  async (params, thunkAPI) => {
    const result = await JSONPLACEHOLDERApi.getAllVegetableUnapproved(null);
    return result;
  }
);

const post = createSlice({
  name: "post",
  initialState: {
    selectedAccountId: 0,
    [variable.advanceTableData]: [
      createVegetableData(
        "Khổ qua",
        "1",
        "Kích thích ăn uống, tiêu viêm, thoái nhiệt: Mướp đắng giúp kiện tỳ khai vị (kích thích chức năng tiêu hóa); Alkaloid trong mướp đắng có công hiệu lợi niệu hoạt huyết (lợi tiểu, máu lưu thông); tiêu viêm thoái nhiệt (chống viêm, hạ sốt); thanh tâm minh mục (mát tim sáng mắt). Phòng chống ung thư: Thành phần protein và nhiều lượng vitamin C trong mướp đắng giúp nâng cao chức năng miễn dịch của cơ thể, làm cho tế bào miễn dịch có tác dụng tiêu diệt tế bào ung thư; Nước cốt mướp đắng chứa thành phần protein tựa như hoạt chất Alkaloid, giúp tăng cường chức năng nuốt của các thực bào. Giảm thấp đường huyết: Nước cốt mướp đắng tươi, có tác dụng hạ đường huyết tốt, là món ăn lý tưởng cho người bệnh tiểu đường. Nước tắm cho trẻ em nhiều rôm sảy: Mướp đắng 2 - 3 quả. Rửa sạch, bổ làm đôi, nấu với nước, lấy nước tắm cho trẻ. Ngày làm 1 lần. Chữa ho: Mướp đắng 1 - 2 quả. Rửa sạch, bổ làm đôi, nấu với nước, lấy nước uống trong ngày. Chữa thấp khớp: Lá mướp đắng 8g, dây đau xương sao 8g, cây xấu hổ 8g, rễ nhàu 8g, cỏ xước 8g, cây vòi voi sao 8g, cối xay 8g, rễ ngũ trảo 5g, dây thần thông 5g, quế chi 4g, gừng tươi 3g. Sắc uống ngày 1 thang. Nước sắc khổ qua: Khổ qua 1 - 2 quả, tách bỏ ruột, thái lát, sắc lấy nước cho uống. Dùng cho các trường hợp tiểu đường, sốt cao mất nước, miệng khô, họng khát. Nước chiết khổ qua ướp đường: Khổ qua tươi 1 - 2 quả. Khổ qua rửa sạch, nghiền nát nhuyễn, cho thêm 100g đường trắng trộn khuấy đều để sau 2 giờ đem khuấy nước sôi nguội và lọc lấy nước cho uống 1 lần. Dùng cho chứng nhiệt lỵ. Khổ qua xào đậu phụ: Khổ qua 150g, đậu phụ 100g. Khổ qua rửa sạch, bỏ ruột thái lát, dùng dầu xào to lửa cho chín tái, cho đậu phụ thái lát và ít muối gia vị, tiếp tục xào to lửa cho chín đều. Cho ăn ngày 1 lần. Dùng thường ngày cho bệnh nhân tiểu đường. Khổ qua xào thịt nạc: cách làm tương tự như trên, thay đậu phụ bằng thịt lợn nạc. Dùng cho các trường hợp chảy máu cam, tiểu đường, đau mắt đỏ... Khổ qua xào cà rốt: Khổ qua 60g, cà rốt 60g, thêm hành tiêu gia vị xào với lửa to. Ăn ngày 2 lần. Dùng cho các trường hợp tiêu chảy, đặc biệt là ở trẻ nhỏ với liều bằng nửa của người lớn. Thịt nạc hầm khổ qua củ cải: Khổ qua 250g - 500g, thịt lợn nạc 125g - 250g, củ cải 100g - 200g. Khổ qua rửa sạch thái lát, thịt lợn nạc thái miếng, củ cải thái miếng; hầm với nước; khi đã chín thêm gia vị. Cho ăn ngày 1 lần, liên tục 20 ngày. Dùng cho các bệnh nhân viêm họng mạn tính, đau rát họng, ho khan, viêm nề hoặc viêm teo niêm mạc họng. Khổ qua xào bột tề: Khổ qua 60g, bột củ năn 60g. Khổ qua bỏ ruột thái lát, bột tề (củ năn) bóc vỏ thái lát. Cho dầu vừng hoặc dầu thực vật xào to lửa, thêm gia vị. Cho ăn ngày 1 - 2 lần. Dùng cho các trường hợp viêm loét niêm mạc môi miệng, viêm lưỡi và họng hầu. Ăn và nhai nuốt đều đau, sốt nóng.\n",
        "Mướp đắng hay Khổ qua là một cây leo mọc ở vùng nhiệt đới và cận nhiệt đới thuộc họ Bầu bí, có quả ăn được, thuộc loại đắng nhất trong các loại rau quả",
        "http://54.179.74.214:8080/Image//khoqua215417403.jpg"
      ),
      createVegetableData(
        "Gừng",
        "2",
        "làm đẹp",
        "Không có gì để nói lắm",
        "http://54.179.74.214:8080/Image//gung210225043.jpg"
      ),
      createVegetableData(
        "Cải trắng",
        "3",
        "làm đẹp",
        "Không có gì để nói lắm",
        "http://54.179.74.214:8080/Image//caitrang211204445.jpg"
      ),
      createVegetableData(
        "Ngô",
        "4",
        "làm đẹp",
        "Không có gì để nói lắm",
        "http://54.179.74.214:8080/Image//caybap215703538.jpg"
      ),
    ],

    reportedPosts: [
      {
        accountID: "1",
        posts: [
          createReportedPostData(
            "1",
            "22/01/2012",
            garden,
            "123",
            "34",
            "ooi con tim toi",
            "Rau của cải"
          ),
          createReportedPostData(
            "2",
            "22/01/2012",
            vegetable,
            "33",
            "23",
            "Di tren con duong dai mau xanh",
            "Rau cần tây"
          ),
          createReportedPostData(
            "3",
            "23/02/2012",
            richasdo,
            "13",
            "54",
            "Hét trên con đò xanh",
            "Rau mồng"
          ),
        ],
      },
      {
        accountID: "2",
        posts: [
          createReportedPostData(
            "1",
            "23/01/2012",
            garden,
            "123",
            "34",
            "ooi con tim toi",
            "Rau của cải"
          ),
          createReportedPostData(
            "2",
            "19/01/2012",
            vegetable,
            "33",
            "23",
            "Di tren con duong dai mau xanh",
            "Rau cần tây"
          ),
          createReportedPostData(
            "3",
            "11/02/2012",
            richasdo,
            "13",
            "54",
            "Hét trên con đò xanh",
            "Rau mồng"
          ),
        ],
      },
      {
        accountID: "3",
        posts: [
          createReportedPostData(
            "1",
            "23/01/2012",
            garden,
            "123",
            "34",
            "ooi con tim toi",
            "Rau của cải"
          ),
          createReportedPostData(
            "2",
            "23/01/2012",
            vegetable,
            "33",
            "23",
            "Di tren con duong dai mau xanh",
            "Rau cần tây"
          ),
          createReportedPostData(
            "3",
            "23/02/2012",
            richasdo,
            "13",
            "54",
            "Hét trên con đò xanh",
            "Rau mồng"
          ),
        ],
      },
    ],
    tableHeader: [
      createHeader("Ảnh đại diện", false, false, [variable.vegetableImage]),
      createHeader("Tên", false, false, [variable.vegetableName]),
      createHeader("Công dụng", false, true, [variable.uses]),
      createHeader("Mô tả", false, true, [variable.description]),
    ],
    isAcceptCurrent: {},
    getAllVegetableUnapprovedCurrent: {},
    loading: true, // true am chi pending dan dien ra
    error: "",
    userPostVisible: false,
    selectedItem:[]
  },
  reducers: {
    setVisible: (state, action) => {
      state.userPostVisible = action.payload;
    },
    setSelectedAccountID: (state, action) => {
      state.selectedAccountId = action.payload;
    },
    setSelectedItem: (state, action) => {
      state.selectedItem=action.payload
    },
  },

  extraReducers: {
    [isAccept.pending]: (state) => {
    },
    [getAllVegetableUnapproved.pending]: (state) => {
      state.loading = true;
    },
    [isAccept.rejected]: (state, action) => {
      state.error = action.error;
    },
    [getAllVegetableUnapproved.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.error;
    },
    [isAccept.fulfilled]: (state, action) => {
      state.isAcceptCurrent = action.payload;
    },
    [getAllVegetableUnapproved.fulfilled]: (state, action) => {
      state.getAllVegetableUnapprovedCurrent = action.payload.data;
      state.loading = false;
    },
  },
});

const { reducer: postReducer, actions } = post; //createSlice sẽ trả về cho ta 2 biến là reducer và action
export const { setVisible, setSelectedAccountID,setSelectedItem } = actions;
export default postReducer;
