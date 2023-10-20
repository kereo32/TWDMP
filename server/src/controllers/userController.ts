import { Socket, Server as SocketIOServer } from 'socket.io';

class UserController {
  private io: SocketIOServer;

  constructor(io: SocketIOServer) {
    this.io = io;

    this.io.on('connection', (socket) => {
      this.handleUserConnection(socket);

      socket.on('disconnect', () => {
        this.handleUserDisconnection(socket);
      });
    });
  }

  init() {
    console.log('user controller has started');
  }

  private handleUserConnection(socket: Socket) {
    console.log('A user connected');

    // You can send a welcome message to the newly connected user
    socket.emit('welcome', 'Welcome to the chat room!');
  }

  // Method to handle user disconnections
  private handleUserDisconnection(socket: Socket) {
    console.log('User disconnected');

    // You can perform cleanup tasks, update user status, or notify other users
  }
}

export default UserController;
