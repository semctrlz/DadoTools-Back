import { Router } from 'express';
import UserController from '../app/controllers/UserController';
import UserAppController from '../app/controllers/UserAppController';

const routes = new Router();

routes.post('/', UserController.store);
routes.get('/', UserController.index);
routes.put('/', UserController.update);

routes.get('/apps', UserAppController.index);
routes.delete('/apps', UserAppController.delete);
routes.post('/apps', UserAppController.store);

routes.get('/apps/:rota', UserAppController.NivelApp);

routes.put('/update', UserController.updateUser);

module.exports = routes;
