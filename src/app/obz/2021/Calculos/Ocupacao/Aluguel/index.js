export const NomeConta = 'ALUGUEL - OCUPACAO';
export const ContaContabil = '3.1.1.1.05.01.001.001';
const politicas = {};
const variaveis = {
  Aluguel: [
    {
      mes: 1,
      valor: 10000,
    },
  ],
};

export default function Aluguel(ano, mes) {
  let valorAtualizado = 0;

  variaveis.Aluguel.forEach(a => {
    if (a.mes <= mes) valorAtualizado = a.valor;
  });

  return {
    value: {
      Total: valorAtualizado,
      politicas,
      variaveis,
    },
  };
}
