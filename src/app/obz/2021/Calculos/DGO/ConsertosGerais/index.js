import Utils from '../../../../../../utils/utils';

export const NomeConta = 'CONSERTOS EM GERAIS';
export const ContaContabil = '3.1.1.1.04.02.010.050';
const politicas = {};
const variaveis = {
  Local: [
    {
      nome: 'Centrífuga',
      manutencoes: [
        { mes: 4, manutencao: 'Conserto Centrífuga', valor: 25000 },
      ],
    },
    {
      nome: 'Bicos de enchimento Santamate',
      manutencoes: [
        { mes: 2, manutencao: 'Troca Bicos Enchimento', valor: 4500 },
      ],
    },
  ],
};

export default function BensNaturezaPermanente(ano, mes) {
  // Separadas as variaveis por local

  const [Centrifuga] = variaveis.Local.filter(l => {
    return l.nome === 'Centrífuga';
  });
  const [BicosEnchimento] = variaveis.Local.filter(l => {
    return l.nome === 'Bicos de enchimento Santamate';
  });

  // Valores mensais
  const totalCentrifuga = Utils.SomaArray(
    Centrifuga.manutencoes
      .filter(v => {
        return v.mes === mes;
      })
      .map(v => {
        return v.valor;
      })
  );
  const totalBicosEnchimento = Utils.SomaArray(
    BicosEnchimento.manutencoes
      .filter(v => {
        return v.mes === mes;
      })
      .map(v => {
        return v.valor;
      })
  );

  const Descricao = {
    Centrifuga: totalCentrifuga,
    BicosEnchimento: totalBicosEnchimento,
  };

  return {
    value: {
      Total: Descricao.Centrifuga + Descricao.BicosEnchimento,
      Descricao,
      politicas,
      variaveis,
    },
  };
}
