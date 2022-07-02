import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./authSlice";
import leaveReducer from "./leaveSlice";
import userReducer from "./userSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    leave: leaveReducer,
    user: userReducer,
  },
});
