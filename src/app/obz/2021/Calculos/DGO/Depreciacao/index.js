import Utils from '../../../../../../utils/utils';
import tabelaAtivoImobilizado, {
  Categorias,
} from '../../../GlobalVars/dgo/tabelaAtivoImobilizado';

export const NomeConta = 'DEPRECIACOES';
export const ContaContabil = '3.1.1.1.07.02.001.001';
const politicas = {};
const variaveis = {};

export default function Depreciacao(ano, mes) {
  const TabelaAtivo = tabelaAtivoImobilizado(ano, mes).value.filter(i => {
    return i.categoria !== Categorias.LicencasUso && i.depreciavel;
  });

  const DepreciacaoPorItem = TabelaAtivo.map(i => {
    const valor = (i.PeDepreciacaoAnual * i.valor) / 12;
    return { ...i, amortizacaoMes: valor };
  });

  const valorTotalDepreciacao = Utils.SomaArray(
    DepreciacaoPorItem.map(i => {
      return i.amortizacaoMes;
    })
  );

  const Descricao = {
    DepreciacaoPorItem,
  };

  return {
    value: {
      Total: valorTotalDepreciacao,
      Descricao,
      politicas,
      variaveis,
    },
  };
}
