import { Socket, Server as SocketIOServer } from 'socket.io';
import BaseController from './baseController';

class RoomController extends BaseController {
  private rooms: Map<string, { users: { socketId: string; userName: string }[] }> = new Map();

  constructor(server: SocketIOServer) {
    super(server);
  }

  handleUserConnection(socket: Socket) {
    super.handleUserConnection(socket);

    socket.on('joinRoom', (data: { roomID: string; userName: string }) => {
      this.createOrJoinRoom(socket, data);
    });

    socket.on('createRoom', (data: { roomID: string; userName: string }) => {
      this.createOrJoinRoom(socket, data);
    });
  }

  createOrJoinRoom(socket: Socket, data: { roomID: string; userName: string }) {
    const { roomID, userName } = data;

    if (!this.rooms.has(roomID)) {
      this.rooms.set(roomID, { users: [{ socketId: socket.id, userName }] });
      socket.join(roomID);
      socket.emit('roomCreated', { roomID });
    } else {
      const room = this.rooms.get(roomID);
      if (room && room.users.length < 2) {
        room.users.push({ socketId: socket.id, userName });
        socket.join(roomID);
        socket.emit('roomJoined', { roomID });
        const users = room.users.map((user) => user.userName);
        if (users.length === 2) {
          this.io.to(roomID).emit('gameReady', { roomID, users });
          console.log('gameready worked', users);
        }
      } else {
        socket.to(roomID).emit('roomFull', { roomID });
        console.log('roomfull');
      }
    }
  }

  handleUserDisconnection(socket: Socket) {
    super.handleUserDisconnection(socket);
    console.log(this.rooms, 'rooms');

    const roomsToLeave: string[] = [];

    this.rooms.forEach((room, roomID) => {
      const { users } = room;

      const userIndex = users.findIndex((user) => user.socketId === socket.id);

      if (userIndex !== -1) {
        users.splice(userIndex, 1);

        if (users.length === 0) {
          roomsToLeave.push(roomID);
        }
      }
    });

    roomsToLeave.forEach((roomID) => {
      this.io.to(roomID).emit('roomClosed', { roomID });
      this.rooms.delete(roomID);
    });
    console.log(this.rooms, 'rooms');
  }
}

export default RoomController;
