export const cenariosValidos = [
  {
    mes: 1,
    volume: 204540,
    receitaBruta: 957549.2,
    receitaLiquida: 957549.2,
    Cpv: 788542.7,
    Frete: 11310.0,
    descontosConcedidos: 0,
    marketing: 28726.48,
    margem: 128970.03,
  },
  {
    mes: 2,
    volume: 100450,
    receitaBruta: 370486.0,
    receitaLiquida: 370486.0,
    Cpv: 327858.23,
    Frete: 0.0,
    descontosConcedidos: 0,
    marketing: 11114.58,
    margem: 31513.19,
  },
  {
    mes: 3,
    volume: 84310,
    receitaBruta: 311869.8,
    receitaLiquida: 311869.8,
    Cpv: 275680.0,
    Frete: 0.0,
    descontosConcedidos: 0,
    marketing: 9356.09,
    margem: 26833.71,
  },
  {
    mes: 4,
    volume: 63270,
    receitaBruta: 259749.6,
    receitaLiquida: 259749.6,
    Cpv: 208010.68,
    Frete: 11310.0,
    descontosConcedidos: 0,
    marketing: 7792.49,
    margem: 32636.43,
  },
  {
    mes: 5,
    volume: 29744,
    receitaBruta: 110789.12,
    receitaLiquida: 110789.12,
    Cpv: 98189.48,
    Frete: 0.0,
    descontosConcedidos: 0,
    marketing: 3323.67,
    margem: 9275.97,
  },
  {
    mes: 6,
    volume: 36526,
    receitaBruta: 164316.48,
    receitaLiquida: 164316.48,
    Cpv: 123955.54,
    Frete: 11310.0,
    descontosConcedidos: 0,
    marketing: 4929.49,
    margem: 24121.44,
  },
  {
    mes: 7,
    volume: 33526,
    receitaBruta: 152830.48,
    receitaLiquida: 152830.48,
    Cpv: 113739.35,
    Frete: 11310.0,
    descontosConcedidos: 0,
    marketing: 4584.91,
    margem: 23196.22,
  },
  {
    mes: 8,
    volume: 29616,
    receitaBruta: 108523.68,
    receitaLiquida: 108523.68,
    Cpv: 95960.74,
    Frete: 0.0,
    descontosConcedidos: 0,
    marketing: 3255.71,
    margem: 9307.23,
  },
  {
    mes: 9,
    volume: 70142,
    receitaBruta: 260443.16,
    receitaLiquida: 260443.16,
    Cpv: 230689.0,
    Frete: 0.0,
    descontosConcedidos: 0,
    marketing: 7813.29,
    margem: 21940.87,
  },
  {
    mes: 10,
    volume: 110232,
    receitaBruta: 411504.36,
    receitaLiquida: 411504.36,
    Cpv: 364748.09,
    Frete: 0.0,
    descontosConcedidos: 0,
    marketing: 12345.13,
    margem: 34411.14,
  },
  {
    mes: 11,
    volume: 149104,
    receitaBruta: 585731.92,
    receitaLiquida: 585731.92,
    Cpv: 497612.96,
    Frete: 11310.0,
    descontosConcedidos: 0,
    marketing: 17571.96,
    margem: 59237.0,
  },
  {
    mes: 12,
    volume: 151540,
    receitaBruta: 566804.2,
    receitaLiquida: 566804.2,
    Cpv: 502526.95,
    Frete: 0.0,
    descontosConcedidos: 0,
    marketing: 17004.13,
    margem: 47273.12,
  },
];

export default function Exportacoes(ano, mes) {
  // Primeiro pegar a exportacao e o cenário do mês

  const [CenarioOficial] = cenariosValidos.filter(c => c.mes === mes);
  if (CenarioOficial) {
    const ResumoExportacao = [
      {
        NomeConta: 'VOLUME (L)',
        Conta: '',
        Valor: CenarioOficial.volume,
      },
      {
        NomeConta: 'RECEITA BRUTA',
        Conta: '',
        Valor: CenarioOficial.receitaBruta,
      },
      {
        NomeConta: 'RECEITA LIQUIDA',
        Conta: '',
        Valor: CenarioOficial.receitaLiquida,
      },
      {
        NomeConta: 'CPV',
        Conta: '',
        Valor: CenarioOficial.Cpv,
      },
      {
        NomeConta: 'FRETE',
        Conta: '',
        Valor: CenarioOficial.Frete,
      },
      {
        NomeConta: 'DESCONTOS CONCEDIDOS',
        Conta: '',
        Valor: CenarioOficial.descontosConcedidos,
      },
      {
        NomeConta: 'MARKETING',
        Conta: '',
        Valor: CenarioOficial.marketing,
      },
      {
        NomeConta: 'MARGEM',
        Conta: '',
        Valor: CenarioOficial.margem,
      },
    ];

    return ResumoExportacao;
  }
  return [];
}
