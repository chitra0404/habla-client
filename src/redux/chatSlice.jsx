import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';
import { fetchAllChats } from '../api/chat';

const initialState = {
  chats: [],
  activeChat: '',
  isLoading: false,
  notifications: [],
};

export const fetchChats = createAsyncThunk('redux/chats', async () => {
  try {
    const data = await fetchAllChats();
    console.log("fetch", data);
    return data;
  } catch (error) {
    toast.error('Something went wrong! Try again.');
    throw error; // Rethrow the error so it can be caught elsewhere if needed
  }
});

const chatsSlice = createSlice({
  name: 'chats',
  initialState,
  reducers: {
    setActiveChat: (state, { payload }) => {
      state.activeChat = payload;
    },
    setNotifications: (state, { payload }) => {
      state.notifications = payload;
    },
  },
  extraReducers: builder => {
    builder
      .addCase(fetchChats.pending, state => {
        state.isLoading = true;
      })
      .addCase(fetchChats.fulfilled, (state, { payload }) => {
        state.chats = payload;
        state.isLoading = false;
      })
      .addCase(fetchChats.rejected, (state, action) => {
        state.isLoading = false;
        console.error('Error fetching chats:', action.error.message);
      });
  },
});

export const { setActiveChat, setNotifications } = chatsSlice.actions;
export default chatsSlice.reducer;
