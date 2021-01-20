import { configureStore } from "@reduxjs/toolkit";
import { combineReducers } from "redux";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import accountReducer from "./Account/AccountSlice";
import tripReducer from "./trip/TripSlice";
// import userReducer from "./user/userSlice"


const reducers = combineReducers({
  contract: accountReducer,
  // user: userReducer,
  trip: tripReducer,
});

const persistConfig = {
  key: "root",
  storage,
  whitelist: ["user"],
};

// export const store = createStore(
//   rootReducer,
//   composeWithDevTools(applyMiddleware(ReduxThunk))
// );

const persistedReducer = persistReducer(persistConfig, reducers);

/**
 * *Hàm configStore này sẽ giúp ta config luôn cả redux devtool và thunk luôn
 */
const store = configureStore({
  reducer: persistedReducer,
});

// export const persistor = persistStore(store);
export default store;
