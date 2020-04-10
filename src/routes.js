import {Router} from 'express';
import multer from 'multer';

import multerConfig from './config/multer';
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


import authMiddleware from './app/middlewares/auth';

const routes = new Router();
const upload = multer(multerConfig);

routes.post('/users', UserController.store);
routes.post('/sessions', SessionController.store);
routes.get('/sessions', SessionController.verify);


routes.use(authMiddleware);

routes.post('/files', upload.single('file'), FileController.store);

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
routes.get('/detalhes_cadastros_empresas/:id', CadastroClientesController.index);
routes.post('/detalhes_cadastros_empresas', CadastroClienteMessagesController.store);

routes.get('/configs_cadastro', OpcoesCadastroController.index);

module.exports = routes;


