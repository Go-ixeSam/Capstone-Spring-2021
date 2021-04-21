import * as variable from "variables/Variables";
import {createVegetableData} from "util/ContructorCreation"
/**
 * * Hàm sẽ trả về 1 mảng với các phần tử là những ngày tháng
 */
export function getDates(arr) {
  let newArr = [];
  arr.map((obj) => {
    newArr.push(obj[variable.createDate]);
  });
  return newArr;
}

/**
 * * hàm sẽ trả về 1 mảng mà ko có phần tử trung với nhau
 * @param {*} arr
 */
export function removeDuplicateDate(arr) {
  return Array.from(new Set(arr));
}

export function prepareVegetableData(datas,tableBodyData){
  // console.log(state.post.getAllVegetableUnapprovedCurrent);
  // const datas = state.post.getAllVegetableUnapprovedCurrent;
  // let tableBodyData = [];
  // tableBodyData=[]
  let image = "";
  if (Object.keys(datas).length!==0) {
    datas.map((data) => {
      if (data.images) {
        if (data.images.length > 0) {
          if (data.images[0].url) {
            image = data.images[0].url;
          }
        }
      }
      tableBodyData.push(
        createVegetableData(
          data.name,
          data.idDescription,
          data.feature,
          data.description,
          image
        )
      );
    });
  }
  // return tableBodyData;
}