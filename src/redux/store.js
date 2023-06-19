import { configureStore } from '@reduxjs/toolkit';
import { authReducer } from './slices/auth';
import { sugarReducer } from './slices/sugar';
import { heartrateReducer } from './slices/heartrate';
import { pressureReducer } from './slices/pressure';
import { userbmiReducer } from './slices/userbmi';
import { newdataReducer } from './slices/newdata';
import { userdataReducer } from './slices/userdata';
import { doctorReducer } from './slices/doctor';
import { chatReducer } from './slices/chat';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    sugar: sugarReducer,
    heartrate: heartrateReducer,
    pressure: pressureReducer,
    userbmi: userbmiReducer,
    newdata: newdataReducer,
    userdata: userdataReducer,
    doctor: doctorReducer,
    chat: chatReducer,
  },
});
