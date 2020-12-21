import QlAdm from '../../../GlobalVars/ql/qlAdm';
import Utils from '../../../../../../utils/utils';

export const NomeConta = 'FARMACIA';
export const ContaContabil = '3.1.1.1.03.01.020.030';
const politicas = {};
const variaveis = {
  TaxaAdesao: 0.04,
  TaxaMensalGoodCarg: 20,
  ValorPrimeiraVia: 14.9,
  ValorSegundaVia: 14.9,
  ValorFarmacia: 200,
  DescontoEmFolha: 200,
  EstimativaPerdasCartoes: 0.01,
};

export default function Farmacia(ano, mes) {
  const QlMesAtual = QlAdm(ano, mes).value;
  const QlEfetivos = QlMesAtual.QLEfetivos;
  const QLNovos = QlEfetivos.filter(ql => {
    return ql.admissao.getTime() === Utils.Mes(ano, mes).getTime();
  });

  // Recarga
  const Recarga = QlEfetivos.length * variaveis.ValorFarmacia;

  // Taxa mensal
  const taxaMensal = variaveis.TaxaMensalGoodCarg;

  // Valor primeira via
  const primeiraViaCartao = QLNovos.length * variaveis.ValorPrimeiraVia;

  // Valor segunda via
  const segundaViaCartao =
    QlEfetivos.length *
    variaveis.EstimativaPerdasCartoes *
    variaveis.ValorSegundaVia;

  // Valor de desconto em folha VA
  const descontoEmFolha = QlEfetivos.length * variaveis.DescontoEmFolha * -1;

  const totalFarmacia =
    Recarga +
    taxaMensal +
    primeiraViaCartao +
    segundaViaCartao +
    descontoEmFolha;

  return {
    value: {
      Total: totalFarmacia,
      Descricao: {
        ValorRecarga: Recarga,
        TaxaMensal: taxaMensal,
        ValorPrimeirasVias: primeiraViaCartao,
        ValorSegundasVias: segundaViaCartao,
        DescontoEmFolha: descontoEmFolha,
      },
      politicas,
      variaveis,
    },
  };
}
