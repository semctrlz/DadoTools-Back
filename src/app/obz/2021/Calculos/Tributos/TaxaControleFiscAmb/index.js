export const NomeConta = 'TCFA - TAXA DE CONTROLE E FISC AMBIENTAL';
export const ContaContabil = '3.1.1.1.05.01.020.030';

const politicas = {};
const variaveis = {
  TaxaDeControleFiscAmb: {
    Matriz: [
      { mes: 3, valor: 2318.69 },
      { mes: 6, valor: 2318.69 },
      { mes: 9, valor: 2318.69 },
      { mes: 12, valor: 2318.69 },
    ],
    FilialFH: [{ mes: 1, valor: 0 }],
  },
};

export default function TaxaControleFiscAmb(ano, mes) {
  // Separadas as variaveis por local

  const [
    TaxaControleFiscAmbMatriz,
  ] = variaveis.TaxaDeControleFiscAmb.Matriz.filter(t => {
    return t.mes === mes;
  });
  const [
    TaxaControleFiscAmbFilialFH,
  ] = variaveis.TaxaDeControleFiscAmb.FilialFH.filter(t => {
    return t.mes === mes;
  });

  const valorTaxaControleFiscAmbMatriz = TaxaControleFiscAmbMatriz
    ? TaxaControleFiscAmbMatriz.valor
    : 0;
  const valorTaxaControleFiscAmbFilialFH = TaxaControleFiscAmbFilialFH
    ? TaxaControleFiscAmbFilialFH.valor
    : 0;

  const Descricao = {
    Matriz: valorTaxaControleFiscAmbMatriz,
    FilialFoodHall: valorTaxaControleFiscAmbFilialFH,
  };

  return {
    value: {
      Total: valorTaxaControleFiscAmbMatriz + valorTaxaControleFiscAmbFilialFH,
      Descricao,
      politicas,
      variaveis,
    },
  };
}
