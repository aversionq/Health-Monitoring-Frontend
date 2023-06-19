import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import userApi from '../../components/user-api';

export const fetchChangeUserWeight = createAsyncThunk(
  'userdata/fetchChangeUserWeight',
  async (values) => {
    const { data } = await userApi.patch('User/changeWeight', values);
    return data;
  },
);

export const fetchChangeUserHeight = createAsyncThunk(
  'userdata/fetchChangeUserHeight',
  async (values) => {
    console.log('redux data: ' + values);
    const { data } = await userApi.patch('User/changeHeight', values);
    return data;
  },
);

export const fetchChangeUserUsername = createAsyncThunk(
  'userdata/fetchChangeUserName',
  async (values) => {
    const { data } = await userApi.patch('User/changeUsername', values);
    return data;
  },
);

export const fetchChangeUserFirstName = createAsyncThunk(
  'userdata/fetchChangeUserFirstName',
  async (values) => {
    const { data } = await userApi.patch('User/changeFirstName', values);
    return data;
  },
);

export const fetchChangeUserLastName = createAsyncThunk(
  'userdata/fetchChangeUserLastName',
  async (values) => {
    const { data } = await userApi.patch('User/changeLastName', values);
    return data;
  },
);

export const fetchChangeUserBirthday = createAsyncThunk(
  'userdata/fetchChangeUserBirthday',
  async (values) => {
    const { data } = await userApi.patch('User/changeUserBirthday', values);
    return data;
  },
);

export const fetchChangeUserGender = createAsyncThunk(
  'userdata/fetchChangeUserGender',
  async (values) => {
    const { data } = await userApi.patch('User/changeUserGender', values);
    return data;
  },
);

export const fetchCurrentUserId = createAsyncThunk('userdata/fetchCurrentUserId', async () => {
  const { data } = await userApi.get('User/getCurrentUserId');
  return data;
});

export const fetchChangeUserProfilePicture = createAsyncThunk(
  'userdata/fetchChangeUserProfilePicture',
  async (value) => {
    const { data } = await userApi.patch('User/changeUserProfilePicture', value);
    return data;
  },
);

const initialState = {
  status: 'loading',
  weight: {},
  height: {},
  username: {},
  firstname: {},
  lastname: {},
  birthday: {},
  gender: {},
  id: '',
  pfp: '',
};

const userdataSlice = createSlice({
  name: 'userdata',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchChangeUserWeight.pending, (state) => {
      state.status = 'loading';
      state.weight = {};
    });
    builder.addCase(fetchChangeUserWeight.fulfilled, (state, action) => {
      state.status = 'loaded';
      state.weight = action.payload;
    });
    builder.addCase(fetchChangeUserWeight.rejected, (state) => {
      state.status = 'error';
      state.weight = {};
    });

    builder.addCase(fetchChangeUserHeight.pending, (state) => {
      state.status = 'loading';
      state.height = {};
    });
    builder.addCase(fetchChangeUserHeight.fulfilled, (state, action) => {
      state.status = 'loaded';
      state.height = action.payload;
    });
    builder.addCase(fetchChangeUserHeight.rejected, (state) => {
      state.status = 'error';
      state.height = {};
    });

    builder.addCase(fetchChangeUserUsername.pending, (state) => {
      state.status = 'loading';
      state.username = {};
    });
    builder.addCase(fetchChangeUserUsername.fulfilled, (state, action) => {
      state.status = 'loaded';
      state.username = action.payload;
    });
    builder.addCase(fetchChangeUserUsername.rejected, (state) => {
      state.status = 'error';
      state.username = {};
    });

    builder.addCase(fetchChangeUserFirstName.pending, (state) => {
      state.status = 'loading';
      state.firstname = {};
    });
    builder.addCase(fetchChangeUserFirstName.fulfilled, (state, action) => {
      state.status = 'loaded';
      state.firstname = action.payload;
    });
    builder.addCase(fetchChangeUserFirstName.rejected, (state) => {
      state.status = 'error';
      state.firstname = {};
    });

    builder.addCase(fetchChangeUserLastName.pending, (state) => {
      state.status = 'loading';
      state.lastname = {};
    });
    builder.addCase(fetchChangeUserLastName.fulfilled, (state, action) => {
      state.status = 'loaded';
      state.lastname = action.payload;
    });
    builder.addCase(fetchChangeUserLastName.rejected, (state) => {
      state.status = 'error';
      state.lastname = {};
    });

    builder.addCase(fetchChangeUserBirthday.pending, (state) => {
      state.status = 'loading';
      state.birthday = {};
    });
    builder.addCase(fetchChangeUserBirthday.fulfilled, (state, action) => {
      state.status = 'loaded';
      state.birthday = action.payload;
    });
    builder.addCase(fetchChangeUserBirthday.rejected, (state) => {
      state.status = 'error';
      state.birthday = {};
    });

    builder.addCase(fetchChangeUserGender.pending, (state) => {
      state.status = 'loading';
      state.gender = {};
    });
    builder.addCase(fetchChangeUserGender.fulfilled, (state, action) => {
      state.status = 'loaded';
      state.gender = action.payload;
    });
    builder.addCase(fetchChangeUserGender.rejected, (state) => {
      state.status = 'error';
      state.gender = {};
    });

    builder.addCase(fetchCurrentUserId.pending, (state) => {
      state.status = 'loading';
      state.id = {};
    });
    builder.addCase(fetchCurrentUserId.fulfilled, (state, action) => {
      state.status = 'loaded';
      state.id = action.payload;
    });
    builder.addCase(fetchCurrentUserId.rejected, (state) => {
      state.status = 'error';
      state.id = {};
    });
  },
});

export const userdataReducer = userdataSlice.reducer;

export const selectUserWeight = (state) => state.userdata.weight;

export const selectUserHeight = (state) => state.userdata.height;

export const selectUserUsername = (state) => state.userdata.username;

export const selectUserFirstName = (state) => state.userdata.firstname;

export const selectUserLastName = (state) => state.userdata.lastname;

export const selectUserBirthday = (state) => state.userdata.birthday;

export const selectUserGender = (state) => state.userdata.gender;

export const selectCurrentUserId = (state) => state.userdata.id;
