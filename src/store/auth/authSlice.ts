import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { UserAuthData } from "../../common/interfaces/auth.interface";

const initialState: UserAuthData = {
  uid: "anon",
  isLoggedIn: false,
  token: null,
  refreshToken: null,
};

const userAuthSlice = createSlice({
  name: "userAuth",
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<UserAuthData>) => {
      Object.assign(state, action.payload);
    },
    logout: (state) => {
      state = {
        ...state,
        uid: "anon",
        isLoggedIn: false,
        token: null,
        refreshToken: null,
      };
    },
  },
});

export const { setUser, logout } = userAuthSlice.actions;

export default userAuthSlice.reducer;
