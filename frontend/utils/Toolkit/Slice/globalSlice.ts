import {
  createAsyncThunk,
  createSlice,
  SerializedError,
} from "@reduxjs/toolkit";
import { HYDRATE } from "next-redux-wrapper";

interface AuthState {
  header: boolean;
  username: string;
  name: string;
}
const initialState: AuthState = {
  header: false,
  username: "",
  name: "",
};

export const globalSlice = createSlice({
  name: "global",
  initialState,
  reducers: {
    globalHeader: (state, { payload }) => {
      state.header = payload;
    },
    userName: (state, { payload }) => {
      state.username = payload;
    },
    name: (state, { payload }) => {
      state.name = payload;
    },
  },
  extraReducers: {
    [HYDRATE]: (state, action) => {
      console.log("HYDRATE", state, action.payload);
      return {
        ...state,
        ...action.payload.global,
      };
    },
  },
});
export const { globalHeader, userName, name } = globalSlice.actions;
export default globalSlice.reducer;
