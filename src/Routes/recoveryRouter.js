import { Router } from 'express';
import RecoveryController from '../app/controllers/RecoveryController';

const routes = new Router();

routes.post('/', RecoveryController.store);
routes.put('/', RecoveryController.alterarSenha);
routes.get('/:token', RecoveryController.index);

module.exports = routes;
