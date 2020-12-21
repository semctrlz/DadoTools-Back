import Utils from '../../../../../../utils/utils';

export const NomeConta = 'ALUGUEL POS (MAQUINETAS)';
export const ContaContabil = '3.1.1.1.06.01.001.006';

const politicas = {};

const variaveis = {
  Valores: [{ mes: 1, valor: 0 }],
};

export default function AluguelMaquinetas(ano, mes) {
  const valorMes = Utils.SomaArray(
    variaveis.Valores.filter(m => m.mes === mes).map(v => v.valor)
  );

  return {
    value: {
      Total: valorMes,
      politicas,
      variaveis,
    },
  };
}
