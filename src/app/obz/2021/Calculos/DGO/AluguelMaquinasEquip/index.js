import Utils from '../../../../../../utils/utils';

export const NomeConta = 'LOCACAO DE MAQUINAS E EQUIPAMENTOS';
export const ContaContabil = '3.1.1.1.04.02.010.011';
const politicas = {};
const variaveis = {
  Impressora: [
    {
      mes: 1,
      valor: 235.5,
    },
  ],
  MaquinaCafe: [
    {
      mes: 1,
      valor: 130,
    },
  ],
};

export default function AluguelMaquinasEquip(ano, mes) {
  const valorMaquinaCafe = Utils.SomaArray(
    variaveis.MaquinaCafe.filter(v => {
      return v.mes === mes;
    }).map(v => {
      return v.valor;
    })
  );

  const valorImpressora = Utils.SomaArray(
    variaveis.Impressora.filter(v => {
      return v.mes === mes;
    }).map(v => {
      return v.valor;
    })
  );

  return {
    value: {
      Total: valorImpressora + valorMaquinaCafe,
      Descricao: {
        Impressora: valorImpressora,
        MaquinaCafe: valorMaquinaCafe,
      },
      politicas,
      variaveis,
    },
  };
}
