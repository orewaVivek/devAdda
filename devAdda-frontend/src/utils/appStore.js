import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./userSlice";
import feedReducer from "../utils/feedSlice";

export const appStore = configureStore({
  reducer: {
    user: userReducer,
    feed: feedReducer,
  },
});
