import { createSlice } from "@reduxjs/toolkit"

const notificationSlice = createSlice({
  name: "notification",
  initialState: '',
  reducers: {
    setNotification: (state, action) => {
      return action.payload;
    },
    clearNotification: (state, action) => { //eslint-disable-line
      return "";
    }
  },
});

export const { setNotification, clearNotification } = notificationSlice.actions

export const notificate = (notification) => { //spell-checker:disable-line
  return async (dispatch) => {
    dispatch(setNotification(notification));
    console.log("notification", notification);
    setTimeout(() => {
      dispatch(clearNotification());
      console.log("cleared");
    }, 5000);
  };
}

export default notificationSlice.reducer