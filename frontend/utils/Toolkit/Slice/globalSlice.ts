import {
  createAsyncThunk,
  createSlice,
  SerializedError,
} from "@reduxjs/toolkit";
import { HYDRATE } from "next-redux-wrapper";

interface AuthState {
  header: boolean;
}
const initialState: AuthState = {
  header: false,
};

export const globalSlice = createSlice({
  name: "global",
  initialState,
  reducers: {
    globalHeader: (state, { payload }) => {
      state.header = payload;
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
export const { globalHeader } = globalSlice.actions;
export default globalSlice.reducer;
