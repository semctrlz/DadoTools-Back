const variaveis = {
  Dolar: [
    { mes: 1, valor: 5.8 },
    { mes: 2, valor: 6.22 },
    { mes: 3, valor: 6.2 },
    { mes: 4, valor: 6.3 },
    { mes: 5, valor: 5.8 },
    { mes: 6, valor: 6.2 },
    { mes: 7, valor: 6.25 },
    { mes: 8, valor: 6.3 },
    { mes: 9, valor: 6.4 },
    { mes: 10, valor: 6.5 },
    { mes: 11, valor: 6.6 },
    { mes: 12, valor: 6.58 },
  ],
};

export default function Dolar(ano, mes) {
  const [DolarMes] = variaveis.Dolar.filter(t => {
    return t.mes === mes;
  });

  return {
    value: { DolarMes: DolarMes.valor },
    vars: variaveis,
  };
}
