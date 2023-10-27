import { configureStore } from '@reduxjs/toolkit';
import userReducer from './user';
import socketReducer from './socket';
import roomReducer from './room';

const store = configureStore({
  reducer: {
    user: userReducer,
    socket: socketReducer,
    room: roomReducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware(),
});

export default store;
