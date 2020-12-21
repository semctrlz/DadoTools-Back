import { Router } from 'express';

import ConfigsController from '../app/controllers/ConfigsController';

const routes = new Router();

routes.post('/', ConfigsController.store);
routes.delete('/', ConfigsController.delete);

// Rotas onde buscamos apenas as configurações mais recentes
routes.get('/produtos', ConfigsController.produtos);
routes.get('/impostos', ConfigsController.impostos);
routes.get('/custos', ConfigsController.custos);
routes.get('/despesas', ConfigsController.despesas);
routes.get('/marketing', ConfigsController.marketing);
routes.get('/fretes', ConfigsController.fretes);
routes.get('/produtosBase', ConfigsController.produtosBase);

routes.get('/parametros', ConfigsController.parametros);

module.exports = routes;
