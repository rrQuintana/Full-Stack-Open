import { createSlice } from "@reduxjs/toolkit"

const notifiationStart = 'Welcome to the notification'

const notificationSlice = createSlice({
  name: "notification",
  initialState: notifiationStart,
  reducers: {
    setNotification: (state, action) => {
      return action.payload
    },
  },
});

export const { setNotification } = notificationSlice.actions
export default notificationSlice.reducer