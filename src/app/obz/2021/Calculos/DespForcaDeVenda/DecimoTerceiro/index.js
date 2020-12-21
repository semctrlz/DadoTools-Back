import QlComercial from '../../../GlobalVars/ql/qlComercial';
import Utils from '../../../../../../utils/utils';

export const NomeConta = 'PROVISAO DE 13 SALARIO - COMERCIAL';
export const ContaContabil = '3.1.1.1.06.01.002.012';
export default function DecimoTerceiro(ano) {
  let baseRemuneracaoEfetivosAno = 0;
  let baseRemuneracaoJAAno = 0;

  for (let i = 1; i <= 12; i++) {
    const QlMes = QlComercial(ano, i);
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
