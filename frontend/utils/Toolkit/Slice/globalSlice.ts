import {
  createAsyncThunk,
  createSlice,
  SerializedError,
} from "@reduxjs/toolkit";
import { HYDRATE } from "next-redux-wrapper";

interface AuthState {
  header: boolean;
  remember: boolean;
  userEmail: string;
}
const initialState: AuthState = {
  header: false,
  remember: true,
  userEmail: "",
};

export const globalSlice = createSlice({
  name: "global",
  initialState,
  reducers: {
    globalHeader: (state, { payload }) => {
      state.header = payload;
    },
    globalRemember: (state, { payload }) => {
      state.remember = payload;
    },
    globalEmail: (state, { payload }) => {
      state.userEmail = payload;
    },
  },
  extraReducers: {
    [HYDRATE]: (state, action) => {
      return {
        ...state,
        ...action.payload.global,
      };
    },
  },
});
export const { globalHeader, globalRemember,globalEmail } = globalSlice.actions;
export default globalSlice.reducer;
