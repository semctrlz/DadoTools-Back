import Receita from '../../../GlobalVars/Simulador/ReceitaBruta';

export const NomeConta = 'TAXAS DE CARTAO DE CREDITO';
export const ContaContabil = '3.1.1.1.06.01.001.007';

const politicas = {};

const variaveis = {
  percentualReceitaBruta: 0.0000285,
  taxaFixa: 65,
};

export default async function TaxasCartaoCredito(ano, mes) {
  const ReceitaBrutaMes = (await Receita(ano, mes)).value.Total;
  const totalTaxaCartao =
    ReceitaBrutaMes * variaveis.percentualReceitaBruta + variaveis.taxaFixa;

  return {
    value: {
      Total: totalTaxaCartao,
      politicas,
      variaveis,
    },
  };
}
