import {
  createAsyncThunk,
  createSlice,
  SerializedError,
} from "@reduxjs/toolkit";

interface AuthState {
  user?: string;
  email?: string;
  uid?: string;
}
const initialState: AuthState = {
  user: undefined,
  email: undefined,
  uid: undefined,
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    loginUser: (state, { payload }) => {
      state.user = payload;
    },
    loginEmail: (state, { payload }) => {
      state.email = payload;
    },
    loginUid: (state, { payload }) => {
      state.uid = payload;
    },
  },
});
export const { loginUser, loginEmail, loginUid } = userSlice.actions;
export default userSlice.reducer;
