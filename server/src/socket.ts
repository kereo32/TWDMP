import { Server as SocketIOServer } from 'socket.io';
import { Server } from 'http';

export default (httpServer: Server) => {
  const io: SocketIOServer = new SocketIOServer(httpServer, {
    cors: {
      origin: '*',
      methods: ['GET', 'POST'],
    },
  });

  return io;
};
