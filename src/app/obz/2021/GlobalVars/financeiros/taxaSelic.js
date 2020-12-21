const variaveis = {
  TaxaSelic: [
    { mes: 1, taxa: 0.038 },
    { mes: 2, taxa: 0.029 },
    { mes: 3, taxa: 0.034 },
    { mes: 4, taxa: 0.028 },
    { mes: 5, taxa: 0.024 },
    { mes: 6, taxa: 0.021 },
    { mes: 7, taxa: 0.019 },
    { mes: 8, taxa: 0.016 },
    { mes: 9, taxa: 0.016 },
    { mes: 10, taxa: 0.019 },
    { mes: 11, taxa: 0.016 },
    { mes: 12, taxa: 0.016 },
  ],
};

export default function TaxaSelic(ano, mes) {
  const [TaxaMes] = variaveis.TaxaSelic.filter(t => {
    return t.mes === mes;
  });

  return {
    value: { TaxaSelicMes: TaxaMes.taxa },
    vars: variaveis,
  };
}
