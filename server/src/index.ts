import server from './server';
import UserController from './controllers/userController';

const userController = new UserController(server);
