import { Router } from 'express';

import ConfigsController from '../app/controllers/ConfigsController';

const routes = new Router();

routes.post('/', ConfigsController.store);
routes.delete('/', ConfigsController.delete);

// Rotas onde buscamos apenas as configurações mais recentes
routes.get('/produtos', ConfigsController.produtos);
routes.get('/impostos', ConfigsController.impostos);
routes.get('/produtosBase', ConfigsController.produtosBase);

module.exports = routes;
