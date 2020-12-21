import qlComercial from '../../../GlobalVars/ql/qlComercial';
import { politicas } from '../../../GlobalVars/fixas/dp/variasFolha';
import Utils from '../../../../../../utils/utils';

export const NomeConta = 'PROVISAO DE FERIAS - COMERCIAL';
export const ContaContabil = '3.1.1.1.06.01.002.011';
export default function Ferias(ano, mes) {
  let baseRemuneracaoEfetivosAno = 0;
  let baseRemuneracaoJAAno = 0;

  const QlMes = qlComercial(ano, mes);
  const { QLEfetivos, JovemAprendiz } = QlMes.value;
  baseRemuneracaoEfetivosAno += Utils.SomaArray(
    QLEfetivos.map(ql => {
      return ql.baseDeRemuneracao;
    })
  );
  baseRemuneracaoJAAno += Utils.SomaArray(
    JovemAprendiz.map(ql => {
      return ql.baseDeRemuneracao;
    })
  );
  // Considerado como férias o Adicional de férias mais um salário (pago no mês de férias)
  const totalProvisaoFeriasEfetivos =
    (baseRemuneracaoEfetivosAno / 12) * (1 + politicas.AdicionalFerias);
  const totalProvisaoFeriasJa =
    (baseRemuneracaoJAAno / 12) * (1 + politicas.AdicionalFerias);

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
