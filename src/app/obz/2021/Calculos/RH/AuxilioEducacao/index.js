import QlAdm from '../../../GlobalVars/ql/qlAdm';

export const NomeConta = 'AUXILIO EDUCACAO';
export const ContaContabil = '3.1.1.1.03.01.020.043';

const politicas = {
  ValorAuxilioPrimogenito: {
    Fevereiro: 300,
    Agosto: 150,
  },
  ValorAuxilioDemais: {
    Fevereiro: 210,
    Agosto: 90,
  },
};

const variaveis = {
  UmOuMaisFilhos: {
    valor: 0.17,
  },
  DoisOuMaisFilhos: {
    valor: 0.12,
  },
  TresOuMaisFilhos: {
    valor: 0,
  },
  QuatroOuMaisFilhos: {
    valor: 0,
  },
};

export default function AuxilioEducacao(ano, mes) {
  const qlMesAtual = QlAdm(ano, mes).value;
  const qlBase = [];
  const novoQL = qlBase.concat(
    qlMesAtual.Especiais,
    qlMesAtual.GerentesI,
    qlMesAtual.GerentesII,
    qlMesAtual.Outros
  );

  const quantQl = novoQL.length;

  if (mes === 2) {
    const primogenito =
      quantQl *
      variaveis.UmOuMaisFilhos.valor *
      politicas.ValorAuxilioPrimogenito.Fevereiro;

    const demais =
      quantQl *
      (variaveis.DoisOuMaisFilhos.valor +
        variaveis.TresOuMaisFilhos.valor +
        variaveis.QuatroOuMaisFilhos.valor) *
      politicas.ValorAuxilioDemais.Fevereiro;

    return {
      value: {
        ValoresPrimogenitos: primogenito,
        ValorDemais: demais,
        Total: primogenito + demais,
        politicas,
        variaveis,
      },
    };
  }
  if (mes === 8) {
    const primogenito =
      quantQl *
      variaveis.UmOuMaisFilhos.valor *
      politicas.ValorAuxilioPrimogenito.Agosto;

    const demais =
      quantQl *
      (variaveis.DoisOuMaisFilhos.valor +
        variaveis.TresOuMaisFilhos.valor +
        variaveis.QuatroOuMaisFilhos.valor) *
      politicas.ValorAuxilioDemais.Agosto;

    return {
      value: {
        ValoresPrimogenitos: primogenito,
        ValorDemais: demais,
        Total: primogenito + demais,
        politicas,
        variaveis,
      },
    };
  }
  return {
    value: {
      ValoresPrimogenitos: 0,
      ValorDemais: 0,
      Total: 0,
      politicas: null,
      variaveis: null,
    },
  };
}
