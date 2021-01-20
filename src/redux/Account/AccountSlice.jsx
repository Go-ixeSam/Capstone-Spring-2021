// import ContractType from "./contractType";
import * as variable from "../../variables/Variables";
const { createSlice } = require("@reduxjs/toolkit");

// import {createSlice} from '@reduxjs/toolkit'
const contract = createSlice({
  name: "contracts",
  initialState: {
    contracts: {
      detail: "none",
      record: [
        // {
        //   [variable.id]: 1,
        //   [variable.startingLocation]: "44 duong 12",
        //   [variable.starttingWard]: variable.phuong2,
        //   [variable.startingLocation]: quan1,
        //   [variable.destination]: "55 dường 66",
        //   [variable.destinationWard]: variable.phuong1,
        //   [variable.destinationDistrict]: quan3,
        //   [variable.cargoVolume]: 8.5,
        //   [variable.check]: false,
        //   [variable.time]: new Date().toString(),
        // },
        // {
        //   [variable.id]: 2,
        //   [variable.startingLocation]: "Vin Phuc",
        //   [variable.starttingWard]: variable.phuong1,
        //   [variable.starttingDistrict]: quan2,
        //   [variable.destination]: "Hoho",
        //   [variable.destinationWard]: variable.phuong2,
        //   [variable.destinationDistrict]: quan2,
        //   [variable.cargoVolume]: 12.5,
        //   [variable.check]: false,
        //   [variable.time]: new Date().toString(),
        // },
        {
          [variable.startingLocation]: "Ho Chí Minh",
          [variable.destination]: "Hà Noi",
          [variable.customerName]: "Nguyen Van A",
          [variable.customerPhone]: "0906585391",
          [variable.contractCode]: "00002500",
          [variable.cargoType]: "Dua h?u",
          [variable.cargoVolume]: 1,
          [variable.status]: 0,
          [variable.departureDate]: "2020-11-16",
          [variable.finishedDate]: "2020-11-21",
        },
        // {
        //   [variable.startingLocation]: "Ho Chí Minh",
        //   [variable.destination]: "Vinh",
        //   [variable.customerName]: "Nguyen Van B",
        //   [variable.customerPhone]: "0905178097",
        //   [variable.contractCode]: "00002501",
        //   [variable.cargoType]: "Dua hau",
        //   [variable.cargoVolume]: 2,
        //   [variable.status]: 0,
        //   [variable.departureDate]: "2020-11-16",
        //   [variable.finishedDate]: "2020-11-21",
        // },
      ],
    },
    contractForm: [
      {
        row: {
          cols: [
            {
              colNumber: 4,
              elementType: variable.input,
              elementConfig: {
                name: variable.startingLocation,
                type: variable.text,
                labeltext: "Starting Location",
                placeholder: "44 duong so 99",
                // disabled: true,
                value: "",
              },
              validation: [],
              valid: {},
              // valid: { type: variable.success, errorMessage: "" },
            },
            // {
            //   colNumber: 3,
            //   elementType: variable.select,
            //   elementConfig: {
            //     name: variable.starttingWard,
            //     labeltext: "Ward",
            //     options: [
            //       {
            //         [variable.value]: variable.chose,
            //         [variable.key]: "Chose your...",
            //       },
            //       {
            //         [variable.value]: variable.phuong1,
            //         [variable.key]: "Phường 1",
            //       },
            //       {
            //         [variable.value]: variable.phuong2,
            //         [variable.key]: "Phường 2",
            //       },
            //       {
            //         [variable.value]: variable.phuong3,
            //         [variable.key]: "Phường 3",
            //       },
            //     ],
            //   },
            // },

            // {
            //   colNumber: 3,
            //   elementType: variable.select,
            //   elementConfig: {
            //     name: variable.starttingDistrict,
            //     labeltext: "District",
            //     options: [
            //       { id: "1", value: variable.quan1, displayValue: "Quận 1" },
            //       {
            //         id: "2",
            //         value: variable.quan2,
            //         displayValue: "Quận 2",
            //       },
            //       {
            //         id: "3",
            //         value: variable.quan3,
            //         displayValue: "Quận 3",
            //       },
            //     ],
            //     value: variable.quan1,
            //   },
            //   validation: [variable.none],
            //   valid: { type: variable.success, errorMessage: "" },
            // },
          ],
        },
      },
      {
        row: {
          cols: [
            {
              colNumber: 12,
              elementType: variable.radiobutton,
              elementConfig: {
                name: variable.starttingDistrict,
                labeltext: "District",
                options: [
                  {
                    [variable.value]: variable.quan1,
                    [variable.key]: "Quan 1",
                  },
                  {
                    [variable.value]: variable.quan2,
                    [variable.key]: "Quan 2",
                  },
                  {
                    [variable.value]: variable.quan3,
                    [variable.key]: "Quan 3",
                  },
                ],
                // value: variable.phuong1,
              },
              // validation: [variable.none],
              // valid: { type: variable.success, errorMessage: "" },
            },
          ],
        },
      },
      {
        row: {
          cols: [
            {
              colNumber: 12,
              elementType: variable.checkboxgroup,
              elementConfig: {
                name: variable.starttingWard,
                labeltext: "Ward",
                options: [
                  {
                    [variable.value]: variable.phuong1,
                    [variable.key]: "Phuong 1",
                  },
                  {
                    [variable.value]: variable.phuong2,
                    [variable.key]: "Phuong 2",
                  },
                  {
                    [variable.value]: variable.phuong3,
                    [variable.key]: "Phuong 3",
                  },
                ],
                // value: variable.phuong1,
              },
              // validation: [variable.none],
              // valid: { type: variable.success, errorMessage: "" },
            },
          ],
        },
      },
      {
        row: {
          cols: [
            {
              colNumber: 4,
              elementType: variable.input,
              elementConfig: {
                name: variable.destination,
                type: variable.text,
                labeltext: "Destination",
                placeholder: "44 duong so 9",
                value: "",
              },
              validation: [variable.required],
              valid: {},
            },
            // {
            //   colNumber: 3,
            //   elementType: variable.select,
            //   elementConfig: {
            //     name: variable.destinationWard,
            //     labeltext: "Ward",
            //     options: [
            //       { id: "1", value: variable.phuong1, displayValue: "Phường 1" },
            //       {
            //         id: "2",
            //         value: variable.phuong2,
            //         displayValue: "Phường 2",
            //       },
            //       {
            //         id: "3",
            //         value: variable.phuong3,
            //         displayValue: "Phường 3",
            //       },
            //     ],
            //     value: variable.phuong1,
            //   },
            //   validation: [variable.none],
            //   valid: { type: variable.success, errorMessage: "" },
            // },
            // {
            //   colNumber: 3,
            //   elementType: variable.select,
            //   elementConfig: {
            //     name: variable.destinationDistrict,
            //     labeltext: "District",
            //     options: [
            //       { id: "1", value: quan1, displayValue: "Quận 1" },
            //       {
            //         id: "2",
            //         value: quan2,
            //         displayValue: "Quận 2",
            //       },
            //       {
            //         id: "3",
            //         value: quan3,
            //         displayValue: "Quận 3",
            //       },
            //     ],
            //     value: variable.quan1,
            //   },
            //   validation: [variable.none],
            //   valid: { type: variable.success, errorMessage: "" },
            // },
          ],
        },
      },

      /**
       * ? Ket thuc o day
       */
      // {
      //   row: {
      //     cols: [
      //       {
      //         colNumber: 4,
      //         elementType: variable.input,
      //         elementConfig: {
      //           name: variable.customerName,
      //           type: variable.text,
      //           labeltext: "Customer Name",
      //           placeholder: "",
      //           // value: "",
      //         },
      //         validation: [variable.required],
      //         valid: {},
      //       },
      //       {
      //         colNumber: 3,
      //         elementType: variable.input,
      //         elementConfig: {
      //           name: variable.customerPhone,
      //           type: variable.text,
      //           labeltext: "Customer phone",
      //           placeholder: "",
      //           // value: "",
      //         },
      //         validation: [variable.required],
      //         valid: {},
      //       },
      //       {
      //         colNumber: 2,
      //         elementType: "input",
      //         elementConfig: {
      //           name: variable.cargoVolume,
      //           type: "number",
      //           labeltext: "Cargo volume",
      //           placeholder: "0",
      //           // value: "",
      //         },
      //         validation: [variable.required, variable.positiveNumber],
      //         valid: {},
      //       },
      //       {
      //         colNumber: 2,
      //         elementType: "input",
      //         elementConfig: {
      //           name: variable.cargoType,
      //           type: "text",
      //           labeltext: "Cargo Type",
      //           placeholder: "",
      //           // value: "",
      //         },
      //         validation: [variable.required, variable.positiveNumber],
      //         valid: {},
      //       },
      //     ],
      //   },
      // },
      /**
       * ? ket thuc o day
       */

      /**
       * ! commend lai khu nay, ve sau dung tiep
       */
      {
        row: {
          cols: [
            {
              colNumber: 5,
              elementType: variable.input,
              elementConfig: {
                name: variable.departureDate,
                type: variable.date,
                labeltext: "Departure Date",
                placeholder: "",
              },
            },
            {
              colNumber: 5,
              elementType: variable.input,
              elementConfig: {
                name: variable.finishedDate,
                type: variable.date,
                labeltext: "Finished Date",
                placeholder: "",
              },
            },
          ],
        },
      },
      /**
       * ! Ket thuc o day
       */
      // {
      //   row: {
      //     cols: [
      //       {
      //         colNumber: 4,
      //         elementType: "input",
      //         elementConfig: {
      //           name: variable.cargoVolume,
      //           type: "number",
      //           labeltext: "Cargo volume",
      //           placeholder: "0",
      //           value: "",
      //         },
      //         validation: [variable.required, variable.positiveNumber],
      //         valid: {},
      //       },
      //       {
      //         colNumber: 4,
      //         elementType: "input",
      //         elementConfig: {
      //           name: variable.cargoType,
      //           type: "text",
      //           labeltext: "Cargo Type",
      //           placeholder: "",
      //           value: "",
      //         },
      //         validation: [variable.required, variable.positiveNumber],
      //         valid: {},
      //       },
      //     ],
      //   },
      // },
      // {
      //   colNumber: 4,
      //   elementType: variable.select,
      //   elementConfig: {
      //     name: variable.cargoType,
      //     labeltext: "Cargo Type",
      //     options: [
      //       {
      //         id: "1",
      //         value: variable.slowGoods,
      //         displayValue: "Normal goods",
      //       },
      //       {
      //         id: "2",
      //         value: variable.fastGoods,
      //         displayValue: "Fast goods",
      //       },
      //       {
      //         id: "3",
      //         value: variable.fullContainer,
      //         displayValue: "Full container",
      //       },
      //     ],
      //     value: variable.slowGoods,
      //   },
      //   validation: [variable.none],
      //   valid: { type: variable.success, errorMessage: "" },
      // },
    ],
    listTestSelectorstSelector:[
      {
        key: 1,
        value: {
          name: "Toi là số 1",
          age: 12,
          gender: variable.male,
        },
      },
      {
        key: 2,
        value: {
          name: "Toi là số 2",
          age: 14,
          gender: variable.female,
        },
      },
      {
        key: 3,
        value: {
          name: "Toi là số 3",
          age: 15,
          gender: variable.female,
        },
      },
    ]
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
    modifyContract:(state,action)=>{
      state.contracts.record=action.payload
    },
    ModifyContractFomr:(state,action)=>{
      state.contractForm=action.payload
    }
  },
});

const { reducer, actions } = contract; //createSlice sẽ trả về cho ta 2 biến là reducer và action
export const { addContract,modifyContract,ModifyContractFomr } = actions;
export default reducer;
