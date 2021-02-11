import { Router } from 'express';
// import Chat from '../app/controllers/ChatController';

const routes = new Router();

routes.get('/', (req, res) => {
  res.send();
});
// routes.post('/:id', Chat.index);

module.exports = routes;
