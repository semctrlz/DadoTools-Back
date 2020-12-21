import Cenarios from '../../../../../models/SimuladorCenarios';

export const cenariosValidos = [
  {
    mes: 1,
    cenario: 8,
  },
  {
    mes: 2,
    cenario: 9,
  },
  {
    mes: 3,
    cenario: 10,
  },
  {
    mes: 4,
    cenario: 11,
  },
  {
    mes: 5,
    cenario: 12,
  },
  {
    mes: 6,
    cenario: 13,
  },
  {
    mes: 7,
    cenario: 14,
  },
  {
    mes: 8,
    cenario: 15,
  },
  {
    mes: 9,
    cenario: 16,
  },
  {
    mes: 10,
    cenario: 17,
  },
  {
    mes: 11,
    cenario: 18,
  },
  {
    mes: 12,
    cenario: 19,
  },
];

export default async function MercadoInterno(ano, mes) {
  // Primeiro pegar a exportacao e o cenário do mês

  const [CenarioOficial] = cenariosValidos.filter(c => c.mes === mes);

  const dados = await Cenarios.findOne({
    where: { id: CenarioOficial.cenario },
  });

  const cenarioMes = dados.json_obj;

  let volume = 0;
  let receitaBruta = 0;
  let st = 0;
  let fcp = 0;
  let ipi = 0;
  let icms = 0;
  let pis = 0;
  let cofins = 0;
  let receitaLiquida = 0;
  let frete = 0;
  let cpv = 0;
  let descontosConcedidos = 0;
  let marketing = 0;
  let margem = 0;

  // TODO Alterar preços venda SUsin
  // TODO Tabelas dolarizadas dos insumos Marcirio/Igor
  // TODO Escalonar o GGF da SANTAMATE para ir aumentando progressivamente o aumento de 10% do GGF (Por fora da ferramenta)

  cenarioMes.forEach(prod => {
    const peso = prod.volumeUnitario;
    prod.estados.forEach(uf => {
      let volumeAtual = 0;
      if (uf.volume) volumeAtual = Number(uf.volume.split('.').join(''));
      let preco = 0;
      if (uf.precoMed) preco = Number(String(uf.precoMed).replace(',', '.'));

      receitaBruta += (preco / peso) * volumeAtual;

      volume += volumeAtual;

      margem += uf.margemValor || 0;
      if (uf.impostos && uf.impostos.valorTotal) {
        st += uf.impostos.valorTotal.icmsSt;
        fcp += uf.impostos.valorTotal.icmsStFCP;
        ipi += uf.impostos.valorTotal.ipi;
        icms += uf.impostos.valorTotal.icms;
        pis += uf.impostos.valorTotal.pis;
        cofins += uf.impostos.valorTotal.cofins;
      }

      receitaLiquida += uf.receitaLiquida
        ? Number(uf.receitaLiquida.split('.').join(''))
        : 0;

      frete += uf.totalFrete || 0;
      cpv += uf.custoTotal || 0;
      descontosConcedidos += uf.descConced || 0;
      marketing += uf.marketing || 0;
    });
  });

  const ResumoVendaInterna = [
    {
      NomeConta: 'VOLUME (L)',
      Conta: '',
      Valor: volume,
    },
    {
      NomeConta: 'RECEITA BRUTA',
      Conta: '',
      Valor: receitaBruta,
    },
    {
      NomeConta: 'ST',
      Conta: '',
      Valor: st,
    },
    {
      NomeConta: 'FCP',
      Conta: '',
      Valor: fcp,
    },
    {
      NomeConta: 'IPI',
      Conta: '',
      Valor: ipi,
    },
    {
      NomeConta: 'ICMS',
      Conta: '',
      Valor: icms,
    },
    {
      NomeConta: 'PIS',
      Conta: '',
      Valor: pis,
    },
    {
      NomeConta: 'COFINS',
      Conta: '',
      Valor: cofins,
    },
    {
      NomeConta: 'RECEITA LIQUIDA',
      Conta: '',
      Valor: receitaLiquida,
    },
    {
      NomeConta: 'CPV',
      Conta: '',
      Valor: cpv,
    },
    {
      NomeConta: 'FRETE',
      Conta: '',
      Valor: frete,
    },
    {
      NomeConta: 'DESCONTOS CONCEDIDOS',
      Conta: '',
      Valor: descontosConcedidos,
    },
    {
      NomeConta: 'MARKETING',
      Conta: '',
      Valor: marketing,
    },
    {
      NomeConta: 'MARGEM',
      Conta: '',
      Valor: margem,
    },
  ];

  return ResumoVendaInterna;
}
