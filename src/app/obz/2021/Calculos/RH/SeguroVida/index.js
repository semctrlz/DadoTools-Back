import QlAdm from '../../../GlobalVars/ql/qlAdm';

export const NomeConta = 'SEGURO DE VIDA';
export const ContaContabil = '3.1.1.1.03.01.020.041';
export const politicas = {
  PercentualContrapartidaEmpresa: 0.99,
};
export const variaveis = {
  ValorSeguroDeVida: 8.35,
};

export default function SeguroVida(ano, mes) {
  const QlMesAtual = QlAdm(ano, mes).value;
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
      },
      politicas,
      variaveis,
    },
  };
}
