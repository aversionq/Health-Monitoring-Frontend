import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import medApi from '../../components/api-med';

export const fetchLatestPressure = createAsyncThunk('pressure/fetchLatestPressure', async () => {
  const { data } = await medApi.get('Pressure/getLatestPressure');
  return data;
});

export const fetchUserPressure = createAsyncThunk('pressure/fetchUserPressure', async () => {
  const { data } = await medApi.get('Pressure/getUserPressure');
  return data;
});

export const fetchUserTimeIntervalPressure = createAsyncThunk(
  'pressure/fetchUserTimeIntervalPressure',
  async (values) => {
    const { data } = await medApi.get(
      `Pressure/getUserPressureByDateInterval?startDate=${values.beginDate}&endDate=${values.endDate}`,
    );
    return data;
  },
);

export const fetchUserSortedPagedPressure = createAsyncThunk(
  'pressure/fetchUserSortedPagedPressure',
  async (values) => {
    const { data } = await medApi.get(
      `Pressure/getSortedPagedUserPressure?page=${values?.page}&sortType=${values?.sortType}`,
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

const pressureSlice = createSlice({
  name: 'pressure',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchLatestPressure.pending, (state) => {
      state.status = 'loading';
      state.data = {};
    });
    builder.addCase(fetchLatestPressure.fulfilled, (state, action) => {
      state.status = 'loaded';
      state.data = action.payload;
    });
    builder.addCase(fetchLatestPressure.rejected, (state) => {
      state.status = 'error';
      state.data = {};
    });

    builder.addCase(fetchUserPressure.pending, (state) => {
      state.status = 'loading';
      state.fulldata = [];
    });
    builder.addCase(fetchUserPressure.fulfilled, (state, action) => {
      state.status = 'loaded';
      state.fulldata = action.payload;
    });
    builder.addCase(fetchUserPressure.rejected, (state) => {
      state.status = 'error';
      state.fulldata = [];
    });

    builder.addCase(fetchUserTimeIntervalPressure.pending, (state) => {
      state.status = 'loading';
      state.dataByDate = [];
    });
    builder.addCase(fetchUserTimeIntervalPressure.fulfilled, (state, action) => {
      state.status = 'loaded';
      state.dataByDate = action.payload;
    });
    builder.addCase(fetchUserTimeIntervalPressure.rejected, (state) => {
      state.status = 'error';
      state.dataByDate = [];
    });

    builder.addCase(fetchUserSortedPagedPressure.pending, (state) => {
      state.status = 'loading';
      state.dataSortedPaged = [];
    });
    builder.addCase(fetchUserSortedPagedPressure.fulfilled, (state, action) => {
      state.status = 'loaded';
      state.dataSortedPaged = action.payload;
    });
    builder.addCase(fetchUserSortedPagedPressure.rejected, (state) => {
      state.status = 'error';
      state.dataSortedPaged = [];
    });
  },
});

export const pressureReducer = pressureSlice.reducer;

export const selectUserPressure = (state) => state.pressure.data;

export const selectAllUserPressure = (state) => state.pressure.fulldata;

export const selectUserTimeIntervalPressure = (state) => state.pressure.dataByDate;

export const selectUserSortedPagedPressure = (state) => state.pressure.dataSortedPaged;
