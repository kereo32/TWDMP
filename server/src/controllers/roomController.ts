import { Socket, Server as SocketIOServer } from 'socket.io';
import BaseController from './baseController';

class RoomController extends BaseController {
  private rooms: Map<string, { users: { socketId: string; userName: string }[]; gameState: string; currentBet: number }> = new Map();
  private messages = new Map<string, { userName: string; message: string }[]>();

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
    socket.on('updatePlayerGold', (data: { roomID: string; playerIndex: number; goldChange: number }) => {
      const { roomID, playerIndex, goldChange } = data;
      const room = this.rooms.get(roomID);

      if (room) {
        if (playerIndex === 0) {
          this.players.get(roomID)[playerIndex].gold += goldChange;
          this.players.get(roomID)[1].gold -= goldChange;
        } else if (playerIndex === 1) {
          this.players.get(roomID)[playerIndex].gold += goldChange;
          this.players.get(roomID)[0].gold -= goldChange;
        }

        this.io.to(roomID).emit('updatePlayerGold', this.players.get(roomID));
      }
    });

    socket.on('updatePlayerTurn', (data: { roomID: string; playerIndex: number; playerTurn: boolean }) => {
      const { roomID, playerIndex, playerTurn } = data;
      const room = this.rooms.get(roomID);

      if (room) {
        this.players.get(roomID)[playerIndex].playerTurn = playerTurn;
        this.io.to(roomID).emit('updatePlayerTurn', { playerIndex, playerTurn });
      }
    });
    socket.on('updateGameState', (data: { roomID: string; gameState: string }) => {
      const { roomID, gameState } = data;
      const room = this.rooms.get(roomID);

      if (room) {
        this.io.to(roomID).emit('updateGameState', gameState);
      }
    });

    socket.on('updateCurrentBet', (data: { roomID: string; currentBet: number }) => {
      const { roomID, currentBet } = data;
      const room = this.rooms.get(roomID);

      if (room) {
        this.io.to(roomID).emit('updateCurrentBet', currentBet);
      }
    });

    socket.on('updatePlayerReadyStatus', (data: { roomID: string; playerIndex: string; playerReady: boolean }) => {
      const { roomID, playerIndex, playerReady } = data;
      const room = this.rooms.get(roomID);

      if (room) {
        this.players.get(roomID)[playerIndex].playerReady = playerReady;
        this.io.to(roomID).emit('updatePlayerReadyStatus', { playerIndex, playerReady });
      }
    });

    socket.on('updateRollingState', (data: { roomID: string; isRolling: boolean }) => {
      const { roomID, isRolling } = data;
      const room = this.rooms.get(roomID);

      if (room) {
        this.io.to(roomID).emit('updateRollingState', isRolling);
      }
    });
    socket.on('updateRoll', (data: { roomID: string; roll: number }) => {
      const { roomID, roll } = data;
      const room = this.rooms.get(roomID);

      if (room) {
        this.io.to(roomID).emit('updateRoll', roll);
      }
    });
    socket.on('chat message', (data: { roomID: string; userName: string; message: string }) => {
      const { roomID, userName, message } = data;
      const room = this.rooms.get(roomID);

      if (room) {
        const messages = this.messages.get(roomID) || [];
        messages.push({ userName, message });
        this.messages.set(roomID, messages);
        this.io.to(roomID).emit('chat message', messages);
      }
    });
  }

  createOrJoinRoom(socket: Socket, data: { roomID: string; userName: string }) {
    const { roomID, userName } = data;

    if (!this.rooms.has(roomID)) {
      this.rooms.set(roomID, { users: [{ socketId: socket.id, userName }], gameState: 'waiting', currentBet: 0 });
      socket.join(roomID);
      socket.emit('roomCreated', { roomID });
    } else {
      const room = this.rooms.get(roomID);
      if (room && room.users.length < 2) {
        room.users.push({ socketId: socket.id, userName });
        socket.join(roomID);
        socket.emit('roomJoined', { roomID });
        const existingPlayers = this.players.get(roomID) || [];
        const newPlayerData = room.users.map((user) => ({
          name: user.userName,
          gold: 1000,
          playerTurn: false,
          playerReady: false,
        }));

        const updatedPlayers = [...existingPlayers, ...newPlayerData];
        this.players.set(roomID, updatedPlayers);

        if (room.users.length === 2) {
          this.io
            .to(roomID)
            .emit('gameReady', { roomID, players: this.players.get(roomID), gameState: 'GAME_BET', currentBet: 100, isRolling: false, roll: 0 });
        }
      } else {
        socket.emit('roomFull', { roomID });
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
