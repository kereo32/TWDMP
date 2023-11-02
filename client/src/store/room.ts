// socketSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RoomState } from '../types';

const initialState: RoomState = {
  roomID: '',
  players: [{ name: '', gold: 1000, playerTurn: false, playerReady: false }],
  gameState: '',
  currentBet: 0,
  isRolling: false,
  roll: 0,
};

const roomSlice = createSlice({
  name: 'room',
  initialState,
  reducers: {
    initializeRoom(state: RoomState, action: PayloadAction<RoomState>) {
      state.roomID = action.payload.roomID;
      state.players = action.payload.players;
      state.gameState = action.payload.gameState;
      state.currentBet = action.payload.currentBet;
      state.isRolling = action.payload.isRolling;
      state.roll = action.payload.roll;
    },
    updatePlayerGold(state: RoomState, action: PayloadAction<{ name: string; gold: number; playerTurn: boolean; playerReady: boolean }[]>) {
      state.players = action.payload;
    },
    updatePlayerTurn(state: RoomState, action: PayloadAction<{ playerIndex: number; playerTurn: boolean }>) {
      state.players[action.payload.playerIndex].playerTurn = action.payload.playerTurn;
    },
    updateGameState(state: RoomState, action: PayloadAction<string>) {
      state.gameState = action.payload;
    },
    updateCurrentBet(state: RoomState, action: PayloadAction<number>) {
      state.currentBet = action.payload;
    },
    updatePlayerReadyStatus(state: RoomState, action: PayloadAction<{ playerIndex: number; playerReady: boolean }>) {
      state.players[action.payload.playerIndex].playerReady = action.payload.playerReady;
    },
    updateRollingState(state: RoomState, action: PayloadAction<boolean>) {
      state.isRolling = action.payload;
    },
    updateRoll(state: RoomState, action: PayloadAction<number>) {
      state.roll = action.payload;
    },
  },
});

export const {
  initializeRoom,
  updatePlayerTurn,
  updateCurrentBet,
  updateGameState,
  updatePlayerGold,
  updatePlayerReadyStatus,
  updateRollingState,
  updateRoll,
} = roomSlice.actions;
export default roomSlice.reducer;
