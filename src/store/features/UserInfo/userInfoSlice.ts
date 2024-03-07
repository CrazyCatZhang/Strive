import { RootState } from "@/store";
import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

interface UserInfoState {
  username: string;
  password: string;
}

const initialState: UserInfoState = {
  username: "",
  password: "",
};

const userInfoSlice = createSlice({
  name: "userInfo",
  initialState,
  reducers: {
    setUsername(state, action: PayloadAction<string>) {
      state.username = action.payload;
    },
    setPassword(state, action: PayloadAction<string>) {
      state.password = action.payload;
    },
  },
});

export const { setUsername, setPassword } = userInfoSlice.actions;

export const selectUsername = (state: RootState) => state.userInfo.username;

export const selectPassword = (state: RootState) => state.userInfo.password;

export default userInfoSlice.reducer;
