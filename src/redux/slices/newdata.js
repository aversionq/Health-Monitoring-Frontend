import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import medApi from '../../components/api-med';

export const fetchUserNewSugar = createAsyncThunk('newdata/fetchUserNewSugar', async (values) => {
  const { data } = await medApi.post('BloodSugar', values);
  return data;
});

export const fetchUserNewPulse = createAsyncThunk('newdata/fetchUserNewPulse', async (values) => {
  const { data } = await medApi.post('HeartRate', values);
  return data;
});

export const fetchUserNewPressure = createAsyncThunk(
  'newdata/fetchUserNewPressure',
  async (values) => {
    const { data } = await medApi.post('Pressure', values);
    return data;
  },
);

const initialState = {
  data: {},
  status: 'loading',
};

const newdataSlice = createSlice({
  name: 'newdata',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchUserNewSugar.pending, (state) => {
      state.data = {};
      state.status = 'loading';
    });
    builder.addCase(fetchUserNewSugar.fulfilled, (state, action) => {
      state.data = action.payload;
      state.status = 'loaded';
    });
    builder.addCase(fetchUserNewSugar.rejected, (state) => {
      state.data = {};
      state.status = 'error';
    });

    builder.addCase(fetchUserNewPulse.pending, (state) => {
      state.data = {};
      state.status = 'loading';
    });
    builder.addCase(fetchUserNewPulse.fulfilled, (state, action) => {
      state.data = action.payload;
      state.status = 'loaded';
    });
    builder.addCase(fetchUserNewPulse.rejected, (state) => {
      state.data = {};
      state.status = 'error';
    });

    builder.addCase(fetchUserNewPressure.pending, (state) => {
      state.data = {};
      state.status = 'loading';
    });
    builder.addCase(fetchUserNewPressure.fulfilled, (state, action) => {
      state.data = action.payload;
      state.status = 'loaded';
    });
    builder.addCase(fetchUserNewPressure.rejected, (state) => {
      state.data = {};
      state.status = 'error';
    });
  },
});

export const newdataReducer = newdataSlice.reducer;
