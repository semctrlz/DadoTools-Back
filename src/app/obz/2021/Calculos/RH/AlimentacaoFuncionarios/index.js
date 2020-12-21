import QlAdm from '../../../GlobalVars/ql/qlAdm';
import Utils from '../../../../../../utils/utils';

export const NomeConta = 'ALIMENTACAO DE FUNCIONARIOS';
export const ContaContabil = '3.1.1.1.03.01.020.001';

const politicas = {};
const variaveis = {
  PercentualPerdaCartoes: 0,
  valorVR: 550,
  taxaPercentualRecargaVR: 0.008,
  TaxaPrimeiraViaVr: 5.03,
  TaxaSegundaViaVr: 0,
  ValorDescontoEmFolhaVRGerentes: 40,
  ValorDescontoEmFolhaVR: 25,
  ValorVAGerentes: 550,
  ValorVAEspeciais: 440,
  ValorVAPadrao: 165,
  TaxaRecargaVa: 1.09,
  TaxaPrimeiraViaVa: 0,
  TaxaSegundaViaVa: 0,
};

export default function AlimentacaoFuncionarios(ano, mes) {
  const QlMesAtual = QlAdm(ano, mes).value;

  const QlEfetivos = QlMesAtual.QLEfetivos;
  const QlGerentes = QlMesAtual.GerentesI.concat(QlMesAtual.GerentesII);
  const QlEspeciais = QlMesAtual.Especiais;
  const QlOutros = QlMesAtual.Outros;
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

  // Valor de desconto em folha VA normais
  const descontoEmFolhaVR =
    (QlEfetivos.length - QlGerentes.length) * variaveis.ValorDescontoEmFolhaVR +
    QlGerentes.length * variaveis.ValorDescontoEmFolhaVRGerentes * -1;

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
