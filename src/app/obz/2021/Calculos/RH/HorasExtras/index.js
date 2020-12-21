/* eslint-disable no-loop-func */
import { cargosGerenciais } from '../../../GlobalVars/ql/qlGeral';
import QlAdm from '../../../GlobalVars/ql/qlAdm';
import { politicas as PoliticasDP } from '../../../GlobalVars/fixas/dp/variasFolha';

export const NomeConta = 'HORAS EXTRAS';
export const ContaContabil = '3.1.1.1.03.01.001.010';

const politicas = {
  MesPagamento: 8,
  PercentualValorHora: 0.5,
};

const variaveis = {
  EstimativaHorasExtrasMesPorFunc: 3.02,
};

export default function HorasExtras(ano, mes) {
  let baseRemuneracao = 0;
  let horasExtras = 0;
  // Pegamos cada funcionário (exceto gerentes) no mês base do cálculo e
  // multiplicamos pela quantidade estimada de horas, percentual do valor da hora
  // e pelo valor/hora da base de remuneração
  const qlMesAtual = QlAdm(ano, mes).value;
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

  return {
    value: {
      Total: horasExtras,
      BaseRemuneracaoConsiderada: baseRemuneracao,
    },
  };
}
