import { Router } from 'express';

import AppController from '../app/controllers/AppController';

const routes = new Router();

routes.get('/', AppController.index);
routes.delete('/', AppController.delete);
routes.put('/', AppController.update);
routes.post('/', AppController.store);

module.exports = routes;
