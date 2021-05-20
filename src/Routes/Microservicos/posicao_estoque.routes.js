import { Router } from 'express';

import PosicaoEstoqueController from '../../app/controllers/Microservicos/PosicaoEstoqueController';

const routes = new Router();

routes.get('/', PosicaoEstoqueController.getDailyData);
routes.get('/materiais', PosicaoEstoqueController.getMateriais);
routes.get('/contagem', PosicaoEstoqueController.getContagem);
routes.post('/contagem', PosicaoEstoqueController.storeContagem);

module.exports = routes;
