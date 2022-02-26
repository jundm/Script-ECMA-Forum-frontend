import { configureStore, ThunkAction } from "@reduxjs/toolkit";
import logger from "redux-logger";
import { Context, createWrapper, MakeStore } from "next-redux-wrapper";
import userReducer from "./Slice/userSlice";
import globalReducer from "./Slice/globalSlice";
import { combineReducers } from "redux";
import {
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
  persistStore,
} from "redux-persist";
import storage from "redux-persist/lib/storage/session";
import localStorage from "redux-persist/lib/storage";
import { encryptTransform } from "redux-persist-transform-encrypt";
import Cookies from "universal-cookie";

const cookies = new Cookies();
const accessToken = cookies.get("accessToken") || "WA29HXHSvL-NotLogin";

const persistConfig = {
  key: "root",
  version: 2,
  storage: localStorage,
  whitelist: ["global"],
  blacklist: ["auth"],
  transforms: [
    encryptTransform({
      secretKey: accessToken,
      onError: function (error) {
        console.warn("persist-error", error);
      },
    }),
  ],
};
const authPersistConfig = {
  key: "auth",
  version: 1,
  storage: storage,
  whitelist: ["auth"],
  blacklist: ["global"],
  transforms: [
    encryptTransform({
      secretKey: accessToken,
      onError: function (error) {
        console.warn("persist-error", error);
      },
    }),
  ],
};

const rootReducer = combineReducers({
  auth: persistReducer(authPersistConfig, userReducer),
  global: globalReducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
  // }).concat(logger), //*! 로거 비활성화
  devTools: process.env.NODE_ENV !== "production",
});

(store as any).__persistor = persistStore(store); // Nasty hack

// create a makeStore function
const makeStore: MakeStore<any> = (context: Context) => store;

export const wrapper = createWrapper<any>(makeStore, { debug: true });
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
