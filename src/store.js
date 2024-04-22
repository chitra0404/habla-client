import { configureStore } from "@reduxjs/toolkit";
import activeUserSlice from "./redux/ActiveUserSlice";
import chatSlice from "./redux/chatSlice";
import profileSlice from "./redux/profileSlice";
import searchSlice from "./redux/searchSlice";
const store = configureStore({
  reducer: {
    activeUser: activeUserSlice,
    profile: profileSlice,
    search: searchSlice,
    chats: chatSlice,
  },
});
export default store;