import * as variable from "variables/Variables";
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

export const createAccountData = (id, accountStatus, userName, createDate,numberOfReport) => {
  return {
    [variable.id]: id,
    [variable.accoutStatus]: accountStatus,
    [variable.userName]: userName,
    // [variable.email]: email,
    // [variable.birthDate]: birthDate,
    // [variable.sex]: sex,
    [variable.createDate]: createDate,
    [variable.numberOfReport]:numberOfReport
    // [variable.phone]: phone,
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
