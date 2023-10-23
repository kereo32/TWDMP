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

export type { UserState, SocketState };
