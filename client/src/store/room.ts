// socketSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RoomState } from '../types';

const initialState: RoomState = {
  roomID: '',
  users: [],
};

const roomSlice = createSlice({
  name: 'room',
  initialState,
  reducers: {
    updateRoom(state: RoomState, action: PayloadAction<RoomState>) {
      state.roomID = action.payload.roomID;
      state.users = action.payload.users;
    },
  },
});

export const { updateRoom } = roomSlice.actions;
export default roomSlice.reducer;
