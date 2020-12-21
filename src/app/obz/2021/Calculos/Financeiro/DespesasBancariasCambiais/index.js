/* eslint-disable no-loop-func */
import Utils from '../../../../../../utils/utils';

export const NomeConta = 'DESPESAS BANCÁRIAS CAMBIAIS';
export const ContaContabil = '3.1.1.1.08.01.010.050';

export const politicas = {};

// FALTOU Vinicius preencher as variáveis
export const variaveis = {
  cambiosMes: [
    {
      mes: 1,
      cambios: 2,
    },
    {
      mes: 2,
      cambios: 2,
    },
    {
      mes: 3,
      cambios: 2,
    },
    {
      mes: 4,
      cambios: 2,
    },
    {
      mes: 5,
      cambios: 2,
    },
    {
      mes: 6,
      cambios: 2,
    },
    {
      mes: 7,
      cambios: 2,
    },
    {
      mes: 8,
      cambios: 2,
    },
    {
      mes: 9,
      cambios: 2,
    },
    {
      mes: 10,
      cambios: 2,
    },
    {
      mes: 11,
      cambios: 2,
    },
    {
      mes: 12,
      cambios: 2,
    },
  ],
  tarifasCambios: [
    {
      mes: 1,
      tarifa: 500,
    },
  ],
};

export default function DespesasBancariasCambiais(ano, mes) {
  const quantCambiosMes = Utils.SomaArray(
    variaveis.cambiosMes.filter(m => m.mes === mes).map(v => v.cambios)
  );

  let tarifa = 0;
  variaveis.tarifasCambios.forEach(t => {
    if (t.mes <= mes) tarifa = t.tarifa;
  });

  const valorTotal = quantCambiosMes * tarifa;

  return {
    value: {
      Total: valorTotal,
      politicas,
      variaveis,
    },
  };
}
