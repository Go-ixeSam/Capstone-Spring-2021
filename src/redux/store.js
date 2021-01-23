import { configureStore } from "@reduxjs/toolkit";
import { combineReducers } from "redux";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import accountReducer from "./Account/AccountSlice";
import tripReducer from "./trip/TripSlice";
import postReducer from "./Post/PostSlice";
// import userReducer from "./user/userSlice"

const reducers = combineReducers({
  account: accountReducer,
  // user: userReducer,
  trip: tripReducer,
  post: postReducer,
});

const persistConfig = {
  key: "root",
  storage,
  whitelist: ["user"],
  blacklist: ["account", "trip", "post"],
};

const persistedReducer = persistReducer(persistConfig, reducers);

/**
 * *Hàm configStore này sẽ giúp ta config luôn cả redux devtool và thunk luôn
 */
const store = configureStore({
  reducer: persistedReducer,
});

export default store;
