import Utils from '../../../../../../utils/utils';

export const NomeConta = 'UNIFORMES';
export const ContaContabil = '3.1.1.1.03.01.020.070';

const EUniformes = {
  Camisa: 'Camisa',
  Polo: 'Polo',
  Jaqueta: 'Jaqueta',
};
const politicas = {};
const variaveis = {
  CotacaoUniformes: [
    { uniforme: EUniformes.Camisa, valor: 88 },
    { uniforme: EUniformes.Polo, valor: 45 },
    { uniforme: EUniformes.Jaqueta, valor: 150 },
  ],
  NecessidadeUniformes: [
    { mes: 3, uniforme: EUniformes.Camisa, quantidade: 72 },
    { mes: 3, uniforme: EUniformes.Polo, quantidade: 63 },
    { mes: 5, uniforme: EUniformes.Jaqueta, quantidade: 45 },
    { mes: 9, uniforme: EUniformes.Camisa, quantidade: 72 },
    { mes: 9, uniforme: EUniformes.Polo, quantidade: 63 },
  ],
};

export default function Uniformes(ano, mes) {
  const Necessidades = variaveis.NecessidadeUniformes.filter(
    m => m.mes === mes
  );
  let valorUniformes = 0;
  if (Necessidades.length > 0) {
    valorUniformes = Utils.SomaArray(
      Necessidades.map(n => {
        const valor = Utils.SomaArray(
          variaveis.CotacaoUniformes.filter(u => u.uniforme === n.uniforme).map(
            v => v.valor
          )
        );
        return n.quantidade * valor;
      })
    );
  }

  return {
    value: {
      Total: valorUniformes,
      politicas,
      variaveis,
    },
  };
}
