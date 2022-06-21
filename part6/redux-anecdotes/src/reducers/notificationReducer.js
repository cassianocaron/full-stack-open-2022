import { createSlice } from "@reduxjs/toolkit";

const initialState = null;

const notificationSlice = createSlice({
  name: "notification",
  initialState,
  reducers: {
    showNotification(state, action) {
      state = action.payload;
      return state;
    },
    hideNotification(state, action) {
      state = initialState;
      return state;
    },
  },
});

export const { showNotification, hideNotification } = notificationSlice.actions;

export const setNotification = (message, timer) => {
  return async (dispatch) => {
    dispatch(showNotification(message));
    setTimeout(() => dispatch(hideNotification()), timer * 1000);
  };
};

export default notificationSlice.reducer;
