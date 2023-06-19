import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import medApi from '../../components/api-med';

export const fetchLatestPulse = createAsyncThunk('heartrate/fetchLatestPulse', async () => {
  const { data } = await medApi.get('HeartRate/getLatestHeartRate');
  return data;
});

export const fetchUserPulse = createAsyncThunk('heartrate/fetchUserPulse', async () => {
  const { data } = await medApi.get('HeartRate/getUserHeartRate');
  return data;
});

export const fetchUserTimeIntervalPulse = createAsyncThunk(
  'heartrate/fetchUserTimeIntervalPulse',
  async (values) => {
    const { data } = await medApi.get(
      `HeartRate/getUserHeartRateByDateInterval?startDate=${values.beginDate}&endDate=${values.endDate}`,
    );
    return data;
  },
);

export const fetchUserSortedPagedPulse = createAsyncThunk(
  'heartrate/fetchUserSortedPagedPulse',
  async (values) => {
    const { data } = await medApi.get(
      `HeartRate/getSortedPagedUserHeartRate?page=${values?.page}&sortType=${values?.sortType}`,
    );
    return data;
  },
);

const initialState = {
  data: {},
  status: 'loading',
  fulldata: [],
  dataByDate: [],
  dataSortedPaged: [],
};

const heartrateSlice = createSlice({
  name: 'heartrate',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchLatestPulse.pending, (state) => {
      state.status = 'loading';
      state.data = {};
    });
    builder.addCase(fetchLatestPulse.fulfilled, (state, action) => {
      state.status = 'loaded';
      state.data = action.payload;
    });
    builder.addCase(fetchLatestPulse.rejected, (state) => {
      state.status = 'error';
      state.data = {};
    });

    builder.addCase(fetchUserPulse.pending, (state) => {
      state.status = 'loading';
      state.fulldata = [];
    });
    builder.addCase(fetchUserPulse.fulfilled, (state, action) => {
      state.status = 'loaded';
      state.fulldata = action.payload;
    });
    builder.addCase(fetchUserPulse.rejected, (state) => {
      state.status = 'error';
      state.fulldata = [];
    });

    builder.addCase(fetchUserTimeIntervalPulse.pending, (state) => {
      state.status = 'loading';
      state.dataByDate = [];
    });
    builder.addCase(fetchUserTimeIntervalPulse.fulfilled, (state, action) => {
      state.status = 'loaded';
      state.dataByDate = action.payload;
    });
    builder.addCase(fetchUserTimeIntervalPulse.rejected, (state) => {
      state.status = 'error';
      state.dataByDate = [];
    });

    builder.addCase(fetchUserSortedPagedPulse.pending, (state) => {
      state.status = 'loading';
      state.dataSortedPaged = [];
    });
    builder.addCase(fetchUserSortedPagedPulse.fulfilled, (state, action) => {
      state.status = 'loaded';
      state.dataSortedPaged = action.payload;
    });
    builder.addCase(fetchUserSortedPagedPulse.rejected, (state) => {
      state.status = 'error';
      state.dataSortedPaged = [];
    });
  },
});

export const heartrateReducer = heartrateSlice.reducer;

export const selectUserPulse = (state) => state.heartrate.data;

export const selectAllUserPulse = (state) => state.heartrate.fulldata;

export const selectUserTimeIntervalPulse = (state) => state.heartrate.dataByDate;

export const selectUserSortedPagedPulse = (state) => state.heartrate.dataSortedPaged;
