import { createSlice } from "@reduxjs/toolkit";

const initialState = null;

const notificationSlice = createSlice({
  name: "notification",
  initialState,
  reducers: {
    setNotification(state, action) {
      state = action.payload;
      return state;
    },
    hideNotification() {
      return initialState;
    },
  },
});

export const { setNotification, hideNotification } = notificationSlice.actions;
export default notificationSlice.reducer;
