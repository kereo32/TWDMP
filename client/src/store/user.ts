import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { UserState } from '../types';

const initialState: UserState = {
  connectionId: '',
  userName: '',
  connectionDate: new Date().getTime(),
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    connectionSuccess(state: UserState, action: PayloadAction<UserState>) {
      state.connectionId = action.payload.connectionId;
      state.userName = action.payload.userName;
      state.connectionDate = action.payload.connectionDate;
    },
    disconnect(state: UserState) {
      state.connectionId = '';
      state.userName = '';
      state.connectionDate = new Date().getTime();
    },
  },
});

export const { connectionSuccess, disconnect } = userSlice.actions;
export default userSlice.reducer;
