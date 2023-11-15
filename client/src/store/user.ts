import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { UserState } from '../types';
import SocketService from '../services/SocketService';

const initialState: UserState = {
  userName: '',
  roomId: '',
  canJoinRoom: false,
  errorMessage: '',
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
      state.canJoinRoom = action.payload;
    },
    resetUserInformation(state: UserState) {
      state.roomId = '';
      state.canJoinRoom = false;
    },
    updateErrorMessage(state: UserState, action: PayloadAction<string>) {
      if (action.payload) {
        state.errorMessage = `${action.payload} Room Is full! Please try another one.`;
      } else {
        state.errorMessage = '';
      }
    },
  },
});

export const { updateUserInformation, updateUserRoomId, updatePlayerStatus, resetUserInformation, updateErrorMessage } = userSlice.actions;
export default userSlice.reducer;
