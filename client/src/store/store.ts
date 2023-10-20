import { configureStore } from '@reduxjs/toolkit';
import userReducer from './user';
import socketReducer from './socket';

const store = configureStore({
  reducer: {
    user: userReducer,
    socket: socketReducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware(),
});

export default store;
