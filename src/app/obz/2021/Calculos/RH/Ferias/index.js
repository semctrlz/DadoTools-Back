import QlAdm from '../../../GlobalVars/ql/qlAdm';
import { politicas } from '../../../GlobalVars/fixas/dp/variasFolha';
import Utils from '../../../../../../utils/utils';

export const NomeConta = 'FERIAS';
export const ContaContabil = '3.1.1.1.03.01.030.001';

export default function Ferias(ano, mes) {
  let baseRemuneracaoEfetivosMes = 0;
  let baseRemuneracaoJAMes = 0;
  const QlMes = QlAdm(ano, mes);
  const { QLEfetivos, JovemAprendiz } = QlMes.value;
  baseRemuneracaoEfetivosMes += Utils.SomaArray(
    QLEfetivos.map(ql => {
      return ql.baseDeRemuneracao;
    })
  );
  baseRemuneracaoJAMes += Utils.SomaArray(
    JovemAprendiz.map(ql => {
      return ql.baseDeRemuneracao;
    })
  );
  // Considerado como férias o Adicional de férias mais um salário (pago no mês de férias)
  const totalProvisaoFeriasEfetivos =
    (baseRemuneracaoEfetivosMes / 12) * (1 + politicas.AdicionalFerias);
  const totalProvisaoFeriasJa =
    (baseRemuneracaoJAMes / 12) * (1 + politicas.AdicionalFerias);

  const Resumo = {
    FeriasEfetivos: totalProvisaoFeriasEfetivos,
    FeriasJa: totalProvisaoFeriasJa,
  };

  return {
    value: {
      Total: totalProvisaoFeriasEfetivos + totalProvisaoFeriasJa,
      Resumo,
    },
  };
}
