import Utils from '../../../../../../utils/utils';
// import QlAdm from '../../ql/qlAdm';
import { politicas } from './variasFolha';
import {
  SaldoFgts,
  SalarioBase,
} from '../../../VariaveisEPoliticas/variaveis/desligamentosAdm';

const vars = {
  MediaDiasIndenizados: 39,
  SaldoFgts,
  SalarioBase,
};

export default function VerbasRescisorias(ano, mes) {
  // Consulta QL efetivos removendo-se os gerentes pois estes geralemnte fazem algum acordo
  // const qlMesAtual = QlAdm(ano, mes).value.QlTotalSemGerentes;

  // const QLDesligadosMesAtual = qlMesAtual.filter(ql => {
  //   return (
  //     ql.dataLimite !== null && Utils.DatasIguaisAM(ql.dataLimite, ano, mes)
  //   );
  // });

  // const BaseRemuneracaoTotalMensal = Utils.SomaArray(
  //   QLDesligadosMesAtual.map(ql => {
  //     return ql.baseDeRemuneracao;
  //   })
  // );

  // let baseRemuneracaoTotalAno = 0;
  // for (let i = 1; i <= 12; i++) {
  //   const qlMes = QlAdm(ano, i).value;
  //   const QlSemGerentes = qlMes.Especiais.concat(
  //     qlMes.Supervisores,
  //     qlMes.Outros
  //   );
  //   baseRemuneracaoTotalAno += Utils.SomaArray(
  //     QlSemGerentes.filter(ql => {
  //       return ql.dataLimite && Utils.DatasIguaisAM(ql.dataLimite, ano, i);
  //     }).map(ql => {
  //       return ql.baseDeRemuneracao;
  //     })
  //   );
  // }

  const BaseSaldo = Utils.SomaArray(
    vars.SaldoFgts.filter(m => m.mes === mes).map(v => v.valor)
  );

  const SalarioBaseConsiderado = Utils.SomaArray(
    vars.SalarioBase.filter(m => m.mes === mes).map(v => v.valor)
  );

  const totalAvisoPrevioMes =
    (SalarioBaseConsiderado / 30) * vars.MediaDiasIndenizados;

  const totalFgtsAvisoPrevioMes = totalAvisoPrevioMes * politicas.Fgts;
  const totalInssAvisoPrevioMes = totalAvisoPrevioMes * politicas.Inss;

  const multaFGTS = BaseSaldo * politicas.multaFGTS;

  // const totalProvisoesSobreAvisoPrevioFerias =
  //   (baseRemuneracaoTotalAno * politicas.AdicionalFerias) / 12;
  // const totalProvisoesSobreAvisoPrevio13 = baseRemuneracaoTotalAno / 12;

  // const totalFgtsSobreAvisoPrevio =
  //   (totalProvisoesSobreAvisoPrevioFerias + totalProvisoesSobreAvisoPrevio13) *
  //   politicas.Fgts;
  // const totalInssSobreAvisoPrevio =
  //   (totalProvisoesSobreAvisoPrevioFerias + totalProvisoesSobreAvisoPrevio13) *
  //   politicas.Inss;

  return {
    value: {
      AvisoPrevioIndenizado: {
        Total:
          totalAvisoPrevioMes +
          totalFgtsAvisoPrevioMes +
          totalInssAvisoPrevioMes,
        AvisoPrevio: totalAvisoPrevioMes,
        FgtsSobreAvisoPrevio: totalFgtsAvisoPrevioMes,
        InssSobreAvisoPrevio: totalInssAvisoPrevioMes,
      },
      MultaFGTS: multaFGTS,
    },
    vars: { vars, politicas },
  };
}
