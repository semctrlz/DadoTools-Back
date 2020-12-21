import QLGeral from '../../../GlobalVars/ql/qlGeral';

export const NomeConta = 'SERVICOS DE ASSESSORIA DEPTO. PESSOAL';
export const ContaContabil = '3.1.1.1.03.01.050.020';

const politicas = null;

const variaveis = {
  EnvioESocial: [
    {
      mes: 1,
      valor: 7.25,
    },
    {
      mes: 6,
      valor: 7.65,
    },
  ],
  ProcessamentoFolha: [
    {
      mes: 1,
      valor: 21.82,
    },
    {
      mes: 6,
      valor: 23.01,
    },
    {
      mes: 11,
      valor: 43.64,
    },
  ],
  PontoRegistro: [
    {
      mes: 1,
      valor: 5.29,
    },
    {
      mes: 6,
      valor: 5.58,
    },
  ],
  PontoExterno: [
    {
      mes: 1,
      valor: 1.56,
    },
    {
      mes: 6,
      valor: 1.65,
    },
  ],
};

export default function ServicosAcessoriaDP(ano, mes) {
  const qlMesAtual = QLGeral(ano, mes).value;

  const QuantQL = qlMesAtual.length;

  let valorEsocialMes = 0;
  variaveis.EnvioESocial.forEach(e => {
    if (e.mes <= mes) {
      valorEsocialMes = e.valor;
    }
  });
  let valorProcessamento = 0;
  variaveis.ProcessamentoFolha.forEach(e => {
    if (e.mes <= mes) {
      valorProcessamento = e.valor;
    }
  });
  let valorPontoRegistro = 0;
  variaveis.PontoRegistro.forEach(e => {
    if (e.mes <= mes) {
      valorPontoRegistro = e.valor;
    }
  });
  let valorPontoExterno = 0;
  variaveis.PontoExterno.forEach(e => {
    if (e.mes <= mes) {
      valorPontoExterno = e.valor;
    }
  });

  return {
    value: {
      ESocial: valorEsocialMes * QuantQL,
      ProcessamentoFolha: valorProcessamento * QuantQL,
      PontoRegistro: valorPontoRegistro * QuantQL,
      PontoExterno: valorPontoExterno * QuantQL,
      Total:
        valorEsocialMes * QuantQL +
        valorProcessamento * QuantQL +
        valorPontoRegistro * QuantQL +
        valorPontoExterno * QuantQL,
    },
    politicas,
    variaveis,
  };
}
