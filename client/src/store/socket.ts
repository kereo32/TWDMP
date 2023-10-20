// socketSlice.ts
import { createSlice } from '@reduxjs/toolkit';
import SocketService from '../services/SocketService';

interface SocketState {
  connected: boolean;
}

const initialState: SocketState = {
  connected: false,
};

const socketSlice = createSlice({
  name: 'socket',
  initialState,
  reducers: {
    connectSocket(state) {
      SocketService.connect('http://localhost:9000');
      state.connected = true;
    },
    disconnectSocket(state) {
      SocketService.disconnect();
      state.connected = false;
    },
  },
});

export const { connectSocket, disconnectSocket } = socketSlice.actions;
export default socketSlice.reducer;
