import Utils from '../../../../../../utils/utils';
import tabelaAtivoImobilizado, {
  Categorias,
} from '../../../GlobalVars/dgo/tabelaAtivoImobilizado';

export const NomeConta = 'AMORTIZACOES';
export const ContaContabil = '3.1.1.1.07.02.001.010';

const politicas = {};
const variaveis = {};

export default function Amortizacao(ano, mes) {
  const TabelaAtivoSoftwares = tabelaAtivoImobilizado(ano, mes).value.filter(
    i => {
      return i.categoria === Categorias.LicencasUso && i.depreciavel;
    }
  );

  const AmortizacaoPorItem = TabelaAtivoSoftwares.map(i => {
    const valor = (i.PeDepreciacaoAnual * i.valor) / 12;
    return { ...i, amortizacaoMes: valor };
  });

  const valorTotalAmortizacao = Utils.SomaArray(
    AmortizacaoPorItem.map(i => {
      return i.amortizacaoMes;
    })
  );

  const Descricao = {
    AmortizacaoPorItem,
  };

  return {
    value: {
      Total: valorTotalAmortizacao,
      Descricao,
      politicas,
      variaveis,
    },
  };
}
