"use strict"; function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _express = require('express');
var _multer = require('multer'); var _multer2 = _interopRequireDefault(_multer);

var _multer3 = require('./config/multer'); var _multer4 = _interopRequireDefault(_multer3);
var _UserController = require('./app/controllers/UserController'); var _UserController2 = _interopRequireDefault(_UserController);
var _SessionController = require('./app/controllers/SessionController'); var _SessionController2 = _interopRequireDefault(_SessionController);
var _FileController = require('./app/controllers/FileController'); var _FileController2 = _interopRequireDefault(_FileController);
var _SalesController = require('./app/controllers/SalesController'); var _SalesController2 = _interopRequireDefault(_SalesController);
var _NotificationController = require('./app/controllers/NotificationController'); var _NotificationController2 = _interopRequireDefault(_NotificationController);
var _AppController = require('./app/controllers/AppController'); var _AppController2 = _interopRequireDefault(_AppController);
var _UserAppController = require('./app/controllers/UserAppController'); var _UserAppController2 = _interopRequireDefault(_UserAppController);
var _CadastroClientesController = require('./app/controllers/CadastroClientesController'); var _CadastroClientesController2 = _interopRequireDefault(_CadastroClientesController);
var _OpcoesCadastroController = require('./app/controllers/OpcoesCadastroController'); var _OpcoesCadastroController2 = _interopRequireDefault(_OpcoesCadastroController);
var _DetalhesClientesController = require('./app/controllers/DetalhesClientesController'); var _DetalhesClientesController2 = _interopRequireDefault(_DetalhesClientesController);
var _CadastroClienteMessagesController = require('./app/controllers/CadastroClienteMessagesController'); var _CadastroClienteMessagesController2 = _interopRequireDefault(_CadastroClienteMessagesController);


var _auth = require('./app/middlewares/auth'); var _auth2 = _interopRequireDefault(_auth);

const routes = new (0, _express.Router)();
const upload = _multer2.default.call(void 0, _multer4.default);

routes.post('/users', _UserController2.default.store);
routes.post('/sessions', _SessionController2.default.store);
routes.get('/sessions', _SessionController2.default.verify);


routes.use(_auth2.default);

routes.post('/files', upload.single('file'), _FileController2.default.store);

routes.get('/notifications', _NotificationController2.default.index);
routes.put('/notifications/:id', _NotificationController2.default.update);

routes.put('/users', _UserController2.default.update);
routes.get('/sales', _SalesController2.default.index);

routes.get('/apps', _AppController2.default.index);
routes.delete('/apps', _AppController2.default.delete);
routes.put('/apps', _AppController2.default.update);

routes.get('/userapps', _UserAppController2.default.index);
routes.post('/userapps', _UserAppController2.default.store);

routes.post('/apps', _AppController2.default.store);

routes.post('/cadastro_empresas', _CadastroClientesController2.default.store);
routes.put('/cadastro_empresas', _CadastroClientesController2.default.update);
routes.get('/cadastro_empresas/:id', _CadastroClientesController2.default.index);
routes.get('/cadastro_empresas', _CadastroClientesController2.default.index);
routes.get('/detalhes_cadastros_empresas/:id', _DetalhesClientesController2.default.index);
routes.post('/detalhes_cadastros_empresas', _CadastroClienteMessagesController2.default.store);

routes.get('/configs_cadastro', _OpcoesCadastroController2.default.index);

module.exports = routes;


