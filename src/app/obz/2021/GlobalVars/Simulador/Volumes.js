import { cenarioConsiderado } from '../../Calculos/Receitas/MercadoInterno';

import Cenarios from '../../../../models/SimuladorCenarios';

export default async function Volume(ano, mes) {
  const [idCenarioMes] = cenarioConsiderado.filter(c => c.mes === mes);

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
