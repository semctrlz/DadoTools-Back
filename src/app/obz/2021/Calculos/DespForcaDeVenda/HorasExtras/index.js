/* eslint-disable no-loop-func */
import { cargosGerenciais } from '../../../GlobalVars/ql/qlGeral';
import QlComercial from '../../../GlobalVars/ql/qlComercial';
import { politicas as PoliticasDP } from '../../../GlobalVars/fixas/dp/variasFolha';

export const NomeConta = 'HORAS EXTRAS - COMERCIAL';
export const ContaContabil = '3.1.1.1.06.01.002.002';
const politicas = {
  MesPagamento: PoliticasDP.MesPagamentoHoraExtra,
  PercentualValorHora: PoliticasDP.PercentualValorHoraExtra,
};

const variaveis = {
  EstimativaHorasExtrasMesPorFunc: 12.96, // 1/12 da hora e
};

export default function HorasExtras(ano, mes) {
  let baseRemuneracao = 0;
  let horasExtras = 0;
  if (politicas.MesPagamento === mes) {
    // Calculamos as horas extras acumuladas co ano todo

    // Pegamos cada funcionário (exceto gerentes) no mês base do cálculo e
    // multiplicamos pela quantidade estimada de horas, percentual do valor da hora
    // e pelo valor/hora da base de remuneração
    const qlMesAtual = QlComercial(ano, mes).value;
    const novoQL = qlMesAtual.QLEfetivos.filter(ql => {
      return !cargosGerenciais.includes(ql.nomeCargo);
    });
    novoQL.forEach(e => {
      baseRemuneracao += e.baseDeRemuneracao;
      horasExtras +=
        (e.baseDeRemuneracao / PoliticasDP.cargaHorariaBaseMensal) *
        variaveis.EstimativaHorasExtrasMesPorFunc *
        politicas.PercentualValorHora;
    });
  }

  return {
    value: {
      Total: horasExtras,
      BaseRemuneracaoConsiderada: baseRemuneracao,
    },
  };
}
