import { Router } from 'express';

import authMiddleware from '../app/middlewares/auth';

import SessionsRouter from './sessionsRouter';
import RecpveryRouter from './recoveryRouter';
import UsersRouter from './usersRouter';
import TicketsRouter from './ticketsRouter';
import UploadsRouter from './uploadRouter';
import AppsRouter from './appsRoputer';
import CadastroEmpresasRouter from './cadastroEmpresasRouter';
import Configs from './configsRouter';
import DemaisRotas from './demaisRotas';

const routes = new Router();

routes.use('/sessions', SessionsRouter);
routes.use('/recovery', RecpveryRouter);

routes.use(authMiddleware);

routes.use('/apps', AppsRouter);
routes.use('/users', UsersRouter);
routes.use('/tickets', TicketsRouter);
routes.use('/configs', Configs);
routes.use('/uploads', UploadsRouter);
routes.use('/cadastro_empresas', CadastroEmpresasRouter);
routes.use(DemaisRotas);

module.exports = routes;
