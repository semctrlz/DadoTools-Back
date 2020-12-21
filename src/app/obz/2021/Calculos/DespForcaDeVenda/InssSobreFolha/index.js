import QlComercial from '../../../GlobalVars/ql/qlComercial';
import Utils from '../../../../../../utils/utils';

import { politicas } from '../../../GlobalVars/fixas/dp/variasFolha';

export const NomeConta = 'INSS ENCARGOS SOBRE FOLHA - COMERCIAL';
export const ContaContabil = '3.1.1.1.06.01.002.005';
export default function InssSobreFolha(ano, mes) {
  const QlMes = QlComercial(ano, mes);

  // Pegar todo o QL sem estagiários
  const qlTotal = QlMes.value.QLEfetivos.concat(QlMes.value.JovemAprendiz);

  // Fgts sobre a base de remuneração mensalidade
  const baseRemuneracao = Utils.SomaArray(
    qlTotal.map(ql => {
      return ql.baseDeRemuneracao;
    })
  );

  const totalInssSalario = baseRemuneracao * politicas.Inss;

  const Descricao = {
    InssSobreFolha: totalInssSalario,
  };

  return {
    value: {
      Total: totalInssSalario,
      Descricao,
    },
  };
}
