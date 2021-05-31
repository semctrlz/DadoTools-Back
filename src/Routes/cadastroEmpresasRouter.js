import { Router } from 'express';
import multer from 'multer';
import CadastroClientes from '../app/controllers/CadastroClientesController';
import CadastroClienteMessagesController from '../app/controllers/CadastroClienteMessagesController';
import DetalhesClientesController from '../app/controllers/DetalhesClientesController';
import multerS3 from '../config/multerS3Cadastros';

const routes = new Router();

const uploadS3 = multer(multerS3);

routes.get('/', CadastroClientes.index);
routes.get('/consulta', CadastroClientes.getCadastros);
routes.post('/upload', uploadS3.single('file'), CadastroClientes.upload);
routes.delete('/upload', CadastroClientes.deleteUpload);
routes.post('/', CadastroClientes.store);
routes.put('/', CadastroClientes.update);

routes.put('/status', CadastroClientes.changeStatus);
routes.get('/edit/:id', CadastroClientes.index);
routes.get('/:id', DetalhesClientesController.index);

routes.post('/detalhes', CadastroClienteMessagesController.store);
module.exports = routes;
