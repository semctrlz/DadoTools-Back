/* eslint-disable no-loop-func */
import Utils from '../../../../../../utils/utils';

// VALIDADO Com luca em 22/10/20
export const donoConta = 'Luca';
export const dataValidacao = '22/12/20';

export const NomeConta = 'PROCESSOS JURIDICOS E INDENIZACOES';
export const ContaContabil = '3.1.1.1.04.02.001.150';

export const politicas = {};

export const variaveis = {
  processos: [
    {
      mes: 4,
      descricao: 'Prossível perda processo cobrança',
      valor: 10000,
    },
    {
      mes: 8,
      descricao: 'Prossível perda processo cobrança',
      valor: 19444.04,
    },
    {
      mes: 9,
      descricao: 'Prossível perda processo consumidor',
      valor: 20000,
    },
  ],
};

export default function ProcessosJuridicosIndenizacoes(ano, mes) {
  const valorTotalProcesso = Utils.SomaArray(
    variaveis.processos.filter(m => m.mes === mes).map(v => v.valor)
  );
  return {
    value: {
      Total: valorTotalProcesso,
      politicas,
      variaveis,
    },
  };
}
