import Utils from '../../../../../../utils/utils';

export const NomeConta = 'DESPESAS COM ARMAZENAGEM - DESP. VENDAS';
export const ContaContabil = '3.1.1.1.06.01.001.041';

const politicas = {};

const variaveis = {
  Valores: [
    { transportadora: 'Souza Roxo', valor: 3000 },
    { transportadora: 'TRE', valor: 2000 },
    { transportadora: 'Reiter', valor: 10000 },
  ],
};

export default function DespesasArmazenagem(ano, mes) {
  const anos = ano;
  const valorMes = Utils.SomaArray(variaveis.Valores.map(v => v.valor));

  return {
    value: {
      Total: valorMes,
      politicas,
      variaveis,
    },
  };
}
