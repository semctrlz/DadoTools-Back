import Utils from '../../../../../../utils/utils';
import ReceitaBruta from '../../../GlobalVars/Simulador/ReceitaBruta';

export const NomeConta = 'SERVICOS DE CONTABILIDADE';
export const ContaContabil = '3.1.1.1.05.01.010.020';

const politicas = {
  PisDesagioCompraICMS: 0.0165,
  CofinsDesagioCompraICMS: 0.076,
  // Valores percentuais de Exito Futuros
  ValoresExitoExclusaoIcmsBasePisCofinsFuturo: [
    { mes: 1, valor: 0.017 },
    { mes: 2, valor: 0.017 },
    { mes: 3, valor: 0.017 },
    { mes: 4, valor: 0.017 },
    { mes: 5, valor: 0.017 },
    { mes: 6, valor: 0.017 },
    { mes: 7, valor: 0.017 },
    { mes: 8, valor: 0.017 },
    { mes: 9, valor: 0.017 },
    { mes: 10, valor: 0.017 },
    { mes: 11, valor: 0.017 },
    { mes: 12, valor: 0.017 },
  ],
};
const variaveis = {
  percentualICMSTotal: 0.0948,
  PercentualCompraICMS: 0.8,
  DesagioCompraIcms: 0.04,
  SuccessFeeCompraIcms: 0.2,
  ValoresFixos: [
    {
      mes: 1,
      descricao: 'SYSTDA',
      valor: 591.47,
    },
    {
      mes: 2,
      descricao: 'SYSTDA',
      valor: 591.47,
    },
    {
      mes: 3,
      descricao: 'SYSTDA',
      valor: 591.47,
    },
    {
      mes: 4,
      descricao: 'SYSTDA',
      valor: 591.47,
    },
    {
      mes: 5,
      descricao: 'SYSTDA',
      valor: 591.47,
    },
    {
      mes: 6,
      descricao: 'SYSTDA',
      valor: 591.47,
    },
    {
      mes: 7,
      descricao: 'SYSTDA',
      valor: 591.47,
    },
    {
      mes: 8,
      descricao: 'SYSTDA',
      valor: 591.47,
    },
    {
      mes: 9,
      descricao: 'SYSTDA',
      valor: 591.47,
    },
    {
      mes: 10,
      descricao: 'SYSTDA',
      valor: 591.47,
    },
    {
      mes: 11,
      descricao: 'SYSTDA',
      valor: 591.47,
    },
    {
      mes: 12,
      descricao: 'SYSTDA',
      valor: 591.47,
    },
    {
      mes: 1,
      descricao: 'ECONET',
      valor: 591.47,
    },
    {
      mes: 2,
      descricao: 'ECONET',
      valor: 591.47,
    },
    {
      mes: 3,
      descricao: 'ECONET',
      valor: 591.47,
    },
    {
      mes: 4,
      descricao: 'ECONET',
      valor: 591.47,
    },
    {
      mes: 5,
      descricao: 'ECONET',
      valor: 591.47,
    },
    {
      mes: 6,
      descricao: 'ECONET',
      valor: 591.47,
    },
    {
      mes: 7,
      descricao: 'ECONET',
      valor: 591.47,
    },
    {
      mes: 8,
      descricao: 'ECONET',
      valor: 591.47,
    },
    {
      mes: 9,
      descricao: 'ECONET',
      valor: 591.47,
    },
    {
      mes: 10,
      descricao: 'ECONET',
      valor: 591.47,
    },
    {
      mes: 11,
      descricao: 'ECONET',
      valor: 591.47,
    },
    {
      mes: 12,
      descricao: 'ECONET',
      valor: 591.47,
    },
    {
      mes: 1,
      descricao: 'CEFIS',
      valor: 100.0,
    },
    {
      mes: 2,
      descricao: 'CEFIS',
      valor: 100.0,
    },
    {
      mes: 3,
      descricao: 'CEFIS',
      valor: 100.0,
    },
    {
      mes: 4,
      descricao: 'CEFIS',
      valor: 100.0,
    },
    {
      mes: 5,
      descricao: 'CEFIS',
      valor: 100.0,
    },
    {
      mes: 6,
      descricao: 'CEFIS',
      valor: 100.0,
    },
    {
      mes: 7,
      descricao: 'CEFIS',
      valor: 100.0,
    },
    {
      mes: 8,
      descricao: 'CEFIS',
      valor: 100.0,
    },
    {
      mes: 9,
      descricao: 'CEFIS',
      valor: 100.0,
    },
    {
      mes: 10,
      descricao: 'CEFIS',
      valor: 100.0,
    },
    {
      mes: 11,
      descricao: 'CEFIS',
      valor: 100.0,
    },
    {
      mes: 12,
      descricao: 'CEFIS',
      valor: 100.0,
    },
  ],
  Pompermayer: [
    {
      mes: 1,
      horas: 30,
      valorTotal: 3300,
    },
    {
      mes: 4,
      horas: 30,
      valorTotal: 3300,
    },

    {
      mes: 7,
      horas: 30,
      valorTotal: 3300,
    },
    {
      mes: 10,
      horas: 30,
      valorTotal: 3300,
    },
  ],
  Affectum: [
    {
      mes: 1,
      horas: 30,
      valorTotal: 3500,
    },
    {
      mes: 2,
      horas: 30,
      valorTotal: 3500,
    },
  ],
  // Success Fee
  ValoresExitoExclusaoIcmsBasePisCofins: [
    {
      mes: 1,
      descricao:
        'RAFAEL DIEHL E MARCELO FRONER - ÊXITO LEVANTAMENTO CREDITOS EXC ICMS BC PIS/COFINS',
      valor: 30339.75,
    },
    {
      mes: 2,
      descricao:
        'RAFAEL DIEHL E MARCELO FRONER - ÊXITO LEVANTAMENTO CREDITOS EXC ICMS BC PIS/COFINS',
      valor: 30339.75,
    },
    {
      mes: 3,
      descricao:
        'RAFAEL DIEHL E MARCELO FRONER - ÊXITO LEVANTAMENTO CREDITOS EXC ICMS BC PIS/COFINS',
      valor: 30339.75,
    },
    {
      mes: 4,
      descricao:
        'RAFAEL DIEHL E MARCELO FRONER - ÊXITO LEVANTAMENTO CREDITOS EXC ICMS BC PIS/COFINS',
      valor: 30339.75,
    },
    {
      mes: 5,
      descricao:
        'RAFAEL DIEHL E MARCELO FRONER - ÊXITO LEVANTAMENTO CREDITOS EXC ICMS BC PIS/COFINS',
      valor: 30339.75,
    },
    {
      mes: 6,
      descricao:
        'RAFAEL DIEHL E MARCELO FRONER - ÊXITO LEVANTAMENTO CREDITOS EXC ICMS BC PIS/COFINS',
      valor: 30339.75,
    },
    {
      mes: 7,
      descricao:
        'RAFAEL DIEHL E MARCELO FRONER - ÊXITO LEVANTAMENTO CREDITOS EXC ICMS BC PIS/COFINS',
      valor: 30339.75,
    },
    {
      mes: 8,
      descricao:
        'RAFAEL DIEHL E MARCELO FRONER - ÊXITO LEVANTAMENTO CREDITOS EXC ICMS BC PIS/COFINS',
      valor: 30339.75,
    },
    {
      mes: 9,
      descricao:
        'RAFAEL DIEHL E MARCELO FRONER - ÊXITO LEVANTAMENTO CREDITOS EXC ICMS BC PIS/COFINS',
      valor: 30339.75,
    },
    {
      mes: 10,
      descricao:
        'RAFAEL DIEHL E MARCELO FRONER - ÊXITO LEVANTAMENTO CREDITOS EXC ICMS BC PIS/COFINS',
      valor: 30339.75,
    },
    {
      mes: 11,
      descricao:
        'RAFAEL DIEHL E MARCELO FRONER - ÊXITO LEVANTAMENTO CREDITOS EXC ICMS BC PIS/COFINS',
      valor: 30339.75,
    },
    {
      mes: 12,
      descricao:
        'RAFAEL DIEHL E MARCELO FRONER - ÊXITO LEVANTAMENTO CREDITOS EXC ICMS BC PIS/COFINS',
      valor: 30339.75,
    },
  ],
  SuccessFeeExclusaoIcmsBasePisCofins: 0.2,

  // Success Fee Futuro
  SuccessFeeExclusaoIcmsBasePisCofinsFuturo: 0.2,
  SaldoCreditoIRPJCSLLAnoAnt: 180000,
  ValorEstimadoIRPJCSLL: [
    { mes: 1, valor: 100 },
    { mes: 2, valor: 100 },
  ],
  SuccessFeeUsoSaldoIRPJCSLL: 0.2,
};

export default async function ServicosContabilidade(ano, mes) {
  // Reveita bruta interna do mês atual
  const ValorReceitaBruta = (await ReceitaBruta(ano, mes)).ReceitaBrutaInterna
    .Total;

  // Servicos de contabilidade
  // Fixos
  const TotalValoresFixos = Utils.SomaArray(
    variaveis.ValoresFixos.filter(v => {
      return v.mes === mes;
    }).map(v => {
      return v.valor;
    })
  );

  // Pompermayer
  const TotalValoresPompermayer = Utils.SomaArray(
    variaveis.Pompermayer.filter(v => {
      return v.mes === mes;
    }).map(v => {
      return v.valorTotal;
    })
  );
  // Affectum
  const TotalValoresAffectum = Utils.SomaArray(
    variaveis.Affectum.filter(v => {
      return v.mes === mes;
    }).map(v => {
      return v.valorTotal;
    })
  );

  // Valor Exito Exclusao ICMS
  const valorExitoExclusaoIcms = Utils.SomaArray(
    variaveis.ValoresExitoExclusaoIcmsBasePisCofins.filter(v => {
      return v.mes === mes;
    }).map(v => {
      return v.valor;
    })
  );

  const totalValorExitoExclusaoIcmsBasePisCofins =
    valorExitoExclusaoIcms * variaveis.SuccessFeeExclusaoIcmsBasePisCofins;

  const PercentualExitoFuturo = Utils.SomaArray(
    politicas.ValoresExitoExclusaoIcmsBasePisCofinsFuturo.filter(v => {
      return v.mes === mes;
    }).map(v => {
      return v.valor;
    })
  );

  const totalValorExitoExclusaoIcmsBasePisCofinsFuturo =
    ValorReceitaBruta *
    PercentualExitoFuturo *
    variaveis.SuccessFeeExclusaoIcmsBasePisCofinsFuturo;

  const ReceitaBrutaMes = (await ReceitaBruta(ano, mes)).value.Total;

  const ValorIcmsMes = ReceitaBrutaMes * variaveis.percentualICMSTotal;
  const CompraIcms = ValorIcmsMes * variaveis.PercentualCompraICMS;

  const valorDesagioCompraIcms = CompraIcms * variaveis.DesagioCompraIcms;

  const totalSuccessFeeDesagioCompraIcms =
    valorDesagioCompraIcms * variaveis.SuccessFeeCompraIcms;

  const Descricao = {
    Consultorias: {
      Total: TotalValoresFixos + TotalValoresPompermayer + TotalValoresAffectum,
      Fixas: TotalValoresFixos,
      Pompermayer: TotalValoresPompermayer,
      Affectum: TotalValoresAffectum,
    },
    SuccessFee: {
      ExitoExclusaoICMSBaseCalculoPisCofins: {
        Total:
          totalValorExitoExclusaoIcmsBasePisCofinsFuturo +
          totalValorExitoExclusaoIcmsBasePisCofins,
      },
      SuccessFeeCompraIcms: {
        Total: totalSuccessFeeDesagioCompraIcms,
      },
    },
  };

  return {
    value: {
      Total:
        Descricao.Consultorias.Total +
        Descricao.SuccessFee.ExitoExclusaoICMSBaseCalculoPisCofins.Total +
        Descricao.SuccessFee.SuccessFeeCompraIcms.Total,
      Descricao,
      politicas,
      variaveis,
    },
  };
  // return {
  //   value: {
  //     Total:
  //       Descricao.Consultorias.Total +
  //       Descricao.SuccessFee.ExitoExclusaoICMSBaseCalculoPisCofins.Total,
  //     Descricao,
  //     politicas,
  //     variaveis,
  //   },
  // };
}
