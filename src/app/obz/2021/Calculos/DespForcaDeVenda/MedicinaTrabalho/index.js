import Utils from '../../../../../../utils/utils';

export const NomeConta = 'MEDICINA DO TRABALHO COMERCIAL';
export const ContaContabil = '3.1.1.1.06.01.002.015';
// entre o comercial e o comercial na hora de lançar
const politicas = {
  idadeMinimaAudioMetia: 40,
};

const variaveis = {
  quantExames: [
    { mes: 1, RS: 1, SC: 0, PR: 0 },
    { mes: 2, RS: 1, SC: 0, PR: 0 },
    { mes: 3, RS: 2, SC: 0, PR: 0 },
    { mes: 4, RS: 8, SC: 2, PR: 0 },
    { mes: 5, RS: 1, SC: 2, PR: 1 },
    { mes: 6, RS: 0, SC: 1, PR: 0 },
    { mes: 7, RS: 4, SC: 2, PR: 0 },
    { mes: 9, RS: 1, SC: 0, PR: 0 },
    { mes: 10, RS: 0, SC: 1, PR: 0 },
    { mes: 11, RS: 2, SC: 1, PR: 0 },
  ],
  Exames: {
    RS: 402.88,
    SC: 440.88,
    PR: 246.2,
  },
};

export default function MedicinaTrabalho(ano, mes) {
  const valorRS =
    Utils.SomaArray(
      variaveis.quantExames.filter(m => m.mes === mes).map(v => v.RS)
    ) * variaveis.Exames.RS;
  const valorSC =
    Utils.SomaArray(
      variaveis.quantExames.filter(m => m.mes === mes).map(v => v.SC)
    ) * variaveis.Exames.SC;
  const valorPR =
    Utils.SomaArray(
      variaveis.quantExames.filter(m => m.mes === mes).map(v => v.PR)
    ) * variaveis.Exames.PR;

  return {
    value: {
      Total: valorRS + valorSC + valorPR,
      Descricao: {
        valorRS,
        valorSC,
        valorPR,
      },
      politicas,
      variaveis,
    },
  };
}
