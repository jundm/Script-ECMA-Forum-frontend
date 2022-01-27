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

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    userHeader: (state, { payload }) => {
      state.header = payload;
    },
  },
  extraReducers: {
    [HYDRATE]: (state, action) => {
      console.log("HYDRATE", state, action.payload);
      return {
        ...state,
        ...action.payload.user,
      };
    },
  },
});
export const { userHeader } = userSlice.actions;
export default userSlice.reducer;
