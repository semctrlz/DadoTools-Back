import { Router } from 'express';

import GlobalVars from '../../app/obz/2021/GlobalVars';
import Conta from '../../app/obz/2021/Calculos/TI/ServicosInformatica';
import MercadoInterno from '../../app/obz/2021/Calculos/Receitas/MercadoInterno';
import Sim from '../../app/obz/2021/GlobalVars/Simulador/Volumes';

const routes = new Router();

routes.get('/ql_geral', (req, res) => {
  return res.json(GlobalVars.QlGeral(2021, 12));
});
routes.get('/ql_comercial', (req, res) => {
  return res.json(GlobalVars.QlComercial(2021, 11));
});
routes.get('/ql_adm', (req, res) => {
  return res.json(GlobalVars.QlAdm(2021, 12));
});
routes.get('/areas', (req, res) => {
  return res.json(GlobalVars.Areas(2021));
});
routes.get('/ql_rh', (req, res) => {
  return res.json(GlobalVars.QlRH(2021, 1));
});
routes.get('/conta/:mes', (req, res) => {
  const { mes = 0 } = req.params;
  return res.json(Conta(2021, Number(mes)));
});
routes.get('/simulador/:mes', async (req, res) => {
  const { mes = 0 } = req.params;
  const dados = await Sim(2021, Number(mes));
  return res.json(dados);
});
routes.get('/receita/:mes', async (req, res) => {
  const { mes = 0 } = req.params;
  const dados = await MercadoInterno(2021, Number(mes));
  return res.json(dados);
});
routes.get('/conta', (req, res) => {
  let mes = [];
  for (let i = 1; i <= 12; i++) {
    mes = [...mes, { mes: i, Conta: Conta(2021, i) }];
  }
  return res.json(mes);
});
routes.get('/fixos/salarioBase', (req, res) => {
  return res.json(GlobalVars.FixosSalariosBase(2021, 1));
});
routes.get('/fixos/salarios', (req, res) => {
  return res.json(GlobalVars.FixosSalariosBase(2021, 1));
});

module.exports = routes;
