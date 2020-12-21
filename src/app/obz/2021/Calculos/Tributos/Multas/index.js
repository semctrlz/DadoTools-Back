import Utils from '../../../../../../utils/utils';

export const NomeConta = 'MULTAS';
export const ContaContabil = '3.1.1.1.05.01.020.010';
const politicas = {};
const variaveis = {
  // o Marcelo enviou uma estimativa de multa geral
  EstimativaMensalMultaPorVeiculo: [
    {
      mes: 1,
      valor: 400.0,
    },
    {
      mes: 2,
      valor: 400.0,
    },
    {
      mes: 3,
      valor: 127.29,
    },
    {
      mes: 4,
      valor: 127.29,
    },
    {
      mes: 5,
      valor: 127.29,
    },
    {
      mes: 6,
      valor: 127.29,
    },
    {
      mes: 7,
      valor: 127.29,
    },
    {
      mes: 8,
      valor: 127.29,
    },
    {
      mes: 9,
      valor: 127.29,
    },
    {
      mes: 10,
      valor: 127.29,
    },
    {
      mes: 11,
      valor: 127.29,
    },
    {
      mes: 12,
      valor: 127.29,
    },
  ],
  EstimativaMensalMultaAutuacaoFiscal: [
    {
      mes: 1,
      valor: 0,
    },
  ],
};

export default function Multas(ano, mes) {
  // Valor de multas de trânsito estimadas para o mes do cálculo
  const valorMensalEstimativaMultaTransito = Utils.SomaArray(
    variaveis.EstimativaMensalMultaPorVeiculo.filter(v => {
      return v.mes === mes;
    }).map(v => {
      return v.valor;
    })
  );
  // Valor de multas de autuação fiscal estimadas para o mes do cálculo
  const totalMultaFiscal = Utils.SomaArray(
    variaveis.EstimativaMensalMultaAutuacaoFiscal.filter(v => {
      return v.mes === mes;
    }).map(v => {
      return v.valor;
    })
  );
  const totalMultasTransito = valorMensalEstimativaMultaTransito;

  return {
    value: {
      Total: totalMultaFiscal + totalMultasTransito,
      MultasTransito: totalMultasTransito,
      MultasAutuacaoFiscal: totalMultaFiscal,
      politicas,
      variaveis,
    },
  };
}
