import { Router } from 'express';

import Obz2021 from '../app/obz/2021';
import ExportaExcel from '../app/obz/2021/Services/exportaExcel';

const routes = new Router();

routes.use('/sintetico', async (req, res) => {
  const sintetico = await Obz2021.OBZ2021_Sintetico();
  return res.json(sintetico);
});
routes.use('/analitico', async (req, res) => {
  const analitico = await Obz2021.OBZ2021_Analitico();
  return res.json(analitico);
});
routes.use('/excel', async (req, res) => {
  const local = await ExportaExcel();
  return res.json({ Link: local });
});

module.exports = routes;
