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
  users: UserState[];
};

export type { UserState, SocketState, RoomState };
