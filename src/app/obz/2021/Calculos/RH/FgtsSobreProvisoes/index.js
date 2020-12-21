import Ferias from '../Ferias';
import DecimoTerceiro from '../DecimoTerceiro';
import { politicas } from '../../../GlobalVars/fixas/dp/variasFolha';

export const NomeConta = 'FGTS - ENCARGOS SOBRE PROVISOES';
export const ContaContabil = '3.1.1.1.03.01.030.020';

export default function FgtsSobreProvisoes(ano, mes) {
  // Consideramos o FGTS sobre provisões de férias e decimo terceiro de desligamentos

  // Valores de provisão de férias e decimo terceiro do mês atual
  const { FeriasEfetivos, FeriasJa } = Ferias(ano).value.Resumo;
  const { DecimoTerceiroEfetivos, DecimoTerceiroJa } = DecimoTerceiro(
    ano
  ).value.Resumo;

  const totalFgtsEfetivos =
    FeriasEfetivos * politicas.Fgts + DecimoTerceiroEfetivos * politicas.Fgts;
  const totalFgtsJovensAprendizes =
    FeriasJa * politicas.FgtsJovemAprendiz +
    DecimoTerceiroJa * politicas.FgtsJovemAprendiz;

  const Descricao = {
    FgtsSobreProvisoesEfetivos: totalFgtsEfetivos,
    FgtsSobreFolhaJovensAprendizes: totalFgtsJovensAprendizes,
  };

  return {
    value: {
      Total: totalFgtsEfetivos + totalFgtsJovensAprendizes,
      Descricao,
    },
  };
}
