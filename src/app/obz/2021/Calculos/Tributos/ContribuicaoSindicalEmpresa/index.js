export const NomeConta = 'CONTRIBUICAO SINDICAL EMPRESA';
export const ContaContabil = '3.1.1.1.05.01.020.001';

const politicas = {};
const variaveis = {
  ValorCapitalSocial: 0,
  PercentualSobreCapitalSocial: 0.0,
};

// Conforme o Raphael a contribuição é opcional e optamos por não pagá-la
export default function ContribuicaoSindicalEmpresa(ano, mes) {
  // Separadas as variaveis por local

  const TotalContribuicaoSindical =
    mes === 1
      ? variaveis.ValorCapitalSocial * variaveis.PercentualSobreCapitalSocial
      : 0;

  return {
    value: {
      Total: TotalContribuicaoSindical,
      politicas,
      variaveis,
    },
  };
}
