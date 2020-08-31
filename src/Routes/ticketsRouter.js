import { Router } from 'express';
import multer from 'multer';
import UsuariosTicketsController from '../app/controllers/UsuariosTicketsController';
import TicketsController from '../app/controllers/TicketsController';
import UploadS3Controller from '../app/controllers/UploadS3Controller';
import AnexoController from '../app/controllers/AnexoController';
import multerTickets from '../config/multerTickets';
import multerS3 from '../config/multerS3';
import UserTicketsController from '../app/controllers/UserTicketsController';
import EncerramentoTicketController from '../app/controllers/EncerramentoTicketController';
import TicketUpdatesController from '../app/controllers/TicketUpdatesController';
import AnexoUpdateController from '../app/controllers/AnexoUpdateController';
import TicketsGruposController from '../app/controllers/TicketsGruposController';
import GestaoTicketController from '../app/controllers/GestaoTicketController';

const uploadFiles = multer(multerTickets);
const uploadS3 = multer(multerS3);
const routes = new Router();

routes.get('/', TicketsController.index);
routes.post('/', TicketsController.store);

routes.get('/usuarios', UsuariosTicketsController.index);
routes.post('/usuarios', TicketsController.criaUsuario);

routes.put('/prazo', TicketsController.alterarPrazo);

routes.post('/anexos', uploadFiles.single('file'), AnexoController.store);
routes.delete('/anexos', AnexoController.delete);

routes.post('/upload', uploadS3.single('file'), UploadS3Controller.store);
routes.delete('/upload/:id', UploadS3Controller.delete);
routes.get('/upload', UploadS3Controller.index);

routes.get('/inbox/:id', UserTicketsController.get_received);
routes.get('/inbox', UserTicketsController.inbox);

routes.get('/enviados/:id', UserTicketsController.get_sent);
routes.get('/enviados', UserTicketsController.enviados);

routes.get('/concluidos', UserTicketsController.concluidos);
routes.get('/concluidos/filtro', UserTicketsController.concluidos_filtro);
routes.get('/concluidos/:id', UserTicketsController.get_concluidos);

routes.get('/historico', UserTicketsController.historico);
routes.get('/historico/filtro', UserTicketsController.historico_filtro);

routes.post('/encaminhar', TicketsController.encaminharTicket);
routes.get('/encaminhados', UserTicketsController.encaminhados);

routes.get('/encerramento', EncerramentoTicketController.index);
routes.post('/encerramento', EncerramentoTicketController.store);
routes.post('/encerramento/avaliacao', EncerramentoTicketController.avaliacao);

routes.get('/updates', TicketUpdatesController.index);
routes.post('/updates', TicketUpdatesController.store);

routes.post(
  '/updates/anexos/:id_update',
  uploadFiles.single('file'),
  AnexoUpdateController.store
);

routes.get('/grupos', TicketsGruposController.index);
routes.post('/grupos/owner', TicketsGruposController.owner);
routes.post('/grupos', TicketsGruposController.store);
routes.put('/grupos', TicketsGruposController.update);
routes.delete('/grupos', TicketsGruposController.delete);
routes.post('/componentes', TicketsGruposController.addMembers);
routes.delete('/componentes', TicketsGruposController.removeMembers);
routes.put('/componentes', TicketsGruposController.updateMember);

routes.get('/gestao/inbox/:id', GestaoTicketController.inbox);
routes.get('/gestao/sent/:id', GestaoTicketController.get_sent);
routes.get('/gestao/received/:id', GestaoTicketController.get_received);
routes.get('/gestao/enviados/:id', GestaoTicketController.enviados);
routes.get('/gestao/concluidos/:id', GestaoTicketController.concluidos);
routes.get('/gestao/conclude/:id', GestaoTicketController.get_concluidos);

routes.get('/gestao/historico/:id', GestaoTicketController.historico);
routes.get('/historico/:id/filtro', UserTicketsController.historico_filtro);

routes.post('/notifications', UserTicketsController.notifications);

module.exports = routes;
