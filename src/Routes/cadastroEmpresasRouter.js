import { Router } from 'express';
import CadastroClientes from '../app/controllers/CadastroClientesController';
import CadastroClienteMessagesController from '../app/controllers/CadastroClienteMessagesController';
import DetalhesClientesController from '../app/controllers/DetalhesClientesController';

const routes = new Router();

routes.post('/', CadastroClientes.store);
routes.put('/', CadastroClientes.update);
routes.put('/status', CadastroClientes.changeStatus);
routes.get('/:id', DetalhesClientesController.index);
routes.get('/edit/:id', CadastroClientes.index);
routes.get('/', CadastroClientes.index);

routes.post('/detalhes', CadastroClienteMessagesController.store);
module.exports = routes;
