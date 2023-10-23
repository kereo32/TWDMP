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
    updateUserRoomIdByJoin(state: UserState, action: PayloadAction<string>) {
      state.roomId = action.payload;

      SocketService.emit('joinRoom', { roomID: state.roomId, userName: state.userName });
    },
    updateUserRoomIdByCreate(state: UserState, action: PayloadAction<string>) {
      state.roomId = action.payload;

      SocketService.emit('createRoom', { roomID: state.roomId, userName: state.userName });
    },
    updatePlayerStatus(state: UserState, action: PayloadAction<boolean>) {
      console.log(action.payload, 'xd');
      state.canJoinRoom = action.payload;
    },
    resetUserInformation(state: UserState) {
      state.userName = '';
      state.roomId = '';
      state.canJoinRoom = false;
    },
  },
});

export const { updateUserInformation, updateUserRoomIdByJoin, updateUserRoomIdByCreate, updatePlayerStatus, resetUserInformation } = userSlice.actions;
export default userSlice.reducer;
