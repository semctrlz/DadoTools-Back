import Utils from '../../../../../../utils/utils';

export const NomeConta = 'MULTAS INDEDUTÍVEIS OBRIG.TRIB.';
export const ContaContabil = '3.1.1.1.05.01.020.060';
const politicas = {};
const variaveis = {
  EstimativaMultasIndedutiveisObrigTribut: [
    {
      mes: 12,
      valor: 3000,
    },
  ],
};

export default function MultasIndedutiveisObrigTribut(ano, mes) {
  // Valor estimado outros debitos tributarios
  const totalEstimativaMultasIndedutiveisObrigTribut = Utils.SomaArray(
    variaveis.EstimativaMultasIndedutiveisObrigTribut.filter(v => {
      return v.mes === mes;
    }).map(v => {
      return v.valor;
    })
  );

  return {
    value: {
      Total: totalEstimativaMultasIndedutiveisObrigTribut,
      politicas,
      variaveis,
    },
  };
}
