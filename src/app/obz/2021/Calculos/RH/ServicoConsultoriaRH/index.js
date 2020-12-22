import Utils from '../../../../../../utils/utils';

export const donoConta = 'Vanessa';
export const dataValidacao = '21/12/2020';

export const NomeConta = 'SERVICOS DE CONSULTORIA EM RH';
export const ContaContabil = '3.1.1.1.05.01.010.032';
const politicas = {};
const variaveis = {
  consultoriaComunicacaoInterna: [
    { mes: 1, valor: 1850 },
    { mes: 2, valor: 1850 },
    { mes: 3, valor: 1850 },
    { mes: 4, valor: 1850 },
    { mes: 5, valor: 1850 },
    { mes: 6, valor: 1850 },
    { mes: 7, valor: 1850 },
    { mes: 8, valor: 1850 },
    { mes: 9, valor: 1850 },
    { mes: 10, valor: 1850 },
    { mes: 11, valor: 1850 },
    { mes: 12, valor: 1850 },
  ],
  consultoriaDesenvolvimento: [
    { mes: 3, valor: 5830 },
    { mes: 4, valor: 5830 },
    { mes: 5, valor: 5830 },
    { mes: 6, valor: 4075 },
    { mes: 7, valor: 4075 },
    { mes: 8, valor: 4075 },
    { mes: 9, valor: 4075 },
    { mes: 10, valor: 4075 },
    { mes: 11, valor: 4075 },
  ],
  consultoriaCargosESalarios: [
    { mes: 1, valor: 5000 },
    { mes: 2, valor: 5000 },
    { mes: 3, valor: 5000 },
    { mes: 4, valor: 4250 },
    { mes: 5, valor: 4250 },
  ],
};

export default function ServicoConsultoriaRH(ano, mes) {
  const valorConsultoriaComunicacaoInterna = Utils.SomaArray(
    variaveis.consultoriaComunicacaoInterna
      .filter(c => c.mes === mes)
      .map(c => c.valor)
  );
  const valorConsultoriaDesenvolvimento = Utils.SomaArray(
    variaveis.consultoriaDesenvolvimento
      .filter(c => c.mes === mes)
      .map(c => c.valor)
  );
  const valorConsultoriaCargosESalarios = Utils.SomaArray(
    variaveis.consultoriaCargosESalarios
      .filter(c => c.mes === mes)
      .map(c => c.valor)
  );

  return {
    value: {
      Total:
        valorConsultoriaComunicacaoInterna +
        valorConsultoriaDesenvolvimento +
        valorConsultoriaCargosESalarios,
      ConsultoriaComunicacaoInterna: valorConsultoriaComunicacaoInterna,
      ConsultoriaDesenvolvimento: valorConsultoriaDesenvolvimento,
      ConsultoriaCargosESalarios: valorConsultoriaCargosESalarios,
      politicas,
      variaveis,
    },
  };
}
