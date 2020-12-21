/* eslint-disable no-loop-func */
import QlAdm from '../../../GlobalVars/ql/qlAdm';

export const NomeConta = 'ADICIONAL NOTURNO';
export const ContaContabil = '3.1.1.1.03.01.001.040';

export const politicas = {};

export const variaveis = {};

export default function AdicionalNoturno(ano, mes) {
  const qlMesAtual = QlAdm(ano, mes).value;
  let totalAdicional = 0;
  // Calculamos as horas extras acumuladas co ano todo
  const novoQL = [].concat(qlMesAtual.Especiais, qlMesAtual.Outros);
  novoQL.forEach(e => {
    totalAdicional += e.adicionalNoturno;
  });
  return {
    value: {
      Total: totalAdicional,
    },
  };
}
