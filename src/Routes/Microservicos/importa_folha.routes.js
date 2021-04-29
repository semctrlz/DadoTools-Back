import { Router } from 'express';

import ImportaFolhaController from '../../app/controllers/Microservicos/ImportaFolhaController';

const routes = new Router();

routes.post('/', ImportaFolhaController.process);

module.exports = routes;
