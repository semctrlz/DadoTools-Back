import Cenarios from '../../../../../models/SimuladorCenarios';
// eslint-disable-next-line import/no-cycle
import { versao } from '../../../versions';

export const VersaoOficial = [
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

// Cenário de 24.2MM e com mudança nos preços
export const VersaoAlterada25MM = [
  { mes: 1, cenario: 35 },
  { mes: 2, cenario: 36 },
  { mes: 3, cenario: 37 },
  { mes: 4, cenario: 38 },
  { mes: 5, cenario: 39 },
  { mes: 6, cenario: 40 },
  { mes: 7, cenario: 41 },
  { mes: 8, cenario: 42 },
  { mes: 9, cenario: 43 },
  { mes: 10, cenario: 44 },
  { mes: 11, cenario: 45 },
  { mes: 12, cenario: 46 },
];

// Cenário de 26MM e com mudança nos preços
export const VersaoAlterada27MM = [
  { mes: 1, cenario: 47 },
  { mes: 2, cenario: 48 },
  { mes: 3, cenario: 49 },
  { mes: 4, cenario: 50 },
  { mes: 5, cenario: 51 },
  { mes: 6, cenario: 52 },
  { mes: 7, cenario: 53 },
  { mes: 8, cenario: 54 },
  { mes: 9, cenario: 55 },
  { mes: 10, cenario: 56 },
  { mes: 11, cenario: 57 },
  { mes: 12, cenario: 58 },
];

// Cenário de 25MM e com preços iniciais
export const VersaoInicial25MM = [
  { mes: 1, cenario: 59 },
  { mes: 2, cenario: 60 },
  { mes: 3, cenario: 61 },
  { mes: 4, cenario: 62 },
  { mes: 5, cenario: 63 },
  { mes: 6, cenario: 64 },
  { mes: 7, cenario: 65 },
  { mes: 8, cenario: 66 },
  { mes: 9, cenario: 67 },
  { mes: 10, cenario: 68 },
  { mes: 11, cenario: 69 },
  { mes: 12, cenario: 70 },
];

// Cenário de 25MM e com preços alterados em fevereiro somente
export const VersaoAlternativa25MM_Cenario1 = [
  { mes: 1, cenario: 71 },
  { mes: 2, cenario: 72 },
  { mes: 3, cenario: 73 },
  { mes: 4, cenario: 74 },
  { mes: 5, cenario: 75 },
  { mes: 6, cenario: 76 },
  { mes: 7, cenario: 77 },
  { mes: 8, cenario: 78 },
  { mes: 9, cenario: 79 },
  { mes: 10, cenario: 80 },
  { mes: 11, cenario: 81 },
  { mes: 12, cenario: 82 },
];

// TODO Colocar o novo cenário aqui
// Cenário de 25MM e com preços alterados em fevereiro somente
export const VersaoAlternativa25MM_Cenario1_alt_1 = [
  { mes: 1, cenario: 83 },
  { mes: 2, cenario: 84 },
  { mes: 3, cenario: 85 },
  { mes: 4, cenario: 86 },
  { mes: 5, cenario: 87 },
  { mes: 6, cenario: 88 },
  { mes: 7, cenario: 89 },
  { mes: 8, cenario: 90 },
  { mes: 9, cenario: 91 },
  { mes: 10, cenario: 92 },
  { mes: 11, cenario: 93 },
  { mes: 12, cenario: 94 },
];

export const VersaoAlternativa21MM_CenarioExtra = [
  { mes: 1, cenario: 95 },
  { mes: 2, cenario: 96 },
  { mes: 3, cenario: 97 },
  { mes: 4, cenario: 98 },
  { mes: 5, cenario: 99 },
  { mes: 6, cenario: 100 },
  { mes: 7, cenario: 101 },
  { mes: 8, cenario: 102 },
  { mes: 9, cenario: 103 },
  { mes: 10, cenario: 104 },
  { mes: 11, cenario: 105 },
  { mes: 12, cenario: 106 },
];

export const VersaoAlternativa25MM_CenarioLisiane = [
  { mes: 1, cenario: 119 },
  { mes: 2, cenario: 108 },
  { mes: 3, cenario: 109 },
  { mes: 4, cenario: 110 },
  { mes: 5, cenario: 111 },
  { mes: 6, cenario: 112 },
  { mes: 7, cenario: 113 },
  { mes: 8, cenario: 114 },
  { mes: 9, cenario: 115 },
  { mes: 10, cenario: 116 },
  { mes: 11, cenario: 117 },
  { mes: 12, cenario: 118 },
];

export const Cenario25MMNovoPortfolio = [
  { mes: 1, cenario: 120 },
  { mes: 2, cenario: 121 },
  { mes: 3, cenario: 122 },
  { mes: 4, cenario: 123 },
  { mes: 5, cenario: 124 },
  { mes: 6, cenario: 125 },
  { mes: 7, cenario: 126 },
  { mes: 8, cenario: 127 },
  { mes: 9, cenario: 128 },
  { mes: 10, cenario: 129 },
  { mes: 11, cenario: 130 },
  { mes: 12, cenario: 131 },
];

export const Cenario25MMNovoPortfolioCenario1 = Cenario25MMNovoPortfolio;

export const Cenario25MMNovoPortfolioCenario2 = Cenario25MMNovoPortfolio;

export const Cenario22MMNovoPortfolioCenario3 = [
  { mes: 1, cenario: 120 },
  { mes: 2, cenario: 121 },
  { mes: 3, cenario: 122 },
  { mes: 4, cenario: 123 },
  { mes: 5, cenario: 124 },
  { mes: 6, cenario: 125 },
  { mes: 7, cenario: 132 },
  { mes: 8, cenario: 133 },
  { mes: 9, cenario: 134 },
  { mes: 10, cenario: 135 },
  { mes: 11, cenario: 136 },
  { mes: 12, cenario: 137 },
];

export const Cenario4 = [
  { mes: 1, cenario: 138 },
  { mes: 2, cenario: 139 },
  { mes: 3, cenario: 140 },
  { mes: 4, cenario: 141 },
  { mes: 5, cenario: 142 },
  { mes: 6, cenario: 143 },
  { mes: 7, cenario: 144 },
  { mes: 8, cenario: 145 },
  { mes: 9, cenario: 146 },
  { mes: 10, cenario: 147 },
  { mes: 11, cenario: 148 },
  { mes: 12, cenario: 149 },
];

export const Cenario5 = [
  { mes: 1, cenario: 151 },
  { mes: 2, cenario: 152 },
  { mes: 3, cenario: 153 },
  { mes: 4, cenario: 154 },
  { mes: 5, cenario: 155 },
  { mes: 6, cenario: 156 },
  { mes: 7, cenario: 157 },
  { mes: 8, cenario: 158 },
  { mes: 9, cenario: 159 },
  { mes: 10, cenario: 160 },
  { mes: 11, cenario: 161 },
  { mes: 12, cenario: 162 },
];

export const Cenario6 = [
  { mes: 1, cenario: 175 },
  { mes: 2, cenario: 176 },
  { mes: 3, cenario: 177 },
  { mes: 4, cenario: 178 },
  { mes: 5, cenario: 179 },
  { mes: 6, cenario: 180 },
  { mes: 7, cenario: 181 },
  { mes: 8, cenario: 182 },
  { mes: 9, cenario: 183 },
  { mes: 10, cenario: 184 },
  { mes: 11, cenario: 185 },
  { mes: 12, cenario: 186 },
];

export const Cenario7_1 = [
  { mes: 1, cenario: 187 },
  { mes: 2, cenario: 188 },
  { mes: 3, cenario: 189 },
  { mes: 4, cenario: 190 },
  { mes: 5, cenario: 191 },
  { mes: 6, cenario: 192 },
  { mes: 7, cenario: 193 },
  { mes: 8, cenario: 194 },
  { mes: 9, cenario: 195 },
  { mes: 10, cenario: 196 },
  { mes: 11, cenario: 197 },
  { mes: 12, cenario: 198 },
];

export const Cenario7_2 = [
  { mes: 1, cenario: 187 },
  { mes: 2, cenario: 188 },
  { mes: 3, cenario: 189 },
  { mes: 4, cenario: 190 },
  { mes: 5, cenario: 199 },
  { mes: 6, cenario: 200 },
  { mes: 7, cenario: 201 },
  { mes: 8, cenario: 202 },
  { mes: 9, cenario: 203 },
  { mes: 10, cenario: 204 },
  { mes: 11, cenario: 205 },
  { mes: 12, cenario: 206 },
];

export const Cenario7_3 = [
  { mes: 1, cenario: 187 },
  { mes: 2, cenario: 188 },
  { mes: 3, cenario: 189 },
  { mes: 4, cenario: 190 },
  { mes: 5, cenario: 207 },
  { mes: 6, cenario: 208 },
  { mes: 7, cenario: 209 },
  { mes: 8, cenario: 210 },
  { mes: 9, cenario: 211 },
  { mes: 10, cenario: 212 },
  { mes: 11, cenario: 213 },
  { mes: 12, cenario: 214 },
];

export const Cenario7_4 = [
  { mes: 1, cenario: 187 },
  { mes: 2, cenario: 188 },
  { mes: 3, cenario: 189 },
  { mes: 4, cenario: 190 },
  { mes: 5, cenario: 215 },
  { mes: 6, cenario: 216 },
  { mes: 7, cenario: 217 },
  { mes: 8, cenario: 218 },
  { mes: 9, cenario: 219 },
  { mes: 10, cenario: 220 },
  { mes: 11, cenario: 221 },
  { mes: 12, cenario: 222 },
];

export const Cenario7_5 = [
  { mes: 1, cenario: 1 },
  { mes: 2, cenario: 2 },
  { mes: 3, cenario: 3 },
  { mes: 4, cenario: 4 },
  { mes: 5, cenario: 5 },
  { mes: 6, cenario: 6 },
  { mes: 7, cenario: 7 },
  { mes: 8, cenario: 8 },
  { mes: 9, cenario: 9 },
  { mes: 10, cenario: 10 },
  { mes: 11, cenario: 11 },
  { mes: 12, cenario: 12 },
];

export const CenarioX_1 = [
  { mes: 1, cenario: 13 },
  { mes: 2, cenario: 14 },
  { mes: 3, cenario: 15 },
  { mes: 4, cenario: 16 },
  { mes: 5, cenario: 17 },
  { mes: 6, cenario: 18 },
  { mes: 7, cenario: 19 },
  { mes: 8, cenario: 20 },
  { mes: 9, cenario: 21 },
  { mes: 10, cenario: 22 },
  { mes: 11, cenario: 23 },
  { mes: 12, cenario: 24 },
];

export const cenarios = {
  VersaoOficial,
  VersaoAlterada27MM,
  VersaoAlterada25MM,
  VersaoInicial25MM,
  VersaoAlternativa25MM_Cenario1,
  VersaoAlternativa25MM_Cenario1_alt_1,
  VersaoAlternativa21MM_CenarioExtra,
  VersaoAlternativa25MM_CenarioLisiane,
  Cenario25MMNovoPortfolio,
  Cenario25MMNovoPortfolioCenario1,
  Cenario25MMNovoPortfolioCenario2,
  Cenario22MMNovoPortfolioCenario3,
  Cenario4,
  Cenario5,
  Cenario6,
  Cenario7_1,
  Cenario7_2,
  Cenario7_3,
  Cenario7_4,
  Cenario7_5,
  CenarioX_1,
};

export const cenarioConsiderado = cenarios[versao.MercadoInterno];

export default async function MercadoInterno(ano, mes) {
  // Primeiro pegar a exportacao e o cenário do mês

  const [CenarioOficial] = cenarioConsiderado.filter(c => c.mes === mes);

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
