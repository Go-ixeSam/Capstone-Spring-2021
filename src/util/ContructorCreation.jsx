import * as variable from "variables/Variables";
import { numberOfReport } from "variables/Variables";
export function createData(id, name, calories, fat, carbs, protein, isLock) {
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
export function createPostData(
  creator,
  dateSubmitted,
  id,
  reportCount,
  negativeCommendCount
) {
  return {
    [variable.creator]: creator,
    [variable.dateSubmitted]: dateSubmitted,
    [variable.id]: id,
    [variable.reportCount]: reportCount,
    [variable.negativeCommendCount]: negativeCommendCount,
  };
}

export const createAccountData = (
  id,
  accountStatus,
  userName,
  createDate,
  numberOfReport,
  email,
  birthDate,
  sex,
  phone
) => {
  return {
    [variable.id]: id,
    [variable.accoutStatus]: accountStatus,
    [variable.userName]: userName,
    [variable.email]: email,
    [variable.birthDate]: birthDate,
    [variable.sex]: sex,
    [variable.createDate]: createDate,
    [variable.numberOfReport]: numberOfReport,
    [variable.phone]: phone,
  };
};

/**
 * * Tạo dữ liệu về rau để hiển thị lên table
 * @param {*} name 
 * @param {*} id 
 * @param {*} uses 
 * @param {*} description 
 * @param {*} image 
 * @returns 
 */
export const createVegetableData = (name, id, uses, description, image) => {
  return {
    [variable.vegetableName]: name,
    [variable.vegetableImage]: image,
    [variable.uses]: uses,
    [variable.description]: description,
    [variable.id]: id,
  };
};
export const createReportedPostData = (
  id,
  createDate,
  postPicture,
  numberOfLike,
  numberOfReport,
  caption,
  vegetableName
) => {
  return {
    [variable.id]: id,
    [variable.createDate]: createDate,
    [variable.postPicture]: postPicture,
    [variable.numberOfLike]: numberOfLike,
    [variable.numberOfReport]: numberOfReport,
    [variable.caption]: caption,
    [variable.vegetableName]: vegetableName,
  };
};

/**
 * * Với 3 kiểu string input là:
 * ! 2015-03-25, 03/25/2015 và Mar 25 2015
 * @param {*} stringDate
 * @returns
 */
export function convertStringToDate(stringDate) {
  var date;
  return (date = new Date(stringDate));
}

//! Ouput của cái string date sẽ là: 03/12/2021
export function convertDateToString(date) {
  const month = date.getMonth() + 1;
  var stringDate;
  return (stringDate = month + "/" + date.getDate() + "/" + date.getFullYear());
}

/**
 *
 * @param {*} label
 * @param {*} numeric //* dòng này dùng để xắp xếp vị trí của body cell data dựa theo kiểu giá trị, nếu là số thì sắp bên phải và ngược lại
 * @param {*} disablePadding //* dùng hoặc ko dùng header cell padding
 * @param {*} id
 * @returns
 */
export function createHeader(label, numeric, disablePadding, id) {
  return {
    id: id,
    numeric: numeric,
    disablePadding: disablePadding,
    label: label,
  };
}
