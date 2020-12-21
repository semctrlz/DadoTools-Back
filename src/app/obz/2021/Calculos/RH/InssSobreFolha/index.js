import QlAdm from '../../../GlobalVars/ql/qlAdm';
import Utils from '../../../../../../utils/utils';
import { politicas } from '../../../GlobalVars/fixas/dp/variasFolha';

export const NomeConta = 'INSS - ENCARGOS SOBRE FOLHA';
export const ContaContabil = '3.1.1.1.03.01.001.090';

export default function InssSobreFolha(ano, mes) {
  const QlMes = QlAdm(ano, mes);

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
