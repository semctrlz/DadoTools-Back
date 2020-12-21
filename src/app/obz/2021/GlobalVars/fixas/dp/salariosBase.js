/* eslint-disable no-plusplus */
/* eslint-disable no-loop-func */
import QlAdm from '../../ql/qlAdm';

export default function salariosBase(ano, mes) {
  const qlMesAtual = QlAdm(ano, mes).value;
  const base = [];
  const qlNormal = base.concat(
    qlMesAtual.Especiais,
    qlMesAtual.GerentesI,
    qlMesAtual.GerentesII,
    qlMesAtual.Outros
  );

  const baseJA = [];
  const qlJovemAprendiz = baseJA.concat(qlMesAtual.JovemAprendiz);

  let salariosMensaisNormal = 0;
  let salariosMensaisJA = 0;

  qlNormal.forEach(ql => {
    salariosMensaisNormal += ql.salarioBase;
  });

  qlJovemAprendiz.forEach(ql => {
    salariosMensaisJA += ql.salarioBase;
  });

  let salariosAnuaisNormal = 0;
  let salariosAnuaisJA = 0;

  for (let index = 1; index <= 12; index++) {
    const qlMes = QlAdm(ano, index).value;
    const qlbaseM = [];
    const qlNormalM = qlbaseM.concat(
      qlMes.Especiais,
      qlMes.GerentesI,
      qlMes.GerentesII,
      qlMes.Outros
    );

    const baseJAA = [];
    const qlJovemAprendizM = baseJAA.concat(qlMes.JovemAprendiz);

    qlNormalM.forEach(ql => {
      salariosAnuaisNormal += ql.salarioBase;
    });
    qlJovemAprendizM.forEach(ql => {
      salariosAnuaisJA += ql.salarioBase;
    });
  }

  return {
    value: {
      salariosMes: {
        Normal: salariosMensaisNormal,
        JovemAprendiz: salariosMensaisJA,
      },
      salariosAno: {
        Normal: salariosAnuaisNormal,
        JovemAprendiz: salariosAnuaisJA,
      },
    },
    vars: null,
  };
}
