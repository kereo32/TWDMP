import { Socket, Server as SocketIOServer } from 'socket.io';

class BaseController {
  protected io: SocketIOServer;
  protected players = new Map();

  constructor(io: SocketIOServer) {
    this.io = io;
    this.io.on('connection', (socket) => {
      this.handleUserConnection(socket);

      socket.on('disconnect', () => {
        this.handleUserDisconnection(socket);
      });
    });
  }

  protected handleUserConnection(socket: Socket) {
    console.log('User connected');

    socket.emit('welcome', 'Welcome to the chat room!');
  }

  protected handleUserDisconnection(socket: Socket) {
    this.io.emit('updatePlayers', Array.from(this.players.values()));
  }
}

export default BaseController;
