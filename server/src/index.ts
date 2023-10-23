import server from './server';
import UserController from './controllers/userController';
import RoomController from './controllers/roomController';

const userController = new UserController(server);
const roomController = new RoomController(server);
