// import ContractType from "./contractType";
import * as variable from "../../variables/Variables";
const { createSlice } = require("@reduxjs/toolkit");

function createData(id, name, calories, fat, carbs, protein, isLock) {
  return {
    [variable.id]: id,
    [variable.name]: name,
    [variable.calories]: calories,
    [variable.fat]: fat,
    [variable.carbs]: carbs,
    [variable.protein]: protein,
    [variable.islock]: isLock,
  };
}

const trip = createSlice({
  name: "trip",
  initialState: {
    searchValue: "",
    searchAdvanceData: [],
    advanceTableData: [
      {
        [variable.id]: 1,
        [variable.name]: "Donut",
        [variable.calories]: 452,
        [variable.fat]: 25.0,
        [variable.carbs]: 51,
        [variable.protein]: 4.9,
        [variable.islock]: 1,
      },
      createData(2, "Eclair", 262, 16.0, 24, 6.0, 0),
      createData(3, "Frozen yoghurt", 159, 6.0, 24, 4.0, 1),
      createData(4, "Gingerbread", 356, 16.0, 49, 3.9, 0),
      // createData("Honeycomb", 408, 3.2, 87, 6.5),
      // createData("Ice cream sandwich", 237, 9.0, 37, 4.3),
      // createData("Jelly Bean", 375, 0.0, 94, 0.0),
      // createData("KitKat", 518, 26.0, 65, 7.0),
      // createData("Lollipop", 392, 0.2, 98, 0.0),
      // createData("Marshmallow", 318, 0, 81, 2.0),
      // createData("Nougat", 360, 19.0, 9, 37.0),
      // createData("Oreo", 437, 18.0, 63, 4.0),
    ],
    advanceTableDataSelected: [],
    tripSelectedID: "",
    tripData: {
      tableHeader: [
        { [variable.id]: 0, value: variable.overview },
        { [variable.id]: 1, value: variable.contracts },
      ],
      tableBody: {
        record: [
          {
            [variable.contractCode]: "00002502",
            [variable.customerName]: "Nguyễn Van C",
            [variable.customerPhone]: "0776608663",
            [variable.startingLocation]: "Hồ Chí Minh",
            [variable.destination]: "Thanh Hoá",
            [variable.orderDetailResponseModel]: [
              {
                [variable.cargoVolume]: 3,
                [variable.driverId]: "34e41037-058d-4c32-9e25-1a9920236251",
                [variable.driverName]: "Nguyen Khac Sam",
                [variable.licensePlate]: "59C1-58494",
                [variable.weight]: 4,
                [variable.orderId]: null,
              },
              {
                [variable.cargoVolume]: 1,
                driverId: "34e41037-058d-4c32-9e25-1a9920236251",
                driverName: "Nguyen Khac Sam",
                licensePlate: "59C1-58494",
                [variable.weight]: 1,
                orderId: "eeac6e9e-1f77-4ef3-8bbe-e9569e515201",
              },
              {
                [variable.cargoVolume]: 3,
                driverId: "96f46c3e-5d8f-4455-a0d5-5d1fbb236fed",
                driverName: "Nguyen Phuoc",
                licensePlate: "59C1-32432",
                [variable.weight]: 4,
                orderId: null,
              },
              {
                [variable.cargoVolume]: 1,
                driverId: "96f46c3e-5d8f-4455-a0d5-5d1fbb236fed",
                driverName: "Nguyen Phuoc",
                licensePlate: "59C1-32432",
                [variable.weight]: 1,
                orderId: "897cd796-2a6e-41b4-9d0b-f0889815bcf2",
              },
            ],
          },
          {
            [variable.contractCode]: "00002503",
            [variable.customerName]: "Nguyễn Khắc Sâm",
            [variable.customerPhone]: "0776608663",
            [variable.startingLocation]: "Hồ Chí Minh",
            [variable.destination]: "Nghệ An",
            [variable.orderDetailResponseModel]: [
              {
                [variable.cargoVolume]: 3,
                [variable.driverId]: "34e41037-058d-4c32-9e25-1a9920236251",
                [variable.driverName]: "Nguyen Khac Sam",
                [variable.licensePlate]: "59C1-58494",
                [variable.weight]: 4,
                [variable.orderId]: null,
              },
              {
                [variable.cargoVolume]: 1,
                driverId: "34e41037-058d-4c32-9e25-1a9920236251",
                driverName: "Nguyen Khac Sam",
                licensePlate: "59C1-58494",
                [variable.weight]: 1,
                orderId: "eeac6e9e-1f77-4ef3-8bbe-e9569e515201",
              },
              {
                [variable.cargoVolume]: 3,
                driverId: "96f46c3e-5d8f-4455-a0d5-5d1fbb236fed",
                driverName: "Nguyen Phuoc",
                licensePlate: "59C1-32432",
                [variable.weight]: 4,
                orderId: null,
              },
              {
                [variable.cargoVolume]: 1,
                driverId: "96f46c3e-5d8f-4455-a0d5-5d1fbb236fed",
                driverName: "Nguyen Phuoc",
                licensePlate: "59C1-32432",
                [variable.weight]: 1,
                orderId: "897cd796-2a6e-41b4-9d0b-f0889815bcf2",
              },
            ],
          },
        ],
      },
    },
    tripDetail: {
      tabsHeader: [
        { [variable.id]: 0, value: variable.overview },
        { [variable.id]: 1, value: variable.contracts },
      ],
      tabBody: {},
    },
    /**
     * * id dùng để phân biệt với nhau
     * * numeric dùng để phân loại kiểu giá trị để tiện sort
     * * disablePadding nếu là true thì nó nhích về bên trái so với mặc định
     * * label sẽ là giá trị của từng header cell
     */
    materialHeader: [
      {
        id: "name",
        numeric: false,
        disablePadding: true,
        label: [variable.name],
      },
      {
        id: "calories",
        numeric: true,
        disablePadding: false,
        label: [variable.calories],
      },
      {
        id: "fat",
        numeric: true,
        disablePadding: false,
        label: [variable.fat],
      },
      {
        id: "carbs",
        numeric: true,
        disablePadding: false,
        label: [variable.carbs],
      },
      {
        id: "protein",
        numeric: true,
        disablePadding: false,
        label: [variable.protein],
      },
    ],
  },
  reducers: {
    setTrip: (state, action) => {
      const clone = action.payload;
      return {
        ...state,
        advanceTableData: [...clone],
      };
    },
    addTrip: (state, action) => {
      state.tripData.tableBody.record.push(action.payload);
    },
    setTripDetail: (state, action) => {
      state.tripDetail.tabBody = action.payload;
    },
    setSelectedTripID: (state, action) => {
      state.tripSelectedID = action.payload;
    },
    setSelectedAdvanceRecord: (state, action) => {
      state.advanceTableDataSelected = action.payload;
    },
    getLocked: (state, action) => {
      let id = action.payload;
      let clone = [...state.advanceTableData];
      clone.map((obj) => {
        if (obj[variable.id] == id) {
          if (obj[variable.islock] == 1) {
            obj.isLock = 0;
          } else {
            obj.isLock = 1;
          }
        }
      });
      state.advanceTableData = [...clone];
    },
    removeAdvanceRecordSelected: (state, action) => {
      let advanceTableDataSelected = action.payload;
      advanceTableDataSelected.map((selected) => {
        state.advanceTableData = state.advanceTableData.filter((record) => {
          return record.name != selected;
        });
      });
      console.log("array moi: ", state.advanceTableData);
    },
    setSearchValue: (state, action) => {
      state.searchValue = action.payload;
    },
    setAdvanceSearchData: (state, action) => {
      state.searchAdvanceData = state.advanceTableData.filter((record) =>
        record.name.includes(action.payload)
      );
    },
    getDataByNameSearch: (state, action) => {
      state.searchAdvanceData.filter((record) =>
        record.name.includes(action.payload)
      );
    },
  },
});

const { reducer, actions } = trip; //createSlice sẽ trả về cho ta 2 biến là reducer và action
export const {
  addTrip,
  setTrip,
  setTripDetail,
  setSelectedTripID,
  setSelectedAdvanceRecord,
  removeAdvanceRecordSelected,
  setSearchValue,
  setAdvanceSearchData,
  getLocked,
  getDataByNameSearch,
} = actions;
export default reducer;
