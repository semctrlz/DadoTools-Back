export const NomeConta = 'VALE TRANSPORTE';
export const ContaContabil = '3.1.1.1.03.01.020.080';

export const politicas = {};
export const variaveis = {
  QuantTrabalhoPresencialVT: 10,
  QuantTrabalhoPresencialEstacionamento: 10,
  PercentualVT: 0.5,
  PercentualEst: 0.5,
  MediaDiasSemanaVT: 2,
  valorMedioVTDia: 15,
  PercentualQLPresencialEst: 0.014,
  MediaDiasSemanaEst: 2,
  valorMedioEstacionamentoDia: 25,
};

export default function ValeTransporte(ano, mes) {
  // ValorTotalVT
  const valorVT =
    variaveis.QuantTrabalhoPresencialVT *
    variaveis.PercentualVT *
    variaveis.MediaDiasSemanaVT *
    4 * // Pois em média o mês tem 4 semanas
    variaveis.valorMedioVTDia;
  const valorEstacionamento =
    variaveis.QuantTrabalhoPresencialEstacionamento *
    variaveis.PercentualEst *
    variaveis.MediaDiasSemanaEst *
    4 * // Pois em média o mês tem 4 semanas
    variaveis.valorMedioEstacionamentoDia;

  return {
    value: {
      Total: valorVT + valorEstacionamento,
      VT: valorVT,
      Estacionamento: valorEstacionamento,
      QlConsideradoVT:
        variaveis.PercentualVT * variaveis.QuantTrabalhoPresencialVT,
      QlConsideradoEstacionamento:
        variaveis.PercentualEst *
        variaveis.QuantTrabalhoPresencialEstacionamento,
      politicas,
      variaveis,
      NomeConta: 'VALE TRANSPORTE',
      ContaContabil: '3.1.1.1.03.01.020.080',
    },
  };
}
