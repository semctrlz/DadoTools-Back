import { cenariosValidos } from '../../Calculos/Receitas/MercadoInterno';

import Cenarios from '../../../../models/SimuladorCenarios';

import Utils from '../../../../../utils/utils';

const variavel = {
  VendaInterna: [
    {
      mes: 1,
      receitaBrutaRS: 8749215.59,
      receitaBrutaSC: 6051068.18,
      receitaBrutaPR: 530850.21,
      outrasReceitasBrutasVendaInterna: 0,
    },
    {
      mes: 2,
      receitaBrutaRS: 7095895.57,
      receitaBrutaSC: 4313053.6,
      receitaBrutaPR: 374950.87,
      outrasReceitasBrutasVendaInterna: 0,
    },
    {
      mes: 3,
      receitaBrutaRS: 5444035.8,
      receitaBrutaSC: 3538741.58,
      receitaBrutaPR: 317401.18,
      outrasReceitasBrutasVendaInterna: 0,
    },
    {
      mes: 4,
      receitaBrutaRS: 4485801.47,
      receitaBrutaSC: 3026195.12,
      receitaBrutaPR: 258711.5,
      outrasReceitasBrutasVendaInterna: 0,
    },
    {
      mes: 5,
      receitaBrutaRS: 4047583.31,
      receitaBrutaSC: 2504787.82,
      receitaBrutaPR: 252053.99,
      outrasReceitasBrutasVendaInterna: 0,
    },
    {
      mes: 6,
      receitaBrutaRS: 4047583.31,
      receitaBrutaSC: 2504787.82,
      receitaBrutaPR: 252053.99,
      outrasReceitasBrutasVendaInterna: 0,
    },
    {
      mes: 7,
      receitaBrutaRS: 4634780.59,
      receitaBrutaSC: 3086028.78,
      receitaBrutaPR: 307096.72,
      outrasReceitasBrutasVendaInterna: 0,
    },
    {
      mes: 8,
      receitaBrutaRS: 5155439.91,
      receitaBrutaSC: 3219515.48,
      receitaBrutaPR: 307779.1,
      outrasReceitasBrutasVendaInterna: 0,
    },
    {
      mes: 9,
      receitaBrutaRS: 9600716.8,
      receitaBrutaSC: 7110408.23,
      receitaBrutaPR: 541309.76,
      outrasReceitasBrutasVendaInterna: 0,
    },
    {
      mes: 10,
      receitaBrutaRS: 12521328.51,
      receitaBrutaSC: 8457090.46,
      receitaBrutaPR: 615108.78,
      outrasReceitasBrutasVendaInterna: 0,
    },
    {
      mes: 11,
      receitaBrutaRS: 13468566.72,
      receitaBrutaSC: 9333493.62,
      receitaBrutaPR: 653332.95,
      outrasReceitasBrutasVendaInterna: 0,
    },
    {
      mes: 12,
      receitaBrutaRS: 13740758.43,
      receitaBrutaSC: 9286048.62,
      receitaBrutaPR: 707332.95,
      outrasReceitasBrutasVendaInterna: 0,
    },
  ],
  Exportacao: [
    { mes: 1, receitaBruta: 957549.2 },
    { mes: 2, receitaBruta: 370486.0 },
    { mes: 3, receitaBruta: 311869.8 },
    { mes: 4, receitaBruta: 259749.6 },
    { mes: 5, receitaBruta: 110789.12 },
    { mes: 6, receitaBruta: 164316.48 },
    { mes: 7, receitaBruta: 152830.48 },
    { mes: 8, receitaBruta: 108523.68 },
    { mes: 9, receitaBruta: 260443.16 },
    { mes: 11, receitaBruta: 411504.36 },
    { mes: 11, receitaBruta: 585731.92 },
    { mes: 12, receitaBruta: 566804.2 },
  ],
};

export default async function ReceitaBruta(ano, mes) {
  const [idCenarioMes] = cenariosValidos.filter(c => c.mes === mes);

  if (!idCenarioMes) {
    return {
      value: {
        Total: 0,
      },
      ReceitaBrutaInterna: {
        Total: 0,
        RS: 0,
        SC: 0,
        PR: 0,
      },
      ReceitaBrutaExportacao: 0,

      vars: null,
    };
  }

  const volumesMes = await Cenarios.findOne({
    where: { id: idCenarioMes.cenario },
  });

  const cenarioMes = volumesMes.json_obj;

  let ReceitaBrutaIntRS = 0;
  let ReceitaBrutaIntSC = 0;
  let ReceitaBrutaIntPR = 0;

  cenarioMes.forEach(c => {
    const volumeSKU = c.volumeUnitario;
    c.estados.forEach(e => {
      const volumeAtual = Number(String(e.volume).split('.').join(''));
      const precoSKU = Number(String(e.precoMed).split(',').join('.'));
      const ReceitaAtual = (precoSKU / volumeSKU) * volumeAtual;

      if (e.uf === 'RS') {
        ReceitaBrutaIntRS += ReceitaAtual;
      } else if (e.uf === 'SC') {
        ReceitaBrutaIntSC += ReceitaAtual;
      } else if (e.uf === 'PR') {
        ReceitaBrutaIntPR += ReceitaAtual;
      }
    });
  });

  const TotalReceitaBrutaExterna = Utils.SomaArray(
    variavel.Exportacao.filter(v => {
      return v.mes === mes;
    }).map(v => {
      return v.receitaBruta;
    })
  );

  return {
    value: {
      Total:
        ReceitaBrutaIntRS +
        ReceitaBrutaIntSC +
        ReceitaBrutaIntPR +
        TotalReceitaBrutaExterna,
    },
    ReceitaBrutaInterna: {
      Total: ReceitaBrutaIntRS + ReceitaBrutaIntSC + ReceitaBrutaIntPR,
      RS: ReceitaBrutaIntRS,
      SC: ReceitaBrutaIntSC,
      PR: ReceitaBrutaIntPR,
    },
    ReceitaBrutaExportacao: TotalReceitaBrutaExterna,

    vars: null,
  };
}
