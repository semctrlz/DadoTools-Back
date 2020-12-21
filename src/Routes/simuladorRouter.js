import { Router } from 'express';

import Simulador from '../app/controllers/SimuladorCenariosController';

const routes = new Router();

routes.get('/', Simulador.index);
routes.post('/', Simulador.store);
routes.delete('/', Simulador.delete);
routes.put('/', Simulador.update);

// Rotas onde buscamos apenas as configurações mais recentes

module.exports = routes;
