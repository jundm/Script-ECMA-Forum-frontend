import {
  createAsyncThunk,
  createSlice,
  SerializedError,
} from "@reduxjs/toolkit";

interface AuthState {
  header: boolean;
}
const initialState: AuthState = {
  header:true,
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    userHeader: (state, { payload }) => {
      state.header = payload;
    },
  },
});
export const { userHeader } = userSlice.actions;
export default userSlice.reducer;
