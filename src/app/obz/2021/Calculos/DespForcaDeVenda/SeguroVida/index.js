import QlComercial from '../../../GlobalVars/ql/qlComercial';
import {
  variaveis as variaveisRH,
  politicas as politicasRH,
} from '../../RH/SeguroVida';

export const NomeConta = 'SEGURO DE VIDA - COMERCIAL';
export const ContaContabil = '3.1.1.1.06.01.002.016';
const politicas = {
  PercentualContrapartidaEmpresa: variaveisRH.ValorSeguroDeVida,
};
const variaveis = {
  ValorSeguroDeVida: politicasRH.PercentualContrapartidaEmpresa,
};

export default function SeguroVida(ano, mes) {
  const QlMesAtual = QlComercial(ano, mes).value;
  const QlEfetivos = QlMesAtual.QLEfetivos;

  // Valor seguro de vida
  const valor = QlEfetivos.length * variaveis.ValorSeguroDeVida;

  // Desconto seguro de vida
  const desconto = valor * (1 - politicas.PercentualContrapartidaEmpresa) * -1;

  return {
    value: {
      Total: valor + desconto,
      Descricao: {
        Valor: valor,
        DescontoEmFolha: desconto,
        QLConsiderado: QlEfetivos.length,
      },
      politicas,
      variaveis,
    },
  };
}
