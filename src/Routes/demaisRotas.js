import { Router } from 'express';
import multer from 'multer';

import FileController from '../app/controllers/FileController';
import multerConfig from '../config/multer';

import GerenciarCadastroController from '../app/controllers/GerenciarCadastroController';
import NotificationController from '../app/controllers/NotificationController';
import OpcoesCadastroController from '../app/controllers/OpcoesCadastroController';
import CategoriaTicketsController from '../app/controllers/CategoriaTicketsController';
import SubcategoriaTicketsController from '../app/controllers/SubcategoriaTicketsController';
import SalesController from '../app/controllers/SalesController';

const uploadAvatar = multer(multerConfig);

const routes = new Router();

routes.get('/cadastros/gerenciar', GerenciarCadastroController.index);
routes.post(
  '/cadastros/gerenciar/salvar',
  GerenciarCadastroController.salvaConsolidado
);
routes.post(
  '/cadastros/gerenciar/exportar',
  GerenciarCadastroController.Exportar
);

routes.get('/saldo_sintegra', GerenciarCadastroController.SaldoSintegra);

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

routes.post('/files', uploadAvatar.single('file'), FileController.store);

routes.get('/notifications', NotificationController.index);
routes.put('/notifications/:id', NotificationController.update);

routes.get('/sales', SalesController.index);

module.exports = routes;
