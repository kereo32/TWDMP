// socketSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { SocketState } from '../types';

const initialState: SocketState = {
  connected: false,
  connectionId: '',
  connectionDate: new Date().getTime(),
};

const socketSlice = createSlice({
  name: 'socket',
  initialState,
  reducers: {
    connectSocket(state: SocketState, action: PayloadAction<SocketState>) {
      state.connected = action.payload.connected;
      state.connectionId = action.payload.connectionId;
      state.connectionDate = action.payload.connectionDate;
    },
    disconnectSocket(state: SocketState) {
      state.connected = false;
      state.connectionId = '';
      state.connectionDate = new Date().getTime();
    },
  },
});

export const { connectSocket, disconnectSocket } = socketSlice.actions;
export default socketSlice.reducer;
