import { Router } from 'express';
import multer from 'multer';

import multerConfig from './config/multer';
import multerTickets from './config/multerTickets';
import UserController from './app/controllers/UserController';
import SessionController from './app/controllers/SessionController';
import FileController from './app/controllers/FileController';
import SalesController from './app/controllers/SalesController';
import NotificationController from './app/controllers/NotificationController';
import AppController from './app/controllers/AppController';
import UserAppController from './app/controllers/UserAppController';
import CadastroClientes from './app/controllers/CadastroClientesController';
import OpcoesCadastroController from './app/controllers/OpcoesCadastroController';
import CadastroClientesController from './app/controllers/DetalhesClientesController';
import CadastroClienteMessagesController from './app/controllers/CadastroClienteMessagesController';
import CategoriaTicketsController from './app/controllers/CategoriaTicketsController';
import SubcategoriaTicketsController from './app/controllers/SubcategoriaTicketsController';
import UsuariosTicketsController from './app/controllers/UsuariosTicketsController';
import TicketsController from './app/controllers/TicketsController';
import UserTicketsController from './app/controllers/UserTicketsController';
import TicketUpdatesController from './app/controllers/TicketUpdatesController';
import EncerramentoTicketController from './app/controllers/EncerramentoTicketController';
import AnexoController from './app/controllers/AnexoController';
import AnexoUpdateController from './app/controllers/AnexoUpdateController';
import TicketsGruposController from './app/controllers/TicketsGruposController';

import authMiddleware from './app/middlewares/auth';

const routes = new Router();
const uploadAvatar = multer(multerConfig);
const uploadFiles = multer(multerTickets);

routes.post('/users', UserController.store);
routes.post('/sessions', SessionController.store);
routes.get('/sessions', SessionController.verify);

routes.use(authMiddleware);

routes.post('/files', uploadAvatar.single('file'), FileController.store);

routes.get('/notifications', NotificationController.index);
routes.put('/notifications/:id', NotificationController.update);

routes.put('/users', UserController.update);
routes.get('/sales', SalesController.index);

routes.get('/apps', AppController.index);
routes.delete('/apps', AppController.delete);
routes.put('/apps', AppController.update);

routes.get('/userapps', UserAppController.index);
routes.post('/userapps', UserAppController.store);

routes.post('/apps', AppController.store);

routes.post('/cadastro_empresas', CadastroClientes.store);
routes.put('/cadastro_empresas', CadastroClientes.update);
routes.get('/cadastro_empresas/:id', CadastroClientes.index);
routes.get('/cadastro_empresas', CadastroClientes.index);
routes.get(
  '/detalhes_cadastros_empresas/:id',
  CadastroClientesController.index
);
routes.post(
  '/detalhes_cadastros_empresas',
  CadastroClienteMessagesController.store
);

routes.post('/notify', NotificationController.create);

routes.get('/configs_cadastro', OpcoesCadastroController.index);

routes.get('/categorias', CategoriaTicketsController.index);
routes.post('/categorias', CategoriaTicketsController.store);
routes.put('/categorias', CategoriaTicketsController.update);
routes.delete('/categorias', CategoriaTicketsController.delete);

routes.get('/subcategorias', SubcategoriaTicketsController.index);
routes.post('/subcategorias', SubcategoriaTicketsController.store);
routes.put('/subcategorias', SubcategoriaTicketsController.update);
routes.delete('/subcategorias', SubcategoriaTicketsController.delete);

routes.get('/tickets/usuarios', UsuariosTicketsController.index);
routes.post('/tickets/usuarios', TicketsController.criaUsuario);

routes.get('/tickets', TicketsController.index);
routes.post('/tickets', TicketsController.store);
routes.put('/tickets/prazo', TicketsController.alterarPrazo);

routes.post(
  '/tickets/anexos/:id_ticket',
  uploadFiles.single('file'),
  AnexoController.store
);

routes.get('/tickets/inbox/:id', UserTicketsController.get_received);
routes.get('/tickets/inbox', UserTicketsController.inbox);

routes.get('/tickets/enviados/:id', UserTicketsController.get_sent);
routes.get('/tickets/enviados', UserTicketsController.enviados);

routes.get('/tickets/concluidos', UserTicketsController.concluidos);
routes.get(
  '/tickets/concluidos/filtro',
  UserTicketsController.concluidos_filtro
);

routes.get('/tickets/historico', UserTicketsController.historico);
routes.get('/tickets/historico/filtro', UserTicketsController.historico_filtro);

routes.get('/tickets/concluidos/:id', UserTicketsController.get_concluidos);

routes.get('/tickets/encerramento', EncerramentoTicketController.index);
routes.post('/tickets/encerramento', EncerramentoTicketController.store);

routes.get('/tickets/updates', TicketUpdatesController.index);
routes.post('/tickets/updates', TicketUpdatesController.store);

routes.post(
  '/tickets/updates/anexos/:id_update',
  uploadFiles.single('file'),
  AnexoUpdateController.store
);

routes.get('/tickets/grupos', TicketsGruposController.index);
routes.post('/tickets/grupos', TicketsGruposController.store);

module.exports = routes;
