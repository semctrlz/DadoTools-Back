export const cenariosValidos = [
  {
    mes: 1,
    volume: 204540,
    receitaBruta: 957549.2,
    receitaLiquida: 957549.2,
    Cpv: 749634.7,
    descontosConcedidos: 0,
    marketing: 28726.48,
    margem: 179188.03,
  },
  {
    mes: 2,
    volume: 100450,
    receitaBruta: 370486.0,
    receitaLiquida: 370486.0,
    Cpv: 307768.23,
    descontosConcedidos: 0,
    marketing: 11114.58,
    margem: 51603.19,
  },
  {
    mes: 3,
    volume: 84310,
    receitaBruta: 311869.8,
    receitaLiquida: 311869.8,
    Cpv: 258818.0,
    descontosConcedidos: 0,
    marketing: 9356.09,
    margem: 43695.71,
  },
  {
    mes: 4,
    volume: 63270,
    receitaBruta: 259749.6,
    receitaLiquida: 259749.6,
    Cpv: 197356.68,
    descontosConcedidos: 0,
    marketing: 7792.49,
    margem: 54600.43,
  },
  {
    mes: 5,
    volume: 29744,
    receitaBruta: 110789.12,
    receitaLiquida: 110789.12,
    Cpv: 92240.68,
    descontosConcedidos: 0,
    marketing: 3323.67,
    margem: 15224.77,
  },
  {
    mes: 6,
    volume: 36526,
    receitaBruta: 164316.48,
    receitaLiquida: 164316.48,
    Cpv: 118650.34,
    descontosConcedidos: 0,
    marketing: 4929.49,
    margem: 40736.64,
  },
  {
    mes: 7,
    volume: 33526,
    receitaBruta: 152830.48,
    receitaLiquida: 152830.48,
    Cpv: 109034.15,
    descontosConcedidos: 0,
    marketing: 4584.91,
    margem: 39211.42,
  },
  {
    mes: 8,
    volume: 29616,
    receitaBruta: 108523.68,
    receitaLiquida: 108523.68,
    Cpv: 90037.54,
    descontosConcedidos: 0,
    marketing: 3255.71,
    margem: 15230.43,
  },
  {
    mes: 9,
    volume: 70142,
    receitaBruta: 260443.16,
    receitaLiquida: 260443.16,
    Cpv: 216660.6,
    descontosConcedidos: 0,
    marketing: 7813.29,
    margem: 35969.27,
  },
  {
    mes: 10,
    volume: 110232,
    receitaBruta: 411504.36,
    receitaLiquida: 411504.36,
    Cpv: 342701.69,
    descontosConcedidos: 0,
    marketing: 12345.13,
    margem: 56457.54,
  },
  {
    mes: 11,
    volume: 149104,
    receitaBruta: 585731.92,
    receitaLiquida: 585731.92,
    Cpv: 469792.16,
    descontosConcedidos: 0,
    marketing: 17571.96,
    margem: 98367.8,
  },
  {
    mes: 12,
    volume: 151540,
    receitaBruta: 566804.2,
    receitaLiquida: 566804.2,
    Cpv: 472218.95,
    descontosConcedidos: 0,
    marketing: 17004.13,
    margem: 77581.12,
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
        Valor: 0,
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
