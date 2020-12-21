import QlComercial from '../../../GlobalVars/ql/qlComercial';
import Utils from '../../../../../../utils/utils';

export const NomeConta = 'ENDOMARKETING - COMERCIAL';
export const ContaContabil = '3.1.1.1.06.01.002.008';
const politicas = {
  reuniaoPresencial: true,
};
const variaveis = {
  valorPorPessoa: 800,
  BrindePorColaborador: [
    { item: 'Brinde 4', valor: 35 },
    { item: 'Brinde 5', valor: 2.5 },
  ],
  BrindesGerais: [
    { item: 'Brinde 1', valor: 100 },
    { item: 'Brinde 2', valor: 100 },
    { item: 'Brinde 3', valor: 100 },
  ],
};

export default function Endomarketing(ano, mes) {
  // Visto que o valor da convenção é R$ 800 por pessoa e dividido entre
  // Setembro (40%) e outubro (60%) (segundo a Gabriele),
  // vamos usar como base o QL de outubro

  const QLOutubro = QlComercial(ano, 10).value.QLEfetivos;

  let valorConvencao = 0;
  const valorTotalConvencao = QLOutubro.length * variaveis.valorPorPessoa;

  if (mes === 9) {
    valorConvencao = valorTotalConvencao * 0.4;
  } else if (mes === 10) {
    valorConvencao = valorTotalConvencao * 0.6;
  }

  let valorBrindes = 0;
  // Definido pela Gabriele como sendo em Janeiro a compra dos brindes
  if (mes === 1) {
    const valorBrindesUnit = Utils.SomaArray(
      variaveis.BrindePorColaborador.map(v => {
        return v.valor;
      })
    );
    valorBrindes += QLOutubro.length * valorBrindesUnit;

    const valorBrindesColet = Utils.SomaArray(
      variaveis.BrindesGerais.map(v => {
        return v.valor;
      })
    );

    valorBrindes += valorBrindesColet;
  }

  return {
    value: {
      Total: valorConvencao + valorBrindes,
      Descricao: {
        ValorConvencao: valorConvencao,
        Brindes: valorBrindes,
      },
      politicas,
      variaveis,
    },
  };
}
