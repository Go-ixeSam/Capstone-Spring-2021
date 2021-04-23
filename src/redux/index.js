// export {login,logout,saveFirebaseToken} from "./user/userSlice"
export {
  setAdvanceSearchData,
  setSearchValue,
  addTrip,
  setTripDetail,
  setSelectedTripID,
  setSelectedAdvanceRecord,
  removeAdvanceRecordSelected,
  getLocked,
  setTrip,
  getDataByNameSearch,
} from "./trip/TripSlice";
export { getALL, getPlantInfo, sharingDetail } from "./Account/AccountSlice";
export {
  setVisible,
  setSelectedAccountID,
  isAccept,
  getAllVegetableUnapproved, // useWantAllVegetableUnapproved,
} from "./Post/PostSlice";
export { addObject } from "./Firebase/FirebaseSlice";
export {
  login,
  logOut,
  increaseNotificationCount,
  decreaseNotificationCount,
  setNotificationCount,
} from "./Login/LoginSlice";
export {
  getDashboard,
  getTop10,
  getShareAndExchangeCompare,
} from "./Dashboard/DashboardSlice";
export {
  addPercentReportName,
  getPercentById,
  updatePercentThreshold,
  getAllPercentReport,
} from "./SystemConfiguration/SystemConfigurationSlice";
// export * as contracType from "./contract/contractType"
// Làm như thế này thì mọi action creator sẽ nằm chung 1 chỗ, và ta chỉ cần gọi đến redux để
// import action creator mình cần
