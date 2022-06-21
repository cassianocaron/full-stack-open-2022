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

export const setNotification = (message, time) => {
  return async (dispatch) => {
    window.clearTimeout(window.timeout);
    dispatch(showNotification(message));
    window.timeout = setTimeout(
      () => dispatch(hideNotification()),
      time * 1000
    );
  };
};

export default notificationSlice.reducer;
