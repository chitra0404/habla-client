import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';
import { searchUsers } from '../api/auth';

const initialState = {
  searchResults: [],
  isLoading: false,
  isError: false,
};

export const searchUserThunk = createAsyncThunk('redux/searchUser', async (search) => {
  try {
    const { data } = await searchUsers(search);
    return data;
  } catch (error) {
    toast.error('Something Went Wrong.Try Again!');
    throw error;
  }
});

const searchSlice = createSlice({
  name: 'search',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(searchUserThunk.pending, state => {
        state.isLoading = true;
        state.isError = false;
      })
      .addCase(searchUserThunk.fulfilled, (state, { payload }) => {
        state.searchResults = payload;
        state.isLoading = false;
        state.isError = false;
      })
      .addCase(searchUserThunk.rejected, state => {
        state.isLoading = false;
        state.isError = true;
      });
  },
});

export default searchSlice.reducer;
