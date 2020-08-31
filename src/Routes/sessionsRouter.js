import { Router } from 'express';

import SessionController from '../app/controllers/SessionController';

const routes = new Router();

routes.post('/', SessionController.store);
routes.get('/', SessionController.verify);

module.exports = routes;
