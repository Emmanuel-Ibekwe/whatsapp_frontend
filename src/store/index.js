import { configureStore, combineReducers } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import createFilter from "redux-persist-transform-filter";
import storage from "redux-persist/lib/storage";
import userReducer from "./userSlice";
import chatReducer from "./chatSlice";

const saveOnlyUserFilter = createFilter("user", ["user"]);

const persistConfig = {
  key: "user",
  storage,
  whitelist: ["user"],
  transforms: [saveOnlyUserFilter]
};

const rootReducer = combineReducers({
  user: userReducer,
  chat: chatReducer
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
  reducer: persistedReducer,
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: false
    }),
  devTools: true
});

export const persistor = persistStore(store);
export default store;
