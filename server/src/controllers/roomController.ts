import { Socket, Server as SocketIOServer } from 'socket.io';

class RoomController {
  private io: SocketIOServer;
  private rooms: Map<string, { users: string[] }> = new Map();

  constructor(io: SocketIOServer) {
    this.io = io;

    this.io.on('connection', (socket) => {
      socket.on('joinRoom', (data: { roomID: string; userName: string }) => {
        console.log('joined');
        this.createOrJoinRoom(socket, data);
      });

      socket.on('createRoom', (data: { roomID: string; userName: string }) => {
        this.createOrJoinRoom(socket, data);
      });
    });
  }

  createOrJoinRoom(socket: Socket, data: { roomID: string; userName: string }) {
    const { roomID, userName } = data;
    console.log(roomID, userName);

    if (!this.rooms.has(roomID)) {
      this.rooms.set(roomID, { users: [userName] });
      socket.join(roomID);
      socket.emit('roomCreated', { roomID });
    } else {
      const room = this.rooms.get(roomID);
      console.log(room);
      if (room && room.users.length < 2) {
        room.users.push(userName);
        socket.join(roomID);
        socket.emit('roomJoined', { roomID });
        const users = room.users;
        console.log(users, 'us');
        users.length > 1 && socket.to(roomID).emit('gameReady', { roomID, users });
      } else {
        const room = this.rooms.get(roomID);
        const users = room?.users;
        socket.to(roomID).emit('roomFull', { roomID, users });
      }
    }
  }

  handleUserDisconnection(socket: Socket) {
    const roomsToLeave: string[] = [];

    this.rooms.forEach((room, roomID) => {
      const { users } = room;
      const index = users.indexOf(socket.id);
      if (index !== -1) {
        users.splice(index, 1);
        if (users.length === 0) {
          roomsToLeave.push(roomID);
        }
      }
    });

    roomsToLeave.forEach((roomID) => {
      this.rooms.delete(roomID);
      this.io.to(roomID).emit('roomClosed', { roomID });
    });
  }
}

export default RoomController;
