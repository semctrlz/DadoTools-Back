import QlComercial from '../../../GlobalVars/ql/qlComercial';
import Utils from '../../../../../../utils/utils';

export const NomeConta = 'ALIMENTACAO DE FUNCIONARIOS - COMERCIAL';
export const ContaContabil = '3.1.1.1.06.01.002.006';
const politicas = {};
const variaveis = {
  PercentualPerdaCartoes: 0.01,
  valorVR: 550,
  taxaPercentualRecargaVR: 0.05,
  TaxaPrimeiraViaVr: 1.5,
  TaxaSegundaViaVr: 1.5,
  ValorDescontoEmFolhaVR: 25,
  ValorVAGerentes: 300,
  ValorVAEspeciais: 200,
  ValorVAPadrao: 150,
  TaxaRecargaVa: 15,
  TaxaPrimeiraViaVa: 1.5,
  TaxaSegundaViaVa: 1.5,
};

export default function AlimentacaoFuncionarios(ano, mes) {
  const QlMesAtual = QlComercial(ano, mes).value;

  const QlEfetivos = QlMesAtual.QLEfetivos;
  const QlGerentes = QlMesAtual.GerentesI.concat(QlMesAtual.GerentesII);
  const QlEspeciais = QlMesAtual.Especiais;

  const QlOutros = QlEfetivos.filter(ql => {
    return !QlGerentes.includes(ql) && !QlEspeciais.includes(ql);
  });

  const QLNovos = QlEfetivos.filter(ql => {
    return ql.admissao.getTime() === Utils.Mes(ano, mes).getTime();
  });

  // Carga VR
  const RecargaVr = QlEfetivos.length * variaveis.valorVR;

  // Taxa Recarga
  const taxaRecargaVR = RecargaVr * variaveis.taxaPercentualRecargaVR;

  // Valor primeira via
  const primeiraViaCartaoVR = QLNovos.length * variaveis.TaxaPrimeiraViaVr;

  // Valor segunda via
  const segundaViaCartaoVR =
    QlEfetivos.length *
    variaveis.PercentualPerdaCartoes *
    variaveis.TaxaSegundaViaVr;

  // Valor de desconto em folha VA
  const descontoEmFolhaVR =
    QlEfetivos.length * variaveis.ValorDescontoEmFolhaVR * -1;

  const totalValeRefeicao =
    RecargaVr +
    taxaRecargaVR +
    primeiraViaCartaoVR +
    segundaViaCartaoVR +
    descontoEmFolhaVR;

  const valorVAGerentes = QlGerentes.length * variaveis.ValorVAGerentes;
  const valorVAEspeciais = QlEspeciais.length * variaveis.ValorVAEspeciais;
  const valorVAGeral = QlOutros.length * variaveis.ValorVAPadrao;
  const valorTaxaRecargaVA = QlEfetivos.length * variaveis.TaxaRecargaVa;

  // Valor primeira via VA
  const primeiraViaCartaoVa = QLNovos.length * variaveis.TaxaPrimeiraViaVa;

  // Valor segunda via
  const segundaViaCartaoVa =
    QlEfetivos.length *
    variaveis.PercentualPerdaCartoes *
    variaveis.TaxaSegundaViaVa;

  const totalValeAlimentacao =
    valorVAGerentes +
    valorVAEspeciais +
    valorVAGeral +
    valorTaxaRecargaVA +
    primeiraViaCartaoVa +
    segundaViaCartaoVa;

  return {
    value: {
      Total: totalValeRefeicao + totalValeAlimentacao,
      ValeAlimentacao: {
        RecargaGerentes: valorVAGerentes,
        RecargaEspeciais: valorVAEspeciais,
        RecargaPadrao: valorVAGeral,
        TaxaRecarga: valorTaxaRecargaVA,
        PrimeirasVias: primeiraViaCartaoVa,
        SegundasVias: segundaViaCartaoVa,
      },
      ValeRefeicao: {
        Recargas: RecargaVr,
        TaxaRecarga: taxaRecargaVR,
        PrimeirasVias: primeiraViaCartaoVR,
        SegundasVias: segundaViaCartaoVR,
        descontoSimbolicoFuncionario: descontoEmFolhaVR,
      },
      politicas,
      variaveis,
    },
  };
}
