import QlAdm from '../../../GlobalVars/ql/qlAdm';
import QLComercial from '../../../GlobalVars/ql/qlComercial';
import Utils from '../../../../../../utils/utils';

export const NomeConta = 'CAPACITACAO E DESENVOLVIMENTO';
export const ContaContabil = '3.1.1.1.03.01.020.060';
const politicas = {
  ValorTetoEducacao: 400,
  ReunioesPresenciais: [
    {
      mes: 1,
      presencial: false,
    },
    {
      mes: 2,
      presencial: false,
    },
    {
      mes: 3,
      presencial: false,
    },
    {
      mes: 4,
      presencial: false,
    },
    {
      mes: 5,
      presencial: true,
    },
    {
      mes: 6,
      presencial: false,
    },
    {
      mes: 7,
      presencial: true,
    },
    {
      mes: 8,
      presencial: false,
    },
    {
      mes: 9,
      presencial: true,
    },
    {
      mes: 10,
      presencial: false,
    },
    {
      mes: 11,
      presencial: true,
    },
    {
      mes: 12,
      presencial: false,
    },
  ],
};
export const variaveis = {
  ValorAlguelSala: 625,
  CapacitacaoSupervisores: {
    Coffee: [
      {
        item: 'coffee',
        valor: 20,
      },
    ],
    QuantTurnos: 1,
    Calendario: [5, 7, 9, 11],
  },
  UniversidadeCorporativa: [
    { mes: 2, valor: 4500 },
    { mes: 3, valor: 4500 },
    { mes: 4, valor: 4500 },
    { mes: 5, valor: 4500 },
  ],
  ProducaoConteudo: [
    { mes: 3, valor: 1500 },
    { mes: 4, valor: 1500 },
    { mes: 5, valor: 1500 },
    { mes: 6, valor: 1500 },
    { mes: 7, valor: 1500 },
    { mes: 8, valor: 1500 },
  ],
  OutrosValores: [
    { mes: 3, descricao: 'Manual do colaborador ', valor: 562.5 },
    { mes: 4, descricao: 'Manual do colaborador ', valor: 562.5 },
    { mes: 4, descricao: 'Código de Ética', valor: 562.5 },
    { mes: 5, descricao: 'Código de Ética', valor: 562.2 },
    { mes: 3, descricao: 'Video Boas Vindas', valor: 3500 },
  ],
  CapacitacaoGerentes: {
    Coffee: [
      {
        item: 'coffee',
        valor: 20,
      },
    ],
    QuantTurnos: 1,
    Calendario: [5, 7, 9, 11],
  },
  CursosDiversos: [
    {
      Curso: 'Representante da CIPA',
      mes: 10,
      ValorIngresso: 100,
      QuantPessoas: 3,
    },
    {
      Curso: 'Curso Logísitca (custos e inventário)',
      mes: 3,
      ValorIngresso: 340,
      QuantPessoas: 1,
    },
    {
      Curso: 'Curso Logísitca (custos e inventário)',
      mes: 4,
      ValorIngresso: 340,
      QuantPessoas: 1,
    },
    {
      Curso: 'Curso Logísitca (custos e inventário)',
      mes: 5,
      ValorIngresso: 340,
      QuantPessoas: 1,
    },
    { Curso: 'Curso PCP', mes: 3, ValorIngresso: 1000, QuantPessoas: 1 },
    {
      Curso: 'Cursos Gestão de Pessoas',
      mes: 1,
      ValorIngresso: 959,
      QuantPessoas: 1,
    },
    {
      Curso: 'Cursos Gestão de Pessoas',
      mes: 2,
      ValorIngresso: 1950,
      QuantPessoas: 1,
    },
    {
      Curso: 'Cursos Gestão de Pessoas',
      mes: 3,
      ValorIngresso: 250,
      QuantPessoas: 1,
    },
    {
      Curso: 'Cursos Contabilidade / Finanças',
      mes: 1,
      ValorIngresso: 300,
      QuantPessoas: 1,
    },
    {
      Curso: 'Cursos Contabilidade / Finanças',
      mes: 2,
      ValorIngresso: 649.1,
      QuantPessoas: 1,
    },
    {
      Curso: 'Cursos Contabilidade / Finanças',
      mes: 3,
      ValorIngresso: 100,
      QuantPessoas: 1,
    },
    {
      Curso: 'Cursos Contabilidade / Finanças',
      mes: 4,
      ValorIngresso: 100,
      QuantPessoas: 1,
    },
    {
      Curso: 'Cursos Contabilidade / Finanças',
      mes: 8,
      ValorIngresso: 990,
      QuantPessoas: 1,
    },
  ],
  PesquisaGPTW: [
    {
      mes: 6,
      valor: 6385,
    },
  ],
  PesquisaEngajamento: [
    {
      mes: 3,
      valor: 3850,
    },
    {
      mes: 4,
      valor: 2850,
    },
    {
      mes: 5,
      valor: 2850,
    },
  ],
  PesquisaSalarial: [
    {
      mes: 1,
      valor: 3260,
    },
  ],
  MensalidadePesquisaSalarial: [
    {
      mes: 2,
      valor: 144.9,
    },
  ],
  Workshops: [
    { mes: 3, Empresa: 'FALE / Alexandre Garcia ', valor: 3900 },
    { mes: 5, Empresa: 'FALE / Alexandre Garcia ', valor: 3900 },
    { mes: 7, Empresa: 'FALE / Alexandre Garcia ', valor: 3900 },
    { mes: 9, Empresa: 'FALE / Alexandre Garcia ', valor: 3900 },
    { mes: 11, Empresa: 'FALE / Alexandre Garcia', valor: 3900 },
    { mes: 3, Empresa: 'Alexandre Garcia', valor: 2000 },
    { mes: 2, Empresa: 'Workshops', valor: 2000 },
    { mes: 4, Empresa: 'Workshops ', valor: 2000 },
    { mes: 6, Empresa: 'Workshops ', valor: 2000 },
    { mes: 8, Empresa: 'Workshops ', valor: 2000 },
    { mes: 10, Empresa: 'Workshops   ', valor: 2000 },
    { mes: 12, Empresa: 'Palestra ', valor: 5000 },
    { mes: 3, Empresa: 'SENAC', valor: 250 },
    { mes: 5, Empresa: 'SENAC', valor: 250 },
    { mes: 7, Empresa: 'SENAC', valor: 250 },
    { mes: 9, Empresa: 'SENAC', valor: 250 },
    { mes: 11, Empresa: 'SENAC', valor: 250 },
    { mes: 7, Empresa: 'IEL', valor: 2950 },
    { mes: 8, Empresa: 'IEL', valor: 2950 },
    { mes: 3, Empresa: 'IEL ', valor: 668.8 },
    { mes: 4, Empresa: 'IEL', valor: 668.8 },
    { mes: 5, Empresa: 'IEL ', valor: 668.8 },
    { mes: 6, Empresa: 'IEL', valor: 668.8 },
    { mes: 7, Empresa: 'IEL ', valor: 668.8 },
    { mes: 8, Empresa: 'IEL', valor: 668.8 },
    { mes: 9, Empresa: 'IEL ', valor: 668.8 },
    { mes: 10, Empresa: 'IEL', valor: 668.8 },
    { mes: 11, Empresa: 'IEL ', valor: 668.8 },
    { mes: 1, Empresa: 'Tobee', valor: 1547 },
    { mes: 2, Empresa: 'Tobee', valor: 773.5 },
    { mes: 3, Empresa: 'Tobee', valor: 1547 },
    { mes: 6, Empresa: 'Tobee', valor: 1547 },
    { mes: 9, Empresa: 'Tobee', valor: 1547 },
    { mes: 12, Empresa: 'Tobee', valor: 1547 },
  ],
  Congresso: [
    {
      mes: 9,
      valor: 1000,
    },
  ],
  PlataformaTreinamentos: {
    valorImplantacao: 4000,
    mesImplantacao: 4,
    Mensalidade: 849,
  },
  PlataformaAvaliacaoDesempenho: {
    mesImplantacao: 6,
    valorImplantacao: 1355,
    Mensalidade: 1355,
  },
  Educacao: [
    { mes: 1, valor: 740 },
    { mes: 2, valor: 740 },
    { mes: 3, valor: 740 },
    { mes: 4, valor: 740 },
    { mes: 5, valor: 740 },
    { mes: 6, valor: 740 },
    { mes: 7, valor: 740 },
    { mes: 8, valor: 740 },
    { mes: 9, valor: 740 },
    { mes: 10, valor: 740 },
    { mes: 11, valor: 740 },
    { mes: 12, valor: 740 },
  ],
  TestesPDA: {
    valorTeste: 153,
    mesesCompra: [
      { mes: 5, quantTestes: 10 },
      { mes: 11, quantTestes: 10 },
    ],
  },
};

export default function CapacitacaoEDesenvolvimento(ano, mes) {
  const QLAdmMesAtual = QlAdm(ano, mes).value;
  const QLComMesAtual = QLComercial(ano, mes).value;

  // Pegar o QL de gerências
  const QlGerencial = QLAdmMesAtual.GerentesI.concat(
    QLAdmMesAtual.GerentesII,
    QLComMesAtual.GerentesI,
    QLComMesAtual.GerentesII
  );

  // pegar o QL dos supervisores
  const QlSupervisores = QLAdmMesAtual.Supervisores.concat(
    QLComMesAtual.Supervisores
  );

  // #region Capacitação Supervisores
  let TotalCapacitacaoSupervisores = 0;
  if (variaveis.CapacitacaoSupervisores.Calendario.includes(mes)) {
    TotalCapacitacaoSupervisores +=
      variaveis.CapacitacaoSupervisores.QuantTurnos * variaveis.ValorAlguelSala;
    TotalCapacitacaoSupervisores +=
      Utils.SomaArray(
        variaveis.CapacitacaoSupervisores.Coffee.map(v => v.valor)
      ) *
      (QlSupervisores.length + 3); // Adicionado 3 para palestrantes/treinadores
  }
  // #endregion

  // #region Capacitação Gerentes
  let TotalCapacitacaoGerentes = 0;
  if (variaveis.CapacitacaoGerentes.Calendario.includes(mes)) {
    TotalCapacitacaoGerentes +=
      variaveis.CapacitacaoGerentes.QuantTurnos * variaveis.ValorAlguelSala;
    TotalCapacitacaoGerentes +=
      Utils.SomaArray(variaveis.CapacitacaoGerentes.Coffee.map(v => v.valor)) *
      (QlGerencial.length + 3); // Adicionado 3 para palestrantes/treinadores
  }

  // #endregion

  // #region Cursos diversos
  const TotalCusrsosDiversos = Utils.SomaArray(
    variaveis.CursosDiversos.filter(c => c.mes === mes).map(
      c => c.ValorIngresso * c.QuantPessoas
    )
  );
  // #endregion

  // #region Pesquisas
  const valorGPTW = Utils.SomaArray(
    variaveis.PesquisaGPTW.filter(p => p.mes === mes).map(p => p.valor)
  );

  // Engajamento
  const valorEngajamento = Utils.SomaArray(
    variaveis.PesquisaEngajamento.filter(p => p.mes === mes).map(p => p.valor)
  );

  // Pesquisa salarial
  let valorPesquisaSalarial = Utils.SomaArray(
    variaveis.PesquisaSalarial.filter(p => p.mes === mes).map(p => p.valor)
  );

  let mensalidadePesquisa = 0;
  variaveis.MensalidadePesquisaSalarial.forEach(m => {
    if (m.mes <= mes) mensalidadePesquisa = m.valor;
  });

  valorPesquisaSalarial += mensalidadePesquisa;

  // #endregion

  // #region Workshops, palestras e treinamentos
  const valorWorkshops = Utils.SomaArray(
    variaveis.Workshops.filter(w => w.mes === mes).map(w => w.valor)
  );
  // #endregion

  // Congresso
  const valorCongresso = Utils.SomaArray(
    variaveis.Congresso.filter(c => c.mes === mes).map(c => c.valor)
  );

  // Testes PDA
  const valorTestesPDA =
    Utils.SomaArray(
      variaveis.TestesPDA.mesesCompra
        .filter(t => t.mes === mes)
        .map(t => t.quantTestes)
    ) * variaveis.TestesPDA.valorTeste;

  // Universidade corporativa
  const valorUniVersidadeCorporativa = Utils.SomaArray(
    variaveis.UniversidadeCorporativa.filter(u => u.mes === mes).map(
      u => u.valor
    )
  );

  // Produção de conteúdo
  const valorProducaoConteudo = Utils.SomaArray(
    variaveis.ProducaoConteudo.filter(u => u.mes === mes).map(u => u.valor)
  );

  // Outros Valores
  const outrosValores = Utils.SomaArray(
    variaveis.OutrosValores.filter(u => u.mes === mes).map(u => u.valor)
  );

  const valorImplantacaoPlataformaTreinamentos =
    variaveis.PlataformaTreinamentos.mesImplantacao === mes
      ? variaveis.PlataformaTreinamentos.valorImplantacao
      : 0;

  const valorMensalPlataformaTreinamentos =
    variaveis.PlataformaTreinamentos.mesImplantacao < mes
      ? variaveis.PlataformaTreinamentos.Mensalidade
      : 0;

  const valorImplantacaoPlataformaAvaliacaoDesempenho =
    variaveis.PlataformaAvaliacaoDesempenho.mesImplantacao === mes
      ? variaveis.PlataformaAvaliacaoDesempenho.valorImplantacao
      : 0;

  const valorMensalPlataformaAvaliacaoDesempenho =
    variaveis.PlataformaAvaliacaoDesempenho.mesImplantacao < mes
      ? variaveis.PlataformaAvaliacaoDesempenho.Mensalidade
      : 0;

  // Projetos

  // Educacao
  const valorEducacao = Utils.SomaArray(
    variaveis.Educacao.filter(e => e.mes === mes).map(e => e.valor)
  );

  const totalCapacitacao =
    TotalCapacitacaoSupervisores + TotalCapacitacaoGerentes;
  const totalCursosDiversos = TotalCusrsosDiversos;
  const totalPesquisas = valorGPTW + valorEngajamento + valorPesquisaSalarial;
  const totalWorkshops = valorWorkshops;
  const totalCongresso = valorCongresso;
  const totalTestesPDA = valorTestesPDA;
  const totalUniversidadeCorporativa = valorUniVersidadeCorporativa;
  const totalProducaoConteudo = valorProducaoConteudo;
  const totalOutrosValores = outrosValores;
  const totalplataformaTreinamento =
    valorImplantacaoPlataformaTreinamentos + valorMensalPlataformaTreinamentos;
  const totalPlataformaAvaliacaoDesempenho =
    valorImplantacaoPlataformaAvaliacaoDesempenho +
    valorMensalPlataformaAvaliacaoDesempenho;
  const totalEducacao = valorEducacao;

  const total =
    totalCapacitacao +
    totalCursosDiversos +
    totalPesquisas +
    totalWorkshops +
    totalCongresso +
    totalplataformaTreinamento +
    totalUniversidadeCorporativa +
    totalProducaoConteudo +
    totalPlataformaAvaliacaoDesempenho +
    totalEducacao +
    totalTestesPDA +
    totalOutrosValores;

  return {
    value: {
      Total: total,
      Capacitacao: totalCapacitacao,
      Cursos: totalCursosDiversos,
      Pesquisas: totalPesquisas,
      Workshops: totalWorkshops,
      Congresso: totalCongresso,
      Treinamentos: totalplataformaTreinamento,
      AvaliacaoDesempenho: totalPlataformaAvaliacaoDesempenho,
      Educacao: totalEducacao,
      TestesPDA: totalTestesPDA,
      UniversidadeCorporativa: totalUniversidadeCorporativa,
      ProducaoConteudo: totalProducaoConteudo,
      OutrosValores: totalOutrosValores,
      politicas,
      variaveis,
    },
  };
}
