import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import userApi from '../../components/user-api';
import medApi from '../../components/api-med';

export const fetchAllDoctors = createAsyncThunk('doctor/fetchAllDoctors', async () => {
  const { data } = await userApi.get('Doctor/getAllDoctors');
  return data;
});

export const fetchPatientSugarData = createAsyncThunk(
  'doctor/fetchPatientSugarData',
  async (patientId) => {
    const { data } = await medApi.get(`BloodSugar/getPatientBloodSugar?patientId=${patientId}`);
    return data;
  },
);

export const fetchPatientPulseData = createAsyncThunk(
  'doctor/fetchPatientPulseData',
  async (patientId) => {
    const { data } = await medApi.get(`HeartRate/getPatientHeartRate?patientId=${patientId}`);
    return data;
  },
);

export const fetchPatientPressureData = createAsyncThunk(
  'doctor/fetchPatientPressureData',
  async (patientId) => {
    const { data } = await medApi.get(`Pressure/getPatientPressure?patientId=${patientId}`);
    return data;
  },
);

export const fetchPatientBioData = createAsyncThunk(
  'doctor/fetchPatientBioData',
  async (patientId) => {
    const { data } = await userApi.get(`Doctor/getPatientBioData?patientId=${patientId}`);
    return data;
  },
);

const initialState = {
  status: 'loading',
  fulldata: [],
  patientSugar: [],
  patientPulse: [],
  patientPressure: [],
  patientBio: {},
};

const doctorSlice = createSlice({
  name: 'doctor',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchAllDoctors.pending, (state) => {
      state.status = 'loading';
      state.fulldata = [];
    });
    builder.addCase(fetchAllDoctors.fulfilled, (state, action) => {
      state.status = 'loaded';
      state.fulldata = action.payload;
    });
    builder.addCase(fetchAllDoctors.rejected, (state) => {
      state.status = 'error';
      state.fulldata = [];
    });

    builder.addCase(fetchPatientSugarData.pending, (state) => {
      state.status = 'loading';
      state.patientSugar = [];
    });
    builder.addCase(fetchPatientSugarData.fulfilled, (state, action) => {
      state.status = 'loaded';
      state.patientSugar = action.payload;
    });
    builder.addCase(fetchPatientSugarData.rejected, (state) => {
      state.status = 'error';
      state.patientSugar = [];
    });

    builder.addCase(fetchPatientPulseData.pending, (state) => {
      state.status = 'loading';
      state.patientPulse = [];
    });
    builder.addCase(fetchPatientPulseData.fulfilled, (state, action) => {
      state.status = 'loaded';
      state.patientPulse = action.payload;
    });
    builder.addCase(fetchPatientPulseData.rejected, (state) => {
      state.status = 'error';
      state.patientPulse = [];
    });

    builder.addCase(fetchPatientPressureData.pending, (state) => {
      state.status = 'loading';
      state.patientPressure = [];
    });
    builder.addCase(fetchPatientPressureData.fulfilled, (state, action) => {
      state.status = 'loaded';
      state.patientPressure = action.payload;
    });
    builder.addCase(fetchPatientPressureData.rejected, (state) => {
      state.status = 'error';
      state.patientPressure = [];
    });

    builder.addCase(fetchPatientBioData.pending, (state) => {
      state.status = 'loading';
      state.patientBio = {};
    });
    builder.addCase(fetchPatientBioData.fulfilled, (state, action) => {
      state.status = 'loaded';
      state.patientBio = action.payload;
    });
    builder.addCase(fetchPatientBioData.rejected, (state) => {
      state.status = 'error';
      state.patientBio = {};
    });
  },
});

export const doctorReducer = doctorSlice.reducer;

export const selectAllDoctors = (state) => state.doctor.fulldata;

export const selectPatientSugar = (state) => state.doctor.patientSugar;

export const selectPatientPulse = (state) => state.doctor.patientPulse;

export const selectPatientPressure = (state) => state.doctor.patientPressure;

export const selectPatientBio = (state) => state.doctor.patientBio;
