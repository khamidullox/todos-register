import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./app/userSlice";

export let store = configureStore({
  reducer: {
    user: userReducer,
  },
});
