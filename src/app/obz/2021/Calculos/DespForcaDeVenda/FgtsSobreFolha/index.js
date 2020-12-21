import QlComercial from '../../../GlobalVars/ql/qlComercial';
import Utils from '../../../../../../utils/utils';
import Rescisoes from '../../../GlobalVars/forcaVendas/dp/verbasRescisorias';
import { politicas } from '../../../GlobalVars/fixas/dp/variasFolha';

export const NomeConta = 'FGTS ENCARGOS SOBRE FOLHA - COMERCIAL';
export const ContaContabil = '3.1.1.1.06.01.002.004';
export default function FgtsSobreFolha(ano, mes) {
  const RescisoesMes = Rescisoes(ano, mes).value;
  const QlMes = QlComercial(ano, mes);

  // Pegar todo o QL sem estagiários e Jovem aprendizes
  const qlEfetivos = QlMes.value.QLEfetivos;

  // Pegar o ql de Jovens aprendizes
  const qlJovensAprendizes = QlMes.value.JovemAprendiz;

  // Fgts sobre a base de remuneração mensalidade
  const baseRemuneracaoEfetivos = Utils.SomaArray(
    qlEfetivos.map(ql => {
      return ql.baseDeRemuneracao;
    })
  );

  const baseRemuneracaoJovensAprendizes = Utils.SomaArray(
    qlJovensAprendizes.map(ql => {
      return ql.baseDeRemuneracao;
    })
  );

  const totalFgtsEfetivos = baseRemuneracaoEfetivos * politicas.Fgts;
  const totalFgtsJovensAprendizes =
    baseRemuneracaoJovensAprendizes * politicas.FgtsJovemAprendiz;

  const FgtsRescisoes = RescisoesMes.MultaFGTS || 0;
  const Descricao = {
    FgtsSobreFolhaEfetivos: totalFgtsEfetivos,
    FgtsSobreFolhaJovensAprendizes: totalFgtsJovensAprendizes,
    FgtsSobreRescioes: FgtsRescisoes,
  };

  return {
    value: {
      Total: totalFgtsEfetivos + totalFgtsJovensAprendizes + FgtsRescisoes,
      Descricao,
    },
  };
}
