import Utils from '../../../../../../utils/utils';

export const NomeConta = 'SEGUROS DIVERSOS';
export const ContaContabil = '3.1.1.1.05.01.011.003';
const politicas = {};
const variaveis = {
  SeguroPatrimonial: [
    {
      mes: 1,
      valor: 332.04,
    },
    {
      mes: 2,
      valor: 332.04,
    },
    {
      mes: 3,
      valor: 332.04,
    },
    {
      mes: 4,
      valor: 332.04,
    },
    {
      mes: 5,
      valor: 332.04,
    },
    {
      mes: 6,
      valor: 332.04,
    },
    {
      mes: 7,
      valor: 332.04,
    },
    {
      mes: 8,
      valor: 332.04,
    },
    {
      mes: 9,
      valor: 332.04,
    },
    {
      mes: 10,
      valor: 348.64,
    },
    {
      mes: 11,
      valor: 348.64,
    },
    {
      mes: 12,
      valor: 348.64,
    },
  ],
  SeguroRespCivil: [
    {
      mes: 1,
      valor: 960.44,
    },
    {
      mes: 2,
      valor: 960.44,
    },
    {
      mes: 3,
      valor: 960.44,
    },
    {
      mes: 4,
      valor: 960.44,
    },
    {
      mes: 5,
      valor: 960.44,
    },
    {
      mes: 6,
      valor: 960.44,
    },
    {
      mes: 7,
      valor: 960.44,
    },
    {
      mes: 8,
      valor: 960.44,
    },
    {
      mes: 9,
      valor: 960.44,
    },
    {
      mes: 10,
      valor: 1008.46,
    },
    {
      mes: 11,
      valor: 1008.46,
    },
    {
      mes: 12,
      valor: 1008.46,
    },
  ],
  SeguroAEO: [
    {
      mes: 1,
      valor: 628.35,
    },
    {
      mes: 2,
      valor: 628.35,
    },
    {
      mes: 3,
      valor: 628.35,
    },
    {
      mes: 4,
      valor: 628.35,
    },
    {
      mes: 5,
      valor: 628.35,
    },
    {
      mes: 6,
      valor: 628.35,
    },
    {
      mes: 7,
      valor: 628.35,
    },
    {
      mes: 8,
      valor: 628.35,
    },
    {
      mes: 9,
      valor: 628.35,
    },
    {
      mes: 10,
      valor: 659.77,
    },
    {
      mes: 11,
      valor: 659.77,
    },
    {
      mes: 12,
      valor: 659.77,
    },
  ],
  SeguroObraFabrica: [
    {
      mes: 1,
      valor: 1423.6,
    },
    {
      mes: 2,
      valor: 1423.6,
    },
    {
      mes: 3,
      valor: 1423.6,
    },
    {
      mes: 4,
      valor: 1423.6,
    },
    {
      mes: 5,
      valor: 1423.6,
    },
    {
      mes: 6,
      valor: 1423.6,
    },
    {
      mes: 7,
      valor: 1423.6,
    },
  ],
  SeguroOutdoorFabrica: [
    {
      mes: 1,
      valor: 58.55,
    },
    {
      mes: 2,
      valor: 58.55,
    },
    {
      mes: 3,
      valor: 61.48,
    },
    {
      mes: 4,
      valor: 61.48,
    },
    {
      mes: 5,
      valor: 61.48,
    },
    {
      mes: 6,
      valor: 61.48,
    },
    {
      mes: 7,
      valor: 61.48,
    },
    {
      mes: 8,
      valor: 61.48,
    },
    {
      mes: 9,
      valor: 61.48,
    },
    {
      mes: 10,
      valor: 61.48,
    },
    {
      mes: 11,
      valor: 61.48,
    },
    {
      mes: 12,
      valor: 61.48,
    },
  ],
};

// eslint-disable-next-line no-unused-vars
export default function SegurosDiversos(ano, mes) {
  const valorSeguroPatrimonial = Utils.SomaArray(
    variaveis.SeguroPatrimonial.filter(s => s.mes === mes).map(s => s.valor)
  );
  const valorSeguroRespCivil = Utils.SomaArray(
    variaveis.SeguroRespCivil.filter(s => s.mes === mes).map(s => s.valor)
  );
  const valorSeguroAEO = Utils.SomaArray(
    variaveis.SeguroAEO.filter(s => s.mes === mes).map(s => s.valor)
  );
  const valorSeguroObraFabrica = Utils.SomaArray(
    variaveis.SeguroObraFabrica.filter(s => s.mes === mes).map(s => s.valor)
  );
  const valorSeguroOutdoorFabrica = Utils.SomaArray(
    variaveis.SeguroOutdoorFabrica.filter(s => s.mes === mes).map(s => s.valor)
  );
  // Soma todos os seguros
  const valorSeguros =
    valorSeguroPatrimonial +
    valorSeguroRespCivil +
    valorSeguroAEO +
    valorSeguroObraFabrica +
    valorSeguroOutdoorFabrica;

  return {
    value: {
      Total: valorSeguros,
      SeguroPatrimonial: valorSeguroPatrimonial,
      SeguroResponsabilidadeCivil: valorSeguroRespCivil,
      SeguroAEO: valorSeguroAEO,
      SeguroObraFabrica: valorSeguroObraFabrica,
      SeguroOutdoorFabrica: valorSeguroOutdoorFabrica,
      politicas,
      variaveis,
    },
  };
}
