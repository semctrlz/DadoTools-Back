import { Router } from 'express';

import SessionController from '../app/controllers/SessionController';
import authMiddleware from '../app/middlewares/auth';

const routes = new Router();

routes.post('/', SessionController.store);
routes.get('/', SessionController.verify);

routes.use(authMiddleware);

routes.post('/refresh', SessionController.update);

module.exports = routes;
