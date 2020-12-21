import Ferias from '../Ferias';
import DecimoTerceiro from '../DecimoTerceiro';
import { politicas } from '../../../GlobalVars/fixas/dp/variasFolha';

export const NomeConta = 'INSS - ENCARGOS SOBRE PROVISOES';
export const ContaContabil = '3.1.1.1.03.01.030.030';

export default function InssSobreProvisoes(ano, mes) {
  // Consideramos o FGTS sobre provisões de férias e decimo terceiro de desligamentos
  // Valores de provisão de férias e decimo terceiro do mês atual
  const TotalFerias = Ferias(ano).value.Total;
  const Total13o = DecimoTerceiro(ano).value.Total;

  const totalInss = TotalFerias * politicas.Inss + Total13o * politicas.Inss;

  const Descricao = {
    InssSobreProvisoes: totalInss,
  };

  return {
    value: {
      Total: totalInss,
      Descricao,
    },
  };
}
