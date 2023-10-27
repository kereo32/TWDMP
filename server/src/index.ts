import server from './server';
// import UserController from './controllers/userController';
import RoomController from './controllers/roomController';
import BaseController from './controllers/baseController';

const baseController = new BaseController(server);
// const userController = new UserController(server);
const roomController = new RoomController(server);
