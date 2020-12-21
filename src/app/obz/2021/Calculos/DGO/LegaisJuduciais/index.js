import Utils from '../../../../../../utils/utils';

export const NomeConta = 'LEGAIS E JUDICIAIS';
export const ContaContabil = '3.1.1.1.05.01.011.001';
const politicas = {};
const variaveis = {
  valores: [
    {
      mes: 1,
      descricao: '',
      valor: 1500,
    },
    {
      mes: 2,
      descricao: '',
      valor: 1500,
    },
    {
      mes: 3,
      descricao: '',
      valor: 1500,
    },
    {
      mes: 4,
      descricao: '',
      valor: 1500,
    },
    {
      mes: 5,
      descricao: '',
      valor: 1500,
    },
    {
      mes: 6,
      descricao: '',
      valor: 1500,
    },
    {
      mes: 7,
      descricao: '',
      valor: 1500,
    },
    {
      mes: 8,
      descricao: '',
      valor: 1500,
    },
    {
      mes: 9,
      descricao: '',
      valor: 1500,
    },
    {
      mes: 10,
      descricao: '',
      valor: 1500,
    },
    {
      mes: 11,
      descricao: '',
      valor: 1500,
    },
    {
      mes: 12,
      descricao: '',
      valor: 1500,
    },
  ],
};

export default function LegaisJuduciais(ano, mes) {
  const valorTotal = Utils.SomaArray(
    variaveis.valores.filter(v => v.mes === mes).map(v => v.valor)
  );
  return {
    value: {
      Total: valorTotal,
      politicas,
      variaveis,
    },
  };
}
