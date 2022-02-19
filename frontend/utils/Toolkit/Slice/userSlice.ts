import {
  createAsyncThunk,
  createSlice,
  SerializedError,
} from "@reduxjs/toolkit";
import { HYDRATE } from "next-redux-wrapper";

interface AuthState {
  username: string;
  name: string;
}
const initialState: AuthState = {
  username: "",
  name: "",
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    userName: (state, { payload }) => {
      state.username = payload;
    },
    name: (state, { payload }) => {
      state.name = payload;
    },
  },
  extraReducers: {
    [HYDRATE]: (state, action) => {
      return {
        ...state,
        ...action.payload.user,
      };
    },
  },
});
export const { userName, name } = userSlice.actions;
export default userSlice.reducer;
