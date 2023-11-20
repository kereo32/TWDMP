type UserState = {
  userName: string;
  roomId: string;
  canJoinRoom: boolean;
  errorMessage: string;
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
  messages: { userName: string; message: string }[];
  isFull: boolean;
};

type StoreState = {
  user: { userName: string; roomId: string; canJoinRoom: boolean; errorMessage: string };
  room: {
    roomID: string;
    players: { name: string; gold: number; playerTurn: boolean; playerReady: boolean }[];
    gameState: string;
    currentBet: number;
    isRolling: boolean;
    roll: number;
    rollHistory: number[];
    messages: { userName: string; message: string }[];
    isFull: boolean;
  };
  socket: {
    connected: boolean;
    connectionId: string;
    connectionDate: number;
  };
};

export type { StoreState, UserState, SocketState, RoomState };
