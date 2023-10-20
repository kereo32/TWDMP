import http from 'http';
import app from './app';
import socketServer from './socket';

const port = process.env.PORT || '9000';
app.set('port', port);

const server: http.Server = http.createServer(app);

server.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

const io = socketServer(server);

export default io;
