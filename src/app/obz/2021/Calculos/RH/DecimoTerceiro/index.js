import QlAdm from '../../../GlobalVars/ql/qlAdm';
import Utils from '../../../../../../utils/utils';

export const NomeConta = '13o SALARIO';
export const ContaContabil = '3.1.1.1.03.01.030.010';
export default function DecimoTerceiro(ano) {
  let baseRemuneracaoEfetivosAno = 0;
  let baseRemuneracaoJAAno = 0;

  for (let i = 1; i <= 12; i++) {
    const QlMes = QlAdm(ano, i);
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
  }

  const totalProvisaoDecimoEfetivos = baseRemuneracaoEfetivosAno / 12 / 12;
  const totalProvisaoDecimoJa = baseRemuneracaoJAAno / 12 / 12;

  const Resumo = {
    DecimoTerceiroEfetivos: totalProvisaoDecimoEfetivos,
    DecimoTerceiroJa: totalProvisaoDecimoJa,
  };

  return {
    value: {
      Total: totalProvisaoDecimoEfetivos + totalProvisaoDecimoJa,
      Resumo,
    },
  };
}
