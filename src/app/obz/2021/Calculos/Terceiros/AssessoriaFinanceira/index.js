import Utils from '../../../../../../utils/utils';

export const NomeConta = 'SERVICOS DE ASSESSORIA FINANCEIRA';
export const ContaContabil = '3.1.1.1.05.01.010.031';
const politicas = {};
const variaveis = {
  valores: [
    { mes: 1, empresa: 'Bateleur', valor: 20000 },
    { mes: 2, empresa: 'Bateleur', valor: 20000 },
    { mes: 3, empresa: 'Bateleur', valor: 20000 },
    { mes: 4, empresa: 'Bateleur', valor: 20000 },
    { mes: 5, empresa: 'Bateleur', valor: 20000 },
    { mes: 6, empresa: 'Bateleur', valor: 20000 },
    { mes: 7, empresa: 'Bateleur', valor: 20000 },
    { mes: 8, empresa: 'Bateleur', valor: 20000 },
    { mes: 9, empresa: 'Bateleur', valor: 20000 },
    { mes: 10, empresa: 'Bateleur', valor: 20000 },
    { mes: 11, empresa: 'Bateleur', valor: 20000 },
    { mes: 12, empresa: 'Bateleur', valor: 20000 },
    { mes: 1, empresa: 'Serasa', valor: 9000 },
    { mes: 2, empresa: 'Serasa', valor: 9000 },
    { mes: 3, empresa: 'Serasa', valor: 9000 },
    { mes: 4, empresa: 'Serasa', valor: 9000 },
    { mes: 5, empresa: 'Serasa', valor: 9000 },
    { mes: 6, empresa: 'Serasa', valor: 9000 },
    { mes: 7, empresa: 'Serasa', valor: 9000 },
    { mes: 8, empresa: 'Serasa', valor: 9000 },
    { mes: 9, empresa: 'Serasa', valor: 9000 },
    { mes: 10, empresa: 'Serasa', valor: 9000 },
    { mes: 11, empresa: 'Serasa', valor: 9000 },
    { mes: 12, empresa: 'Serasa', valor: 9000 },
  ],
};

export default function AssessoriaFinanceira(ano, mes) {
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
