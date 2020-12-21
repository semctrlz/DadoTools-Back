export const NomeConta = 'TFLF - TAXA DE ALVARA';
export const ContaContabil = '3.1.1.1.05.01.020.040';
const politicas = {};
const variaveis = {
  TaxaDeAlvara: {
    Matriz: [{ mes: 7, valor: 45 }],
    FilialFH: [{ mes: 4, valor: 60 }],
  },
};

export default function TaxaDeAlvara(ano, mes) {
  // Separadas as variaveis por local

  const [TaxaAlvaraMatriz] = variaveis.TaxaDeAlvara.Matriz.filter(t => {
    return t.mes === mes;
  });
  const [TaxaAlvaraFilialFH] = variaveis.TaxaDeAlvara.FilialFH.filter(t => {
    return t.mes === mes;
  });

  const valorTaxaAlvaraMatriz = TaxaAlvaraMatriz ? TaxaAlvaraMatriz.valor : 0;
  const valorTaxaAlvaraFilialFH = TaxaAlvaraFilialFH
    ? TaxaAlvaraFilialFH.valor
    : 0;

  const Descricao = {
    Matriz: valorTaxaAlvaraMatriz,
    FilialFoodHall: valorTaxaAlvaraFilialFH,
  };

  return {
    value: {
      Total: valorTaxaAlvaraMatriz + valorTaxaAlvaraFilialFH,
      Descricao,
      politicas,
      variaveis,
    },
  };
}
