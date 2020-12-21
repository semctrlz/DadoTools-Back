/* eslint-disable no-loop-func */
import TaxaSelic from '../../../GlobalVars/financeiros/taxaSelic';
import ImpostosSimulador from '../../../GlobalVars/Simulador/Impostos';

export const NomeConta = 'VARIACAO MONETARIA ATIVA';
export const ContaContabil = '3.1.1.1.08.01.001.031';
// FALTOU Raphael Vpreencher alguns dados
export const politicas = {
  Pis: 0.0165,
  Cofins: 0.076,
};

export const variaveis = {
  TaxaSelicACumuladaPeriodo: 0.2,
  SaldoCreditoPisCofinsAnoAnterior: 8000,
};

export default function VariacaoMonetariaAtiva(ano, mes) {
  const impostosMes = ImpostosSimulador(ano, mes).value;
  const valorPisCofinsMesAtual = impostosMes.Pis + impostosMes.Cofins;

  let valorPisCofinsAcumuladoAno = 0;

  for (let i = 1; i <= mes; i++) {
    const impostos = ImpostosSimulador(ano, i).value;
    valorPisCofinsAcumuladoAno += impostos.Pis + impostos.Cofins;
  }
  // VErificando se o saldo do ano anterior - o acumulado do ano

  const saldoAtualizado =
    variaveis.SaldoCreditoPisCofinsAnoAnterior - valorPisCofinsAcumuladoAno;

  let saldoRealMes = 0;

  // Verificamos se temos saldo
  if (saldoAtualizado <= 0) {
    saldoRealMes = 0;
  } else {
    // Verificamos se o saldo total é menor do que  o valor do mês,
    // caso seja, consideramos o valor do mês, caso não, consideramos o saldo
    saldoRealMes =
      variaveis.SaldoCreditoPisCofinsAnoAnterior - valorPisCofinsAcumuladoAno >=
      valorPisCofinsMesAtual
        ? valorPisCofinsMesAtual
        : variaveis.SaldoCreditoPisCofinsAnoAnterior -
          valorPisCofinsAcumuladoAno;
  }

  const taxaSelicAno = TaxaSelic(ano, mes).vars.TaxaSelic.filter(t => {
    return t.mes <= mes;
  });

  let TaxasAcumuladas = 1;
  taxaSelicAno.forEach(t => {
    TaxasAcumuladas *= 1 + t.taxa;
  });

  const taxaSelicAcumuladaMesCorrente =
    (1 + TaxasAcumuladas) * (1 + variaveis.TaxaSelicACumuladaPeriodo) - 1;

  const variacaoMonetariaAtivaBruta =
    saldoRealMes * taxaSelicAcumuladaMesCorrente;

  const pisSobreVariacaoMonetariaAtiva =
    variacaoMonetariaAtivaBruta * politicas.Pis;
  const cofinsSobreVariacaoMonetariaAtiva =
    variacaoMonetariaAtivaBruta * politicas.Cofins;

  const totalVariacaoMonetariaAtiva =
    variacaoMonetariaAtivaBruta -
    pisSobreVariacaoMonetariaAtiva -
    cofinsSobreVariacaoMonetariaAtiva;

  return {
    value: {
      Total: totalVariacaoMonetariaAtiva,
      TaxaSelicAcumuladaPeriodo: taxaSelicAcumuladaMesCorrente,
      SaldoCreditoPisCofinsMes: saldoRealMes,
      politicas,
      variaveis,
    },
  };
}
