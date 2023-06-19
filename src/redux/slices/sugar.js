import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import medApi from '../../components/api-med';

export const fetchLatestSugar = createAsyncThunk('sugar/fetchLatestData', async () => {
  const { data } = await medApi.get('BloodSugar/getLatestBloodSugar');
  return data;
});

export const fetchUserSugar = createAsyncThunk('sugar/fetchUserSugar', async () => {
  const { data } = await medApi.get('BloodSugar/getUserBloodSugar');
  return data;
});

export const fetchUserTimeIntervalSugar = createAsyncThunk(
  'sugar/fetchUserTimeIntervalSugar',
  async (values) => {
    const { data } = await medApi.get(
      `BloodSugar/getUserBloodSugarByDateInterval?startDate=${values?.beginDate}&endDate=${values?.endDate}`,
    );
    return data;
  },
);

export const fetchUserSortedPagedSugar = createAsyncThunk(
  'sugar/fetchUserSortedPagedSugar',
  async (values) => {
    const { data } = await medApi.get(
      `BloodSugar/getSortedPagedUserBloodSugar?page=${values?.page}&sortType=${values?.sortType}`,
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

const sugarSlice = createSlice({
  name: 'sugar',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchLatestSugar.pending, (state) => {
      state.status = 'loading';
      state.data = {};
    });
    builder.addCase(fetchLatestSugar.fulfilled, (state, action) => {
      state.status = 'loaded';
      state.data = action.payload;
    });
    builder.addCase(fetchLatestSugar.rejected, (state) => {
      state.status = 'error';
      state.data = {};
    });

    builder.addCase(fetchUserSugar.pending, (state) => {
      state.status = 'loading';
      state.fulldata = [];
    });
    builder.addCase(fetchUserSugar.fulfilled, (state, action) => {
      state.status = 'loaded';
      state.fulldata = action.payload;
    });
    builder.addCase(fetchUserSugar.rejected, (state) => {
      state.status = 'error';
      state.fulldata = [];
    });

    builder.addCase(fetchUserTimeIntervalSugar.pending, (state) => {
      state.status = 'loading';
      state.dataByDate = [];
    });
    builder.addCase(fetchUserTimeIntervalSugar.fulfilled, (state, action) => {
      state.status = 'loaded';
      state.dataByDate = action.payload;
    });
    builder.addCase(fetchUserTimeIntervalSugar.rejected, (state) => {
      state.status = 'error';
      state.dataByDate = [];
    });

    builder.addCase(fetchUserSortedPagedSugar.pending, (state) => {
      state.status = 'loading';
      state.dataSortedPaged = [];
    });
    builder.addCase(fetchUserSortedPagedSugar.fulfilled, (state, action) => {
      state.status = 'loaded';
      state.dataSortedPaged = action.payload;
    });
    builder.addCase(fetchUserSortedPagedSugar.rejected, (state) => {
      state.status = 'error';
      state.dataSortedPaged = [];
    });
  },
});

export const sugarReducer = sugarSlice.reducer;

export const selectUserSugar = (state) => state.sugar.data;

export const selectAllUserSugar = (state) => state.sugar.fulldata;

export const selectUserTimeIntervalSugar = (state) => state.sugar.dataByDate;

export const selectUserSortedPagedSugar = (state) => state.sugar.dataSortedPaged;
