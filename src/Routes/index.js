import { Router } from 'express';

import authMiddleware from '../app/middlewares/auth';

import Chat from './chatRouter';
import SessionsRouter from './sessionsRouter';
import RecoveryRouter from './recoveryRouter';
import UsersRouter from './usersRouter';
import TicketsRouter from './ticketsRouter';
import UploadsRouter from './uploadRouter';
import AppsRouter from './appsRouter';
import CadastroEmpresasRouter from './cadastroEmpresasRouter';
import Configs from './configsRouter';
import DemaisRotas from './demaisRotas';
import Obz2021 from './obz2021Router';
import TestesObz from './testes/obz';
import Simulador from './simuladorRouter';
import Microservicos from './microservicos.routes';

const routes = new Router();

routes.use('/sessions', SessionsRouter);
routes.use('/recovery', RecoveryRouter);
routes.use('/socket.io', Chat);

routes.use(authMiddleware);

routes.use('/apps', AppsRouter);
routes.use('/users', UsersRouter);
routes.use('/tickets', TicketsRouter);
routes.use('/configs', Configs);
routes.use('/uploads', UploadsRouter);
routes.use('/cadastro_empresas', CadastroEmpresasRouter);
routes.use('/testes_obz', TestesObz);
routes.use('/obz2021', Obz2021);
routes.use('/simulador', Simulador);
routes.use('/microservicos', Microservicos);

routes.use(DemaisRotas);

module.exports = routes;
