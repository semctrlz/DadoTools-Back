import Utils from '../../../../../../utils/utils';

export const NomeConta = 'PESQUISA E DESENVOLVIMENTO DE PRODUTOS';
export const ContaContabil = '3.1.1.1.06.01.001.060';
const politicas = {};
const variaveis = {
  Valores: [
    { mes: 1, valor: 10000 },
    { mes: 2, valor: 10000 },
    { mes: 3, valor: 10000 },
    { mes: 4, valor: 10000 },
    { mes: 5, valor: 10000 },
    { mes: 6, valor: 10000 },
    { mes: 7, valor: 10000 },
    { mes: 8, valor: 10000 },
    { mes: 9, valor: 10000 },
    { mes: 10, valor: 10000 },
    { mes: 11, valor: 10000 },
    { mes: 12, valor: 10000 },
  ],
};

export default function DesenvolvimentoProdutos(ano, mes) {
  const valor = Utils.SomaArray(
    variaveis.Valores.filter(v => v.mes === mes).map(v => v.valor)
  );

  return {
    value: {
      Total: valor,
      politicas,
      variaveis,
    },
  };
}
