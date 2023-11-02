type UserState = {
  userName: string;
  roomId: string;
  canJoinRoom: boolean;
};

type SocketState = {
  connected: boolean;
  connectionId: string;
  connectionDate: number;
};

type RoomState = {
  roomID: string;
  players: { name: string; gold: number; playerTurn: boolean; playerReady: boolean }[];
  gameState: string;
  currentBet: number;
  isRolling: boolean;
  roll: number;
  rollHistory: number[];
};

export type { UserState, SocketState, RoomState };
