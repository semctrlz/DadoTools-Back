import Utils from '../../../../../../utils/utils';

import Celulares from '../../../GlobalVars/TI/celulares';

export const NomeConta = 'BENS DE NATUREZA PERMANENTES NÃO IMOB ';
export const ContaContabil = '3.1.1.1.05.01.011.006';

const politicas = {};
const variaveis = {
  ReposicaoMensalCelularesBasicos: 0.05,
  ReposicaoMensalCelularesIntermediarios: 0.05,
  valorCelulares: [
    {
      mes: 1,
      CelularBasico: 800,
      CelularIntermediario: 1500,
    },
  ],
};

export default function BensNaturezaPermanente(ano, mes) {
  const CelularesMes = Celulares(ano, mes);
  let valorCelulares = {
    CelularBasico: 0,
    CelularIntermediario: 0,
  };

  variaveis.valorCelulares.forEach(c => {
    if (c.mes <= mes) {
      valorCelulares = c;
    }
  });

  // Compra celulares básicos
  // Considerados membros do ql que utiliza celulares básicos admitidos no
  // mês do cálculo
  const totalCompraCelularesBasicos =
    CelularesMes.value.Ql.QlCelularesBasicos.filter(ql => {
      return Utils.DatasIguaisAM(ql.admissao, ano, mes);
    }).length * valorCelulares.CelularBasico;

  // Compra celulares intermediários
  // Considerados membros do ql que utiliza celulares intermediários
  // admitidos no mês do cálculo

  const totalCompraCelularesIntermediarios =
    CelularesMes.value.Ql.QlCelularesIntermediarios.filter(ql => {
      return Utils.DatasIguaisAM(ql.admissao, ano, mes);
    }).length * valorCelulares.CelularIntermediario;

  // Valor de reposição de celulares básicos
  const totalReposicaoCelularesBasicos =
    CelularesMes.value.CelularesBasicos *
    valorCelulares.CelularBasico *
    variaveis.ReposicaoMensalCelularesBasicos;

  // Valor de reposição de celulares intermediários
  const totalReposicaoCelularesIntermediarios =
    CelularesMes.value.CelularesIntermediarios *
    valorCelulares.CelularIntermediario *
    variaveis.ReposicaoMensalCelularesIntermediarios;

  const Descricao = {
    CelularesBasicos: {
      Total: totalCompraCelularesBasicos + totalReposicaoCelularesBasicos,
      Compra: totalCompraCelularesBasicos,
      Reposicao: totalReposicaoCelularesBasicos,
    },
    CelularesIntermediarios: {
      Total:
        totalCompraCelularesIntermediarios +
        totalReposicaoCelularesIntermediarios,
      Compra: totalCompraCelularesIntermediarios,
      Reposicao: totalReposicaoCelularesIntermediarios,
    },
  };

  return {
    value: {
      Total:
        Descricao.CelularesBasicos.Total +
        Descricao.CelularesIntermediarios.Total,
      Descricao,
      politicas,
      variaveis,
    },
  };
}
