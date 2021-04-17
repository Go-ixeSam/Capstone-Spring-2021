import * as variable from "variables/Variables";
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
