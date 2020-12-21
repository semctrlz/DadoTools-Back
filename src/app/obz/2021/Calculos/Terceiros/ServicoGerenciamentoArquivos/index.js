const politicas = {};
export const NomeConta = 'SERVICOS DE GERENCIAMENTO DE ARQUIVOS';
export const ContaContabil = '3.1.1.1.04.02.010.003';

const variaveis = {
  QuantidadeCaixasArquivo: [
    {
      mes: 1,
      quant: 2533,
    },
    {
      mes: 2,
      quant: 2493,
    },
    {
      mes: 3,
      quant: 2453,
    },
    {
      mes: 4,
      quant: 2413,
    },
    {
      mes: 5,
      quant: 2378,
    },
    {
      mes: 6,
      quant: 2338,
    },
    {
      mes: 7,
      quant: 2298,
    },
    {
      mes: 8,
      quant: 2273,
    },
    {
      mes: 9,
      quant: 2233,
    },
    {
      mes: 10,
      quant: 2193,
    },
    {
      mes: 11,
      quant: 2169,
    },
    {
      mes: 12,
      quant: 2129,
    },
  ],
  ValorCaixaArquivo: [
    {
      mes: 1,
      valor: 0.5152,
    },
  ],
  QuantidadeMovimentacoes: [
    {
      mes: 1,
      quant: 40,
    },
    {
      mes: 2,
      quant: 40,
    },
    {
      mes: 3,
      quant: 40,
    },
    {
      mes: 4,
      quant: 45,
    },
    {
      mes: 5,
      quant: 40,
    },
    {
      mes: 6,
      quant: 40,
    },
    {
      mes: 7,
      quant: 55,
    },
    {
      mes: 8,
      quant: 40,
    },
    {
      mes: 9,
      quant: 40,
    },
    {
      mes: 10,
      quant: 56,
    },
    {
      mes: 11,
      quant: 40,
    },
    {
      mes: 12,
      quant: 50,
    },
  ],
  ValorMovimentacao: [
    {
      mes: 1,
      valor: 9.48,
    },
  ],
  QuantidadeConsultas: [
    {
      mes: 1,
      quant: 2,
    },
    {
      mes: 2,
      quant: 2,
    },
    {
      mes: 3,
      quant: 2,
    },
    {
      mes: 4,
      quant: 2,
    },
    {
      mes: 5,
      quant: 2,
    },
    {
      mes: 6,
      quant: 2,
    },
    {
      mes: 7,
      quant: 2,
    },
    {
      mes: 8,
      quant: 2,
    },
    {
      mes: 9,
      quant: 2,
    },
    {
      mes: 10,
      quant: 2,
    },
    {
      mes: 11,
      quant: 2,
    },
    {
      mes: 12,
      quant: 2,
    },
  ],
  ValorConsulta: [
    {
      mes: 1,
      valor: 8.4,
    },
  ],
  Arquivei: [
    {
      mes: 1,
      valor: 138.5,
    },
  ],
};

export default function ServicoGerenciamentoArquivos(ano, mes) {
  // Filtra a variável de quantidade para o mês corrente
  const [QuantCaixas] = variaveis.QuantidadeCaixasArquivo.filter(q => {
    return q.mes === mes;
  });

  const quantidadeCaixas = QuantCaixas ? QuantCaixas.quant : 0;

  // Considera o valor mais recente da variável
  let valorCaixaArquivo = 0;
  variaveis.ValorCaixaArquivo.forEach(q => {
    if (q.mes <= mes) {
      valorCaixaArquivo = q.valor;
    }
  });

  const valorTotalCaixas = valorCaixaArquivo * quantidadeCaixas;

  // Filtra a variável de quantidade para o mês corrente
  const [QuantMovimentacao] = variaveis.QuantidadeMovimentacoes.filter(q => {
    return q.mes === mes;
  });
  const quantidadeMovimentacoes = QuantMovimentacao
    ? QuantMovimentacao.quant
    : 0;

  // Considera o valor mais recente da variável
  let valorMovimentacao = 0;
  variaveis.ValorMovimentacao.forEach(q => {
    if (q.mes <= mes) {
      valorMovimentacao = q.valor;
    }
  });

  const valorTotalMovimentacoes = valorMovimentacao * quantidadeMovimentacoes;

  // Filtra a variável de quantidade para o mês corrente
  const [QuantConsultas] = variaveis.QuantidadeConsultas.filter(q => {
    return q.mes === mes;
  });

  const quantidadeConsultas = QuantConsultas ? QuantConsultas.quant : 0;

  // Considera o valor mais recente da variável
  let valorConsulta = 0;
  variaveis.ValorConsulta.forEach(q => {
    if (q.mes <= mes) {
      valorConsulta = q.valor;
    }
  });

  const valorTotaConsultas = quantidadeConsultas * valorConsulta;

  // Considera o valor mais recente da variável
  let valorArquivei = 0;
  variaveis.Arquivei.forEach(q => {
    if (q.mes <= mes) {
      valorArquivei = q.valor;
    }
  });

  const valorTotalArquivei = valorArquivei;

  const Descricao = {
    CaixasIron: valorTotalCaixas,
    MovimentosCaixasIron: valorTotalMovimentacoes,
    ConsultasCaixasIron: valorTotaConsultas,
    Arquivei: valorTotalArquivei,
  };

  return {
    value: {
      Total:
        Descricao.CaixasIron +
        Descricao.MovimentosCaixasIron +
        Descricao.ConsultasCaixasIron +
        Descricao.Arquivei,
      Descricao,
      politicas,
      variaveis,
    },
  };
}
