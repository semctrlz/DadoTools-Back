import { Router } from 'express';

import MicroServicosAcessoController from '../app/controllers/MicroServicosAcessoController';
import MicroServicosConfigController from '../app/controllers/MicroServicosConfigController';
import ImportaFolha from './Microservicos/importa_folha.routes';
import PosicaoEstoque from './Microservicos/posicao_estoque.routes';

const routes = new Router();

routes.get('/acessos', MicroServicosAcessoController.index);
routes.post('/acessos', MicroServicosAcessoController.store);

routes.get('/configs', MicroServicosConfigController.index);
routes.post('/configs', MicroServicosConfigController.store);

routes.use('/importa_folha', ImportaFolha);
routes.use('/posicao_estoque', PosicaoEstoque);

module.exports = routes;
