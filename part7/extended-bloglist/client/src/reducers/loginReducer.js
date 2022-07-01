import { createSlice } from "@reduxjs/toolkit";
import { createNotification } from "./notificationReducer";

import userService from "../services/users";
import loginService from "../services/login";

const loginSlice = createSlice({
  name: "login",
  initialState: null,
  reducers: {
    login(state, action) {
      return action.payload;
    },
    logout(state, action) {
      return action.payload;
    },
  },
});

export const { login, logout } = loginSlice.actions;

export const logUserIn = (credentials) => {
  return async (dispatch) => {
    const { username, password } = credentials;
    try {
      const user = await loginService.login({
        username,
        password,
      });
      userService.setUser(user);
      dispatch(login(user));
      dispatch(
        createNotification(
          { message: `Welcome ${user.name}!`, type: "info" },
          5
        )
      );
    } catch (error) {
      dispatch(
        createNotification(
          { message: error.response.data.error, type: "error" },
          5
        )
      );
    }
  };
};

export const logUserOut = () => {
  return async (dispatch) => {
    userService.clearUser();
    dispatch(logout(null));
  };
};

export default loginSlice.reducer;
