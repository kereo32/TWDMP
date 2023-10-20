import { Server as SocketIOServer } from 'socket.io';
import { Server } from 'http';

export default (httpServer: Server) => {
  const io: SocketIOServer = new SocketIOServer(httpServer, {
    cors: {
      origin: 'http://localhost:5173',
      methods: ['GET', 'POST'],
    },
  });

  return io;
};
