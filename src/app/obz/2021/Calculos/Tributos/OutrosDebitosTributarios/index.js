import Utils from '../../../../../../utils/utils';

export const NomeConta = 'OUTROS DÉBITOS TRIBUTÁRIOS';
export const ContaContabil = '3.1.1.1.05.01.020.050';
const politicas = {};
const variaveis = {
  EstimativaOutrosDebitosTributarios: [
    {
      mes: 1,
      despesa: 'IRRF S APLIC FINANCEIRA',
      valor: 2.0,
    },
    {
      mes: 2,
      despesa: 'IRRF S APLIC FINANCEIRA',
      valor: 2.0,
    },
    {
      mes: 3,
      despesa: 'IRRF S APLIC FINANCEIRA',
      valor: 2.0,
    },
    {
      mes: 4,
      despesa: 'IRRF S APLIC FINANCEIRA',
      valor: 2.0,
    },
    {
      mes: 5,
      despesa: 'IRRF S APLIC FINANCEIRA',
      valor: 2.0,
    },
    {
      mes: 6,
      despesa: 'IRRF S APLIC FINANCEIRA',
      valor: 2.0,
    },
    {
      mes: 7,
      despesa: 'IRRF S APLIC FINANCEIRA',
      valor: 2.0,
    },
    {
      mes: 8,
      despesa: 'IRRF S APLIC FINANCEIRA',
      valor: 2.0,
    },
    {
      mes: 9,
      despesa: 'IRRF S APLIC FINANCEIRA',
      valor: 2.0,
    },
    {
      mes: 10,
      despesa: 'IRRF S APLIC FINANCEIRA',
      valor: 2.0,
    },
    {
      mes: 11,
      despesa: 'IRRF S APLIC FINANCEIRA',
      valor: 2.0,
    },
    {
      mes: 12,
      despesa: 'IRRF S APLIC FINANCEIRA',
      valor: 2.0,
    },
    {
      mes: 1,
      despesa: 'IMPOSTOS SOBRE PERDAS',
      valor: 17082.32,
    },
    {
      mes: 2,
      despesa: 'IMPOSTOS SOBRE PERDAS',
      valor: 17082.32,
    },
    {
      mes: 3,
      despesa: 'IMPOSTOS SOBRE PERDAS',
      valor: 17082.32,
    },
    {
      mes: 4,
      despesa: 'IMPOSTOS SOBRE PERDAS',
      valor: 17082.32,
    },
    {
      mes: 5,
      despesa: 'IMPOSTOS SOBRE PERDAS',
      valor: 17082.32,
    },
    {
      mes: 6,
      despesa: 'IMPOSTOS SOBRE PERDAS',
      valor: 17082.32,
    },
    {
      mes: 7,
      despesa: 'IMPOSTOS SOBRE PERDAS',
      valor: 17082.32,
    },
    {
      mes: 8,
      despesa: 'IMPOSTOS SOBRE PERDAS',
      valor: 17082.32,
    },
    {
      mes: 9,
      despesa: 'IMPOSTOS SOBRE PERDAS',
      valor: 17082.32,
    },
    {
      mes: 10,
      despesa: 'IMPOSTOS SOBRE PERDAS',
      valor: 17082.32,
    },
    {
      mes: 11,
      despesa: 'IMPOSTOS SOBRE PERDAS',
      valor: 17082.32,
    },
    {
      mes: 12,
      despesa: 'IMPOSTOS SOBRE PERDAS',
      valor: 17082.32,
    },
    {
      mes: 1,
      despesa: 'ESTIMATIVA DIFAL USO E CONS E IMOBILIZADO',
      valor: 577.59,
    },
    {
      mes: 2,
      despesa: 'ESTIMATIVA DIFAL USO E CONS E IMOBILIZADO',
      valor: 577.59,
    },
    {
      mes: 3,
      despesa: 'ESTIMATIVA DIFAL USO E CONS E IMOBILIZADO',
      valor: 577.59,
    },
    {
      mes: 4,
      despesa: 'ESTIMATIVA DIFAL USO E CONS E IMOBILIZADO',
      valor: 577.59,
    },
    {
      mes: 5,
      despesa: 'ESTIMATIVA DIFAL USO E CONS E IMOBILIZADO',
      valor: 577.59,
    },
    {
      mes: 6,
      despesa: 'ESTIMATIVA DIFAL USO E CONS E IMOBILIZADO',
      valor: 577.59,
    },
    {
      mes: 7,
      despesa: 'ESTIMATIVA DIFAL USO E CONS E IMOBILIZADO',
      valor: 577.59,
    },
    {
      mes: 8,
      despesa: 'ESTIMATIVA DIFAL USO E CONS E IMOBILIZADO',
      valor: 577.59,
    },
    {
      mes: 9,
      despesa: 'ESTIMATIVA DIFAL USO E CONS E IMOBILIZADO',
      valor: 577.59,
    },
    {
      mes: 10,
      despesa: 'ESTIMATIVA DIFAL USO E CONS E IMOBILIZADO',
      valor: 577.59,
    },
    {
      mes: 11,
      despesa: 'ESTIMATIVA DIFAL USO E CONS E IMOBILIZADO',
      valor: 577.59,
    },
    {
      mes: 12,
      despesa: 'ESTIMATIVA DIFAL USO E CONS E IMOBILIZADO',
      valor: 577.59,
    },
  ],
};

export default function OutrosDebitosTributarios(ano, mes) {
  // Valor estimado outros debitos tributarios
  const totalOutrosDebitosTributarios = Utils.SomaArray(
    variaveis.EstimativaOutrosDebitosTributarios.filter(v => {
      return v.mes === mes;
    }).map(v => {
      return v.valor;
    })
  );

  return {
    value: {
      Total: totalOutrosDebitosTributarios,
      politicas,
      variaveis,
    },
  };
}
