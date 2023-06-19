import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import userApi from '../../components/user-api';

export const fetchUserChats = createAsyncThunk('chat/fetchUserChats', async () => {
  const { data } = await userApi.get('Chat/getUserChats');
  return data;
});

export const fetchChatMessages = createAsyncThunk('chat/fetchChatMessages', async (value) => {
  const { data } = await userApi.get(`Chat/getChatMessages?chatId=${value}`);
  return data;
});

export const fetchChatPartnerInfo = createAsyncThunk('chat/fetchChatPartnerInfo', async (value) => {
  const { data } = await userApi.get(`Chat/getChatPartnerInfo?userId=${value}`);
  return data;
});

export const fetchChatIdByUsers = createAsyncThunk('chat/fetchChatIdByUsers', async (values) => {
  const { data } = await userApi.get(
    `Chat/getChatByUserIds?userId=${values.curUserId}&doctorId=${values.docId}`,
  );
  return data;
});

const initialState = {
  status: 'loading',
  userChats: [],
  chatMessages: [],
  chatPartnerInfo: {},
  chatId: '',
};

const chatSlice = createSlice({
  name: 'chat',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchUserChats.pending, (state) => {
      state.status = 'loading';
      state.userChats = [];
    });
    builder.addCase(fetchUserChats.fulfilled, (state, action) => {
      state.status = 'loaded';
      state.userChats = action.payload;
    });
    builder.addCase(fetchUserChats.rejected, (state) => {
      state.status = 'error';
      state.userChats = [];
    });

    builder.addCase(fetchChatMessages.pending, (state) => {
      state.status = 'loading';
      state.chatMessages = [];
    });
    builder.addCase(fetchChatMessages.fulfilled, (state, action) => {
      state.status = 'loaded';
      state.chatMessages = action.payload;
    });
    builder.addCase(fetchChatMessages.rejected, (state) => {
      state.status = 'error';
      state.chatMessages = [];
    });

    builder.addCase(fetchChatPartnerInfo.pending, (state) => {
      state.status = 'loading';
      state.chatPartnerInfo = {};
    });
    builder.addCase(fetchChatPartnerInfo.fulfilled, (state, action) => {
      state.status = 'loaded';
      state.chatPartnerInfo = action.payload;
    });
    builder.addCase(fetchChatPartnerInfo.rejected, (state) => {
      state.status = 'error';
      state.chatPartnerInfo = {};
    });

    builder.addCase(fetchChatIdByUsers.pending, (state) => {
      state.status = 'loading';
      state.chatId = '';
    });
    builder.addCase(fetchChatIdByUsers.fulfilled, (state, action) => {
      state.status = 'loaded';
      state.chatId = action.payload;
    });
    builder.addCase(fetchChatIdByUsers.rejected, (state) => {
      state.status = 'error';
      state.chatId = '';
    });
  },
});

export const chatReducer = chatSlice.reducer;

export const selectUserChats = (state) => state.chat.userChats;

export const selectChatMessages = (state) => state.chat.chatMessages;

export const selectChatPartnerInfo = (state) => state.chat.chatPartnerInfo;

export const selectChatIdByUsers = (state) => state.chat.chatId;
