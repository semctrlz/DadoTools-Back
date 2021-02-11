const variaveis = {
  Dolar: [
    { mes: 1, valor: 5.2 },
    { mes: 2, valor: 5.2 },
    { mes: 3, valor: 5.2 },
    { mes: 4, valor: 5.2 },
    { mes: 5, valor: 5.2 },
    { mes: 6, valor: 5.2 },
    { mes: 7, valor: 5.2 },
    { mes: 8, valor: 5.2 },
    { mes: 9, valor: 5.2 },
    { mes: 10, valor: 5.2 },
    { mes: 11, valor: 5.2 },
    { mes: 12, valor: 5.2 },
  ],
};

export default function Dolar(ano, mes) {
  const [DolarMes] = variaveis.Dolar.filter(t => {
    return t.mes === mes;
  });

  return {
    value: DolarMes.valor,
    vars: variaveis,
  };
}
