import { cenariosValidos } from '../../Calculos/Receitas/MercadoInterno';

import Cenarios from '../../../../models/SimuladorCenarios';

// const variavel = {
//   VendaInterna: [
//     { mes: 1, estado: 'RS', Litros: 1430396, percentualDist: 0.35 },
//     { mes: 2, estado: 'RS', Litros: 1143596, percentualDist: 0.35 },
//     { mes: 3, estado: 'RS', Litros: 876846, percentualDist: 0.35 },
//     { mes: 4, estado: 'RS', Litros: 720296, percentualDist: 0.35 },
//     { mes: 5, estado: 'RS', Litros: 652496, percentualDist: 0.35 },
//     { mes: 6, estado: 'RS', Litros: 652496, percentualDist: 0.35 },
//     { mes: 7, estado: 'RS', Litros: 750996, percentualDist: 0.35 },
//     { mes: 8, estado: 'RS', Litros: 832795, percentualDist: 0.35 },
//     { mes: 9, estado: 'RS', Litros: 1548547, percentualDist: 0.35 },
//     { mes: 10, estado: 'RS', Litros: 2022196, percentualDist: 0.35 },
//     { mes: 11, estado: 'RS', Litros: 2176997, percentualDist: 0.35 },
//     { mes: 12, estado: 'RS', Litros: 2221426, percentualDist: 0.35 },
//     { mes: 1, estado: 'SC', Litros: 991050, percentualDist: 0.25 },
//     { mes: 2, estado: 'SC', Litros: 696050, percentualDist: 0.25 },
//     { mes: 3, estado: 'SC', Litros: 573000, percentualDist: 0.25 },
//     { mes: 4, estado: 'SC', Litros: 489450, percentualDist: 0.25 },
//     { mes: 5, estado: 'SC', Litros: 408150, percentualDist: 0.25 },
//     { mes: 6, estado: 'SC', Litros: 408150, percentualDist: 0.25 },
//     { mes: 7, estado: 'SC', Litros: 500450, percentualDist: 0.25 },
//     { mes: 8, estado: 'SC', Litros: 518550, percentualDist: 0.25 },
//     { mes: 9, estado: 'SC', Litros: 1165499, percentualDist: 0.25 },
//     { mes: 10, estado: 'SC', Litros: 1380600, percentualDist: 0.25 },
//     { mes: 11, estado: 'SC', Litros: 1521299, percentualDist: 0.25 },
//     { mes: 12, estado: 'SC', Litros: 1511874, percentualDist: 0.25 },
//     { mes: 1, estado: 'PR', Litros: 83504, percentualDist: 0.3 },
//     { mes: 2, estado: 'PR', Litros: 60354, percentualDist: 0.3 },
//     { mes: 3, estado: 'PR', Litros: 50354, percentualDist: 0.3 },
//     { mes: 4, estado: 'PR', Litros: 40254, percentualDist: 0.3 },
//     { mes: 5, estado: 'PR', Litros: 39354, percentualDist: 0.3 },
//     { mes: 6, estado: 'PR', Litros: 39354, percentualDist: 0.3 },
//     { mes: 7, estado: 'PR', Litros: 48554, percentualDist: 0.3 },
//     { mes: 8, estado: 'PR', Litros: 48654, percentualDist: 0.3 },
//     { mes: 9, estado: 'PR', Litros: 85954, percentualDist: 0.3 },
//     { mes: 10, estado: 'PR', Litros: 97204, percentualDist: 0.3 },
//     { mes: 11, estado: 'PR', Litros: 101704, percentualDist: 0.3 },
//     { mes: 12, estado: 'PR', Litros: 111704, percentualDist: 0.3 },
//   ],
// };

export default async function Volume(ano, mes) {
  const [idCenarioMes] = cenariosValidos.filter(c => c.mes === mes);

  const volumesMes = await Cenarios.findOne({
    where: { id: idCenarioMes.cenario },
  });
  const cenarioMes = volumesMes.json_obj;

  let volumeRS = 0;
  let volumeDistRS = 0;
  let volumeSC = 0;
  let volumeDistSC = 0;
  let volumePR = 0;
  let volumeDistPR = 0;

  cenarioMes.forEach(c => {
    c.estados.forEach(e => {
      const volumeAtual = Number(String(e.volume).split('.').join(''));
      const pDist = e.distribuicaoP / 100;
      if (e.uf === 'RS') {
        volumeRS += volumeAtual;
        volumeDistRS += volumeAtual * pDist;
      } else if (e.uf === 'SC') {
        volumeSC += volumeAtual;
        volumeDistSC += volumeAtual * pDist;
      } else if (e.uf === 'PR') {
        volumePR += volumeAtual;
        volumeDistPR += volumeAtual * pDist;
      }
    });
  });

  const TotalVolume = volumeRS + volumeSC + volumePR;
  const TotalDist = volumeDistRS + volumeDistSC + volumeDistPR;
  const TotalDir = TotalVolume - TotalDist;

  return {
    value: { TotalVolume, TotalDist, TotalDir },
    vars: {},
  };
}
