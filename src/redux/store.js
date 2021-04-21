import { configureStore,getDefaultMiddleware} from "@reduxjs/toolkit";
import { combineReducers } from "redux";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import accountReducer from "./Account/AccountSlice";
import tripReducer from "./trip/TripSlice";
import postReducer from "./Post/PostSlice";
import firebaseReducer from "./Firebase/FirebaseSlice";
import loginReducer from "./Login/LoginSlice";
import dashboardReducer from "./Dashboard/DashboardSlice"
import systemReducer from "./SystemConfiguration/SystemConfigurationSlice"
// import userReducer from "./user/userSlice"

const customizedMiddleware=getDefaultMiddleware({
  serializableCheck:false
})
const reducers = combineReducers({
  account: accountReducer,
  dashboard:dashboardReducer,
  trip: tripReducer,
  post: postReducer,
  firebase: firebaseReducer,
  login:loginReducer,
  systemConfig:systemReducer
});
const persistConfig = {
  key: "root",
  storage,
  whitelist: ["login"],
  blacklist: ["account", "trip", "post", "firebase","dashboard","systemConfig"],
};
const persistedReducer = persistReducer(persistConfig, reducers);
/**
 * *Hàm configStore này sẽ giúp ta config luôn cả redux devtool và thunk luôn
 */
const store = configureStore({
  reducer: persistedReducer,
  middleware:customizedMiddleware
});
export default store;
