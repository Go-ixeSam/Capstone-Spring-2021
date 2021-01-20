// export {login,logout,saveFirebaseToken} from "./user/userSlice"
export {
  setAdvanceSearchData,
  setSearchValue,
  addTrip,
  setTripDetail,
  setSelectedTripID,
  setSelectedAdvanceRecord,
  removeAdvanceRecordSelected
} from "./trip/TripSlice";
export { modifyContract, ModifyContractFomr } from "./Account/AccountSlice";
// export * as contracType from "./contract/contractType"
// Làm như thế này thì mọi action creator sẽ nằm chung 1 chỗ, và ta chỉ cần gọi đến redux để
// import action creator mình cần
