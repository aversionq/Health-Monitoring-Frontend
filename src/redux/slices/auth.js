import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import userApi from '../../components/user-api';

export const fetchAuth = createAsyncThunk('auth/fetchUserData', async (values) => {
  const { data } = await userApi.post('/Auth/Login', values);
  return data;
});

export const fetchAuthMe = createAsyncThunk('auth/fetchAuthMe', async () => {
  const { data } = await userApi.get('/User/getCurrentUser');
  return data;
});

export const fetchRegister = createAsyncThunk('auth/fetchRegister', async (values) => {
  const { data } = await userApi.post('/Auth/Register', values).catch((error) => {
    return {
      data: {
        message: error.response?.data,
        error: error.message,
      },
    };
  });
  // console.log(data);
  return data;
});

const initialState = {
  data: {},
  status: 'loading',
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout: (state) => {
      state.data = {};
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchAuth.pending, (state) => {
      state.status = 'loading';
      state.data = {};
    });
    builder.addCase(fetchAuth.fulfilled, (state, action) => {
      state.status = 'loaded';
      state.data = action.payload;
    });
    builder.addCase(fetchAuth.rejected, (state) => {
      state.status = 'error';
      state.data = {};
    });
    builder.addCase(fetchAuthMe.pending, (state) => {
      state.status = 'loading';
      state.data = {};
    });
    builder.addCase(fetchAuthMe.fulfilled, (state, action) => {
      state.status = 'loaded';
      state.data = action.payload;
    });
    builder.addCase(fetchAuthMe.rejected, (state) => {
      state.status = 'error';
      state.data = {};
    });
    builder.addCase(fetchRegister.pending, (state) => {
      state.status = 'loading';
      state.data = {};
    });
    builder.addCase(fetchRegister, (state) => {
      state.status = 'loaded';
    });
    builder.addCase(fetchRegister.rejected, (state) => {
      state.status = 'error';
    });
  },
});

export const selectIsAuth = (state) => Object.keys(state.auth.data).length !== 0;

export const selectUserData = (state) => state.auth.data;

// export const selectUserId = (state) => state.auth.data.id;

export const authReducer = authSlice.reducer;

export const { logout } = authSlice.actions;
