import Utils from '../../../../../../utils/utils';

export const NomeConta = 'SERVICOS LABORATORIAIS';
export const ContaContabil = '3.1.1.1.04.02.001.180';
const politicas = {};
const variaveis = {
  Analises: [
    { mes: 2, descricao: 'Análises cerveja externa', valor: 1500 },
    { mes: 5, descricao: 'Análises cerveja externa', valor: 1500 },
    { mes: 8, descricao: 'Análises cerveja externa', valor: 1500 },
    { mes: 10, descricao: 'Análises cerveja externa', valor: 1500 },
    { mes: 12, descricao: 'Análises cerveja externa', valor: 1500 },
  ],
};

export default function BensNaturezaPermanente(ano, mes) {
  // Separadas as variaveis por local

  const analisesMes = variaveis.Analises.filter(l => {
    return l.mes === mes;
  });

  // Valores mensais
  const totalAnalises = Utils.SomaArray(
    analisesMes.map(v => {
      return v.valor;
    })
  );

  return {
    value: {
      Total: totalAnalises,
      politicas,
      variaveis,
    },
  };
}
