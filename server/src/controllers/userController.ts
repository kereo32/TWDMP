import { Socket, Server as SocketIOServer } from 'socket.io';
//bunu basecontrollera çevir, oradan da usercontrollera extend et
class UserController {
  private io: SocketIOServer;
  private players = new Map();

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
    console.log('User connected');

    socket.on('userJoined', (data) => {
      const { userName } = data;

      this.players.set(socket.id, { userName });

      this.io.emit('updatePlayers', Array.from(this.players.values()));
    });

    socket.emit('welcome', 'Welcome to the chat room!');
  }

  private handleUserDisconnection(socket: Socket) {
    console.log('User disconnected');

    this.players.delete(socket.id);

    this.io.emit('updatePlayers', Array.from(this.players.values()));
  }
}

export default UserController;
