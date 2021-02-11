import Utils from '../../../../../../utils/utils';
import { politicas as politicasRH } from '../../../GlobalVars/fixas/dp/variasFolha';
import QLComercial from '../../../GlobalVars/ql/qlComercial';
import QlAdm from '../../../GlobalVars/ql/qlAdm';

export const NomeConta = 'CONTRIBUICAO SINDICAL EMPRESA';
export const ContaContabil = '3.1.1.1.05.01.020.001';

const politicas = {
  mesConvencaoDissidio: politicasRH.MesInicialDissidio,
};
const variaveis = {
  ValorCapitalSocial: 0,
  PercentualSobreCapitalSocial: 0.0,
};

// Conforme o Raphael a contribuição é opcional e optamos por não pagá-la
export default function ContribuicaoSindicalEmpresa(ano, mes) {
  // Separadas as variaveis por local
  let valorSindicalConvencao = 0;
  if (mes === politicas.mesConvencaoDissidio) {
    const QLComercialMes = QLComercial(ano, mes).value.QLEfetivos;
    const QLAdmMes = QlAdm(ano, mes).value.QLEfetivos;
    const QLEfetivos = QLComercialMes.concat(QLAdmMes);
    const TotalBaseRemuneracao = Utils.SomaArray(
      QLEfetivos.map(v => v.baseDeRemuneracao)
    );

    valorSindicalConvencao = TotalBaseRemuneracao / 30; // 1/30 da base de remuneração do mês da convenção
  }

  const TotalContribuicaoSindical =
    mes === 1
      ? variaveis.ValorCapitalSocial * variaveis.PercentualSobreCapitalSocial
      : 0;

  return {
    value: {
      Total: TotalContribuicaoSindical + valorSindicalConvencao,
      ContrinuicaoSindicalEmpresa: TotalContribuicaoSindical,
      ContribuicaoSindicalConvencao: valorSindicalConvencao,
      politicas,
      variaveis,
    },
  };
}
