import Utils from '../../../../../../utils/utils';

export const NomeConta = 'ENTIDADES ASSOCIATIVAS';
export const ContaContabil = '3.1.1.1.05.01.010.032';

const politicas = {};
const variaveis = {
  ABRH: [{ mes: 1, valor: 1100 }],
};

export default function EntidadesAssiciativas(ano, mes) {
  // Valor Associacao ABRH
  const valorABRH = Utils.SomaArray(
    variaveis.ABRH.filter(m => m.mes === mes).map(v => v.valor)
  );

  return {
    value: {
      Total: valorABRH,
      Descricao: {
        ABRH: valorABRH,
      },
      politicas,
      variaveis,
    },
  };
}
