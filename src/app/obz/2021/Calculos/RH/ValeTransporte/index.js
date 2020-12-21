import QlAdm from '../../../GlobalVars/ql/qlAdm';

export const NomeConta = 'VALE TRANSPORTE';
export const ContaContabil = '3.1.1.1.03.01.020.080';

export const politicas = {
  PercentualContrapartidaEmpresa: 0.99,
};
export const variaveis = {
  PercentualQLPresencialVT: 0.5,
  MediaDiasSemanaVT: 2,
  valorMedioVTDia: 15,
  PercentualQLPresencialEst: 0.5,
  MediaDiasSemanaEst: 2,
  valorMedioEstacionamentoDia: 25,
};

export default function ValeTransporte(ano, mes) {
  const QlMesAtual = QlAdm(ano, mes).value;
  const QlGeral = QlMesAtual.qlTotal;

  // ValorTotalVT
  const valorVT =
    QlGeral.length *
    variaveis.PercentualQLPresencialVT *
    variaveis.MediaDiasSemanaVT *
    4 * // Pois em média o mês tem 4 semanas
    variaveis.valorMedioVTDia;
  const valorEstacionamento =
    QlGeral.length *
    variaveis.PercentualQLPresencialEst *
    variaveis.MediaDiasSemanaEst *
    4 * // Pois em média o mês tem 4 semanas
    variaveis.valorMedioEstacionamentoDia;

  return {
    value: {
      Total: valorVT + valorEstacionamento,
      VT: valorVT,
      Estacionamento: valorEstacionamento,
      politicas,
      variaveis,
      NomeConta: 'VALE TRANSPORTE',
      ContaContabil: '3.1.1.1.03.01.020.080',
    },
  };
}
