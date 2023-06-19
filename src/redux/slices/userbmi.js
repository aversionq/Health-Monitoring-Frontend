import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import userApi from '../../components/user-api';

export const fetchUserBmi = createAsyncThunk('userbmi/fetchUserBmi', async (id) => {
  const { data } = await userApi.get(`User/getUserBMI/?userId=${id}`);
  return data;
});

const initialState = {
  data: {},
  status: 'loading',
};

const userbmiSlise = createSlice({
  name: 'userbmi',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchUserBmi.pending, (state) => {
      state.status = 'loading';
      state.data = {};
    });
    builder.addCase(fetchUserBmi.fulfilled, (state, action) => {
      state.status = 'loaded';
      state.data = action.payload;
    });
    builder.addCase(fetchUserBmi.rejected, (state) => {
      state.status = 'error';
      state.data = {};
    });
  },
});

export const userbmiReducer = userbmiSlise.reducer;

export const selectUserBmi = (state) => state.userbmi.data;
