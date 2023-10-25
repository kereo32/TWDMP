import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { UserState } from '../types';
import SocketService from '../services/SocketService';

const initialState: UserState = {
  userName: '',
  roomId: '',
  canJoinRoom: false,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    updateUserInformation(state: UserState, action: PayloadAction<UserState>) {
      state.userName = action.payload.userName;

      SocketService.emit('userJoined', { userName: state.userName });
    },
    updateUserRoomId(state: UserState, action: PayloadAction<string>) {
      state.roomId = action.payload;

      SocketService.emit('joinRoom', { roomID: state.roomId, userName: state.userName });
    },
    updatePlayerStatus(state: UserState, action: PayloadAction<boolean>) {
      console.log(action.payload, 'gameReady worked');

      console.log(state.userName);
      state.canJoinRoom = action.payload;
    },
    resetUserInformation(state: UserState) {
      state.userName = '';
      state.roomId = '';
      state.canJoinRoom = false;
    },
  },
});

export const { updateUserInformation, updateUserRoomId, updatePlayerStatus, resetUserInformation } = userSlice.actions;
export default userSlice.reducer;
