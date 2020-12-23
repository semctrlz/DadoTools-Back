import Utils from '../../../../../../utils/utils';

// VALIDADO Com luca em 22/10/20
export const donoConta = 'Luca';
export const dataValidacao = '22/12/21';

export const NomeConta = 'SERVICOS JURIDICOS';
export const ContaContabil = '3.1.1.1.05.01.010.030';
const politicas = {};
const variaveis = {
  QuantidadeReclamatoriasExistentes: 0,
  ProjecaoNovasReclamatorias: 2,
  // Alterado o formato. Ao invés de valor por plataforma e/ou software, colocaram um valor total

  MensalidadeSoftwaresEPlataformas: [
    { mes: 1, valor: 875 },
    { mes: 2, valor: 1130 },
    { mes: 3, valor: 1875 },
    { mes: 4, valor: 875 },
    { mes: 5, valor: 1130 },
    { mes: 6, valor: 875 },
    { mes: 7, valor: 875 },
    { mes: 8, valor: 1130 },
    { mes: 9, valor: 875 },
    { mes: 10, valor: 875 },
    { mes: 11, valor: 1130 },
    { mes: 12, valor: 875 },
  ],
  // Nas variáveis, retiraram os detalhes, somaram todas as consultorias e informaram um valor total
  Consultoria: [
    { area: '', mes: 1, valorTeto: 46603.55, escritorio: '' },
    { area: '', mes: 2, valorTeto: 46765.7, escritorio: '' },
    { area: '', mes: 3, valorTeto: 40640, escritorio: '' },
    { area: '', mes: 4, valorTeto: 40590, escritorio: '' },
    { area: '', mes: 5, valorTeto: 38140, escritorio: '' },
    { area: '', mes: 6, valorTeto: 38140, escritorio: '' },
    { area: '', mes: 7, valorTeto: 38140, escritorio: '' },
    { area: '', mes: 8, valorTeto: 39390, escritorio: '' },
    { area: '', mes: 9, valorTeto: 41840, escritorio: '' },
    { area: '', mes: 10, valorTeto: 39390, escritorio: '' },
    { area: '', mes: 11, valorTeto: 38140, escritorio: '' },
    { area: '', mes: 12, valorTeto: 38140, escritorio: '' },
  ],
  ValorReclamatoriaEscritorioJuridico: [{ mes: 1, valor: 160 }],
};

export default function ServicosJuridicos(ano, mes) {
  // Valor consultorias por área
  const ConsultoriasMes = variaveis.Consultoria.filter(p => {
    return p.mes === mes;
  }).map(p => {
    return p.valorTeto;
  });

  const valorConsultorias = Utils.SomaArray(ConsultoriasMes);

  // Valor escritório trabalhista
  let valorReclamatoria = 0;
  variaveis.ValorReclamatoriaEscritorioJuridico.forEach(v => {
    if (mes >= v.mes) {
      valorReclamatoria = v.valor;
    }
  });

  const valorEscritorioTrabalhista =
    valorReclamatoria *
    (variaveis.QuantidadeReclamatoriasExistentes +
      variaveis.ProjecaoNovasReclamatorias);

  // Docusign
  const valorSoftwaresEPlataformas = Utils.SomaArray(
    variaveis.MensalidadeSoftwaresEPlataformas.filter(p => {
      return p.mes === mes;
    }).map(p => {
      return p.valor;
    })
  );

  return {
    value: {
      Total:
        valorConsultorias +
        valorEscritorioTrabalhista +
        valorSoftwaresEPlataformas,
      Descricao: {
        Consultorias: valorConsultorias,
        ValorEscritorioTrabalhista: valorEscritorioTrabalhista,
        SoftwaresEPlataformas: valorSoftwaresEPlataformas,
      },
      politicas,
      variaveis,
    },
  };
}
