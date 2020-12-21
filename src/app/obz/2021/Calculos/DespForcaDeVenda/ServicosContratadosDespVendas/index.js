export const NomeConta = 'SERVIÇOS CONTRATADOS - DESP. VENDAS';
export const ContaContabil = '3.1.1.1.06.01.001.002';
// Retirado o Décimo terceiro porque o Susin disse que não utilizamos mais
// TODO ver essa conta
const politicas = {};
const variaveis = {
  // Projeção do total de pontos de venda
  ProjecaoPontosVenda: [
    { mes: 1, estado: 'RS', totalPontosVenda: 850 },
    { mes: 1, estado: 'SC', totalPontosVenda: 298 },
    { mes: 1, estado: 'PR', totalPontosVenda: 50 },
    { mes: 1, estado: 'SP', totalPontosVenda: 2 },
    { mes: 3, estado: 'RS', totalPontosVenda: 918 },
    { mes: 3, estado: 'SC', totalPontosVenda: 400 },
    { mes: 3, estado: 'PR', totalPontosVenda: 80 },
    { mes: 3, estado: 'SP', totalPontosVenda: 2 },
    { mes: 11, estado: 'RS', totalPontosVenda: 1100 },
    { mes: 11, estado: 'SC', totalPontosVenda: 718 },
    { mes: 11, estado: 'PR', totalPontosVenda: 180 },
    { mes: 11, estado: 'SP', totalPontosVenda: 2 },
  ],
  // Projeção do percentual de atendimento nos pontos de venda
  ProjecaoPercentualPontosVendaAtendidos: [
    { mes: 1, estado: 'RS', percentualAtendimento: 0.44 },
    { mes: 1, estado: 'SC', percentualAtendimento: 0.59 },
    { mes: 1, estado: 'PR', percentualAtendimento: 0.34 },
    { mes: 1, estado: 'SP', percentualAtendimento: 1.0 },
    { mes: 3, estado: 'RS', percentualAtendimento: 0.45 },
    { mes: 3, estado: 'SC', percentualAtendimento: 0.55 },
    { mes: 3, estado: 'PR', percentualAtendimento: 0.33 },
    { mes: 3, estado: 'SP', percentualAtendimento: 1.0 },
    { mes: 10, estado: 'RS', percentualAtendimento: 0.38 },
    { mes: 10, estado: 'SC', percentualAtendimento: 0.31 },
    { mes: 10, estado: 'PR', percentualAtendimento: 0.14 },
    { mes: 10, estado: 'SP', percentualAtendimento: 1.0 },
  ],
  // Valor médio por ponto de venda atendido
  ValorMedioPontoVendaAtendido: [
    { mes: 1, estado: 'RS', valor: 157.27 },
    { mes: 1, estado: 'SC', valor: 179.88 },
    { mes: 1, estado: 'PR', valor: 175.0 },
    { mes: 1, estado: 'SP', valor: 300.0 },
    { mes: 3, estado: 'RS', valor: 165.14 },
    { mes: 3, estado: 'SC', valor: 188.87 },
    { mes: 3, estado: 'PR', valor: 183.75 },
    { mes: 3, estado: 'SP', valor: 315.0 },
    { mes: 10, estado: 'RS', valor: 165.14 },
    { mes: 10, estado: 'SC', valor: 188.87 },
    { mes: 10, estado: 'PR', valor: 183.75 },
    { mes: 10, estado: 'SP', valor: 315.0 },
  ],
};

export default function ServicosContratadosDespVendas(ano, mes) {
  let quantPontosVendaRS = 0;
  variaveis.ProjecaoPontosVenda.filter(p => p.estado === 'RS').forEach(p => {
    if (p.mes <= mes) quantPontosVendaRS = p.totalPontosVenda;
  });
  let quantPontosVendaSC = 0;
  variaveis.ProjecaoPontosVenda.filter(p => p.estado === 'SC').forEach(p => {
    if (p.mes <= mes) quantPontosVendaSC = p.totalPontosVenda;
  });
  let quantPontosVendaPR = 0;
  variaveis.ProjecaoPontosVenda.filter(p => p.estado === 'PR').forEach(p => {
    if (p.mes <= mes) quantPontosVendaPR = p.totalPontosVenda;
  });
  let quantPontosVendaSP = 0;
  variaveis.ProjecaoPontosVenda.filter(p => p.estado === 'SP').forEach(p => {
    if (p.mes <= mes) quantPontosVendaSP = p.totalPontosVenda;
  });

  let PercentualAtendimentoRS = 0;
  variaveis.ProjecaoPercentualPontosVendaAtendidos.filter(
    p => p.estado === 'RS'
  ).forEach(p => {
    if (p.mes <= mes) PercentualAtendimentoRS = p.percentualAtendimento;
  });
  let PercentualAtendimentoSC = 0;
  variaveis.ProjecaoPercentualPontosVendaAtendidos.filter(
    p => p.estado === 'SC'
  ).forEach(p => {
    if (p.mes <= mes) PercentualAtendimentoSC = p.percentualAtendimento;
  });
  let PercentualAtendimentoPR = 0;
  variaveis.ProjecaoPercentualPontosVendaAtendidos.filter(
    p => p.estado === 'PR'
  ).forEach(p => {
    if (p.mes <= mes) PercentualAtendimentoPR = p.percentualAtendimento;
  });
  let PercentualAtendimentoSP = 0;
  variaveis.ProjecaoPercentualPontosVendaAtendidos.filter(
    p => p.estado === 'SP'
  ).forEach(p => {
    if (p.mes <= mes) PercentualAtendimentoSP = p.percentualAtendimento;
  });

  let ValorPontoVendaRS = 0;
  variaveis.ValorMedioPontoVendaAtendido.filter(p => p.estado === 'RS').forEach(
    p => {
      if (p.mes <= mes) ValorPontoVendaRS = p.valor;
    }
  );
  let ValorPontoVendaSC = 0;
  variaveis.ValorMedioPontoVendaAtendido.filter(p => p.estado === 'SC').forEach(
    p => {
      if (p.mes <= mes) ValorPontoVendaSC = p.valor;
    }
  );
  let ValorPontoVendaPR = 0;
  variaveis.ValorMedioPontoVendaAtendido.filter(p => p.estado === 'PR').forEach(
    p => {
      if (p.mes <= mes) ValorPontoVendaPR = p.valor;
    }
  );
  let ValorPontoVendaSP = 0;
  variaveis.ValorMedioPontoVendaAtendido.filter(p => p.estado === 'SP').forEach(
    p => {
      if (p.mes <= mes) ValorPontoVendaSP = p.valor;
    }
  );

  const valorTotalRS =
    quantPontosVendaRS * PercentualAtendimentoRS * ValorPontoVendaRS;
  const valorTotalSC =
    quantPontosVendaSC * PercentualAtendimentoSC * ValorPontoVendaSC;
  const valorTotalPR =
    quantPontosVendaPR * PercentualAtendimentoPR * ValorPontoVendaPR;
  const valorTotalSP =
    quantPontosVendaSP * PercentualAtendimentoSP * ValorPontoVendaSP;

  return {
    value: {
      Total: valorTotalRS + valorTotalSC + valorTotalPR + valorTotalSP,
      Descricao: {
        RS: {
          Total: valorTotalRS,
          TotalProjecaoPontosVenda: quantPontosVendaRS,
          PercentualAtendimento: PercentualAtendimentoRS,
          ValorPontoDeVenda: ValorPontoVendaRS,
        },
        SC: {
          Total: valorTotalSC,
          TotalProjecaoPontosVenda: quantPontosVendaSC,
          PercentualAtendimento: PercentualAtendimentoSC,
          ValorPontoDeVenda: ValorPontoVendaSC,
        },
        PR: {
          Total: valorTotalPR,
          TotalProjecaoPontosVenda: quantPontosVendaPR,
          PercentualAtendimento: PercentualAtendimentoPR,
          ValorPontoDeVenda: ValorPontoVendaPR,
        },
        SP: {
          Total: valorTotalSP,
          TotalProjecaoPontosVenda: quantPontosVendaSP,
          PercentualAtendimento: PercentualAtendimentoSP,
          ValorPontoDeVenda: ValorPontoVendaSP,
        },
      },
      politicas,
      variaveis,
    },
  };
}
