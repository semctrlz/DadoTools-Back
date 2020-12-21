import ReceitaBruta from '../../../GlobalVars/Simulador/ReceitaBruta';

export const NomeConta = 'PERDAS DE ESTOQUE - CERVEJA';
export const ContaContabil = '3.1.1.1.04.02.001.212';
const politicas = {
  percentualReceitaBruta: 0.0,
};
const variaveis = {};

export default function PerdasEstoqueCerveja(ano, mes) {
  const receitaBrutaMes = ReceitaBruta(ano, mes).value.Total;

  const totalPerdas = politicas.percentualReceitaBruta * receitaBrutaMes;

  return {
    value: {
      Total: totalPerdas,
      politicas,
      variaveis,
    },
  };
}
