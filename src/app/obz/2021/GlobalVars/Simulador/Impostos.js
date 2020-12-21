import Utils from '../../../../../utils/utils';

const variavel = {
  ImpostosPorEstado: [
    {
      mes: 1,
      Estado: 'RS',
      St: 843659.84,
      StFcp: 214381.03,
      Ipi: 346762.63,
      Icms: 1836103.02,
      Pis: 106195.29,
      Cofins: 487812.17,
    },
    {
      mes: 2,
      Estado: 'RS',
      St: 655953.77,
      StFcp: 172179.8,
      Ipi: 282586.96,
      Icms: 1496293.76,
      Pis: 86541.63,
      Cofins: 397532.33,
    },
    {
      mes: 3,
      Estado: 'RS',
      St: 552317.07,
      StFcp: 135029.96,
      Ipi: 214459.04,
      Icms: 1135557.43,
      Pis: 65677.61,
      Cofins: 301692.62,
    },
    {
      mes: 4,
      Estado: 'RS',
      St: 458569.13,
      StFcp: 111469.88,
      Ipi: 176545.22,
      Icms: 934804.31,
      Pis: 54066.58,
      Cofins: 248356.94,
    },
    {
      mes: 5,
      Estado: 'RS',
      St: 400407.69,
      StFcp: 99781.75,
      Ipi: 159937.03,
      Icms: 846864.21,
      Pis: 48980.36,
      Cofins: 224993.18,
    },
    {
      mes: 6,
      Estado: 'RS',
      St: 400407.69,
      StFcp: 99781.75,
      Ipi: 159937.03,
      Icms: 846864.21,
      Pis: 48980.36,
      Cofins: 224993.18,
    },
    {
      mes: 7,
      Estado: 'RS',
      St: 459202.11,
      StFcp: 114299.63,
      Ipi: 183105.94,
      Icms: 969543.23,
      Pis: 56075.79,
      Cofins: 257586.3,
    },
    {
      mes: 8,
      Estado: 'RS',
      St: 510022.74,
      StFcp: 127094.04,
      Ipi: 203712.13,
      Icms: 1078652.75,
      Pis: 62386.39,
      Cofins: 286574.3,
    },
    {
      mes: 9,
      Estado: 'RS',
      St: 946246.11,
      StFcp: 236469.08,
      Ipi: 379532.19,
      Icms: 2009617.35,
      Pis: 116230.89,
      Cofins: 533911.11,
    },
    {
      mes: 10,
      Estado: 'RS',
      St: 1351821.76,
      StFcp: 315564.89,
      Ipi: 489659.41,
      Icms: 2592739.36,
      Pis: 149984.71,
      Cofins: 688960.57,
    },
    {
      mes: 11,
      Estado: 'RS',
      St: 1474507.65,
      StFcp: 340648.25,
      Ipi: 525704.1,
      Icms: 2783595.43,
      Pis: 161023.31,
      Cofins: 739666.83,
    },
    {
      mes: 12,
      Estado: 'RS',
      St: 1498607.33,
      StFcp: 347189.43,
      Ipi: 536594.6,
      Icms: 2841260.52,
      Pis: 164358.51,
      Cofins: 754987.17,
    },
    {
      mes: 1,
      Estado: 'SC',
      St: 1391700.24,
      StFcp: 0.0,
      Ipi: 217655.54,
      Icms: 533005.49,
      Pis: 77499.77,
      Cofins: 356123.86,
    },
    {
      mes: 2,
      Estado: 'SC',
      St: 1020336.05,
      StFcp: 0.0,
      Ipi: 153814.47,
      Icms: 376668.37,
      Pis: 54768.12,
      Cofins: 251668.31,
    },
    {
      mes: 3,
      Estado: 'SC',
      St: 851820.01,
      StFcp: 0.0,
      Ipi: 125515.6,
      Icms: 307368.72,
      Pis: 44691.85,
      Cofins: 205366.24,
    },
    {
      mes: 4,
      Estado: 'SC',
      St: 734206.11,
      StFcp: 0.0,
      Ipi: 107066.9,
      Icms: 262190.65,
      Pis: 38122.9,
      Cofins: 175180.83,
    },
    {
      mes: 5,
      Estado: 'SC',
      St: 610399.54,
      StFcp: 0.0,
      Ipi: 88493.57,
      Icms: 216707.36,
      Pis: 31509.56,
      Cofins: 144791.5,
    },
    {
      mes: 6,
      Estado: 'SC',
      St: 610399.54,
      StFcp: 0.0,
      Ipi: 88493.57,
      Icms: 216707.36,
      Pis: 31509.56,
      Cofins: 144791.5,
    },
    {
      mes: 7,
      Estado: 'SC',
      St: 732661.27,
      StFcp: 0.0,
      Ipi: 109934.11,
      Icms: 269212.01,
      Pis: 39143.81,
      Cofins: 179872.1,
    },
    {
      mes: 8,
      Estado: 'SC',
      St: 765099.18,
      StFcp: 0.0,
      Ipi: 114654.46,
      Icms: 280771.42,
      Pis: 40824.57,
      Cofins: 187595.44,
    },
    {
      mes: 9,
      Estado: 'SC',
      St: 1717307.0,
      StFcp: 0.0,
      Ipi: 251930.81,
      Icms: 616940.45,
      Pis: 89704.03,
      Cofins: 412204.41,
    },
    {
      mes: 10,
      Estado: 'SC',
      St: 2132171.04,
      StFcp: 0.0,
      Ipi: 295698.81,
      Icms: 724121.67,
      Pis: 105297.84,
      Cofins: 483860.47,
    },
    {
      mes: 11,
      Estado: 'SC',
      St: 2347612.66,
      StFcp: 0.0,
      Ipi: 326574.66,
      Icms: 799731.96,
      Pis: 116291.69,
      Cofins: 534378.94,
    },
    {
      mes: 12,
      Estado: 'SC',
      St: 2333609.27,
      StFcp: 0.0,
      Ipi: 325012.48,
      Icms: 795906.42,
      Pis: 115735.45,
      Cofins: 531822.94,
    },
    {
      mes: 1,
      Estado: 'PR',
      St: 182899.75,
      StFcp: 16353.58,
      Ipi: 15983.68,
      Icms: 37873.58,
      Pis: 5646.61,
      Cofins: 25955.06,
    },
    {
      mes: 2,
      Estado: 'PR',
      St: 128592.87,
      StFcp: 11512.29,
      Ipi: 11320.07,
      Icms: 26823.08,
      Pis: 3999.08,
      Cofins: 18382.06,
    },
    {
      mes: 3,
      Estado: 'PR',
      St: 110193.08,
      StFcp: 9832.33,
      Ipi: 9513.94,
      Icms: 22543.42,
      Pis: 3361.02,
      Cofins: 15449.18,
    },
    {
      mes: 4,
      Estado: 'PR',
      St: 91382.82,
      StFcp: 8116.1,
      Ipi: 7674.39,
      Icms: 18184.58,
      Pis: 2711.16,
      Cofins: 12462.03,
    },
    {
      mes: 5,
      Estado: 'PR',
      St: 87633.0,
      StFcp: 7816.28,
      Ipi: 7548.68,
      Icms: 17886.72,
      Pis: 2666.75,
      Cofins: 12257.91,
    },
    {
      mes: 6,
      Estado: 'PR',
      St: 87633.0,
      StFcp: 7816.28,
      Ipi: 7548.68,
      Icms: 17886.72,
      Pis: 2666.75,
      Cofins: 12257.91,
    },
    {
      mes: 7,
      Estado: 'PR',
      St: 106387.24,
      StFcp: 9498.26,
      Ipi: 9216.79,
      Icms: 21839.33,
      Pis: 3256.05,
      Cofins: 14966.66,
    },
    {
      mes: 8,
      Estado: 'PR',
      St: 106470.95,
      StFcp: 9509.44,
      Ipi: 9245.11,
      Icms: 21906.43,
      Pis: 3266.05,
      Cofins: 15012.65,
    },
    {
      mes: 9,
      Estado: 'PR',
      St: 185861.28,
      StFcp: 16634.02,
      Ipi: 16331.59,
      Icms: 38697.95,
      Pis: 5769.52,
      Cofins: 26520.0,
    },
    {
      mes: 10,
      Estado: 'PR',
      St: 207009.8,
      StFcp: 18641.58,
      Ipi: 18844.18,
      Icms: 44651.59,
      Pis: 6659.56,
      Cofins: 30611.13,
    },
    {
      mes: 11,
      Estado: 'PR',
      St: 216445.29,
      StFcp: 19576.17,
      Ipi: 20186.81,
      Icms: 47832.96,
      Pis: 7133.87,
      Cofins: 32791.35,
    },
    {
      mes: 12,
      Estado: 'PR',
      St: 230912.08,
      StFcp: 20970.45,
      Ipi: 22025.19,
      Icms: 52189.03,
      Pis: 7783.32,
      Cofins: 35776.59,
    },
  ],
};

export default function ReceitaBruta(ano, mes) {
  const ImpostosMesCalculo = variavel.ImpostosPorEstado.filter(v => {
    return v.mes === mes;
  });

  const st = Utils.SomaArray(
    ImpostosMesCalculo.map(i => {
      return i.St;
    })
  );
  const stFcp = Utils.SomaArray(
    ImpostosMesCalculo.map(i => {
      return i.StFcp;
    })
  );
  const ipi = Utils.SomaArray(
    ImpostosMesCalculo.map(i => {
      return i.Ipi;
    })
  );
  const icms = Utils.SomaArray(
    ImpostosMesCalculo.map(i => {
      return i.Icms;
    })
  );
  const pis = Utils.SomaArray(
    ImpostosMesCalculo.map(i => {
      return i.Pis;
    })
  );
  const cofins = Utils.SomaArray(
    ImpostosMesCalculo.map(i => {
      return i.Cofins;
    })
  );

  return {
    value: {
      Total: st + stFcp + ipi + icms + pis + cofins,
      St: st,
      StFcp: stFcp,
      Ipi: ipi,
      Icms: icms,
      Pis: pis,
      Cofins: cofins,
      ImpostosPorEstado: ImpostosMesCalculo,
    },
    vars: null,
  };
}
