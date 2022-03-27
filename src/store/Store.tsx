import { configureStore } from "@reduxjs/toolkit";
import { AuthReducer } from "./AuthSlice";
import { ContactsReducer } from "./ContaсtsSlice";

export const store = configureStore({
  reducer: {
    auth: AuthReducer,
    contacts: ContactsReducer,
  },
});
