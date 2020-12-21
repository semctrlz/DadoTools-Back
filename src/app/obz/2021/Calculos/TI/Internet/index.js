export const politicas = {};
export const NomeConta = 'INTERNET';
export const ContaContabil = '3.1.1.1.04.01.001.030';
export const variaveis = {
  ValorInternetMensal: [{ mes: 1, valor: 1824.78 }],
};

export default function Internet(ano, mes) {
  let totalInternet = 0;
  variaveis.ValorInternetMensal.forEach(v => {
    if (v.mes <= mes) totalInternet = v.valor;
  });

  return {
    value: {
      Total: totalInternet,
      politicas,
      variaveis,
    },
  };
}
