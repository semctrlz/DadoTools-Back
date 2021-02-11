export const SaldoFgts = [
  { mes: 1, valor: 1800 },
  { mes: 3, valor: 22000 },
  { mes: 5, valor: 1800 },
  { mes: 7, valor: 1800 },
  { mes: 9, valor: 22000 },
  { mes: 11, valor: 1800 },
];
export const SalarioBase = [
  { mes: 1, valor: 4400 },
  { mes: 3, valor: 5454.5 },
  { mes: 5, valor: 6831 },
  { mes: 7, valor: 4440 },
  { mes: 9, valor: 4440 },
  { mes: 11, valor: 4440 },
];

export const SaldoFgtsReducao = [
  { mes: 1, valor: 1800 },
  { mes: 3, valor: 22000 + 1800 * 5 },
  { mes: 5, valor: 1800 },
  { mes: 7, valor: 1800 },
  { mes: 9, valor: 22000 },
  { mes: 11, valor: 1800 },
];
export const SalarioBaseReducao = [
  { mes: 1, valor: 4400 },
  { mes: 3, valor: 5454.5 + 11391 },
  { mes: 5, valor: 6831 },
  { mes: 7, valor: 4440 },
  { mes: 9, valor: 4440 },
  { mes: 11, valor: 4440 },
];
