import Utils from '../../../../../../utils/utils';
import RES from '../../../VariaveisEPoliticas/variaveis/qlRecrutamentoConsultoria';

// VALIDADO Com Vanessa em 21/10/20

export const donoConta = 'Gabriele';
export const dataValidacao = '22/12/2020';

export const NomeConta = 'RECRUTAMENTO E SELECAO';
export const ContaContabil = '3.1.1.1.03.01.020.050';
const politicas = {};

const variaveis = {
  QLRecrutamentoConsultoria: RES,
  PEFechadoComConsultoria: 0.3,
  ValorInfoJobs: { mes: 11, valor: 6000 },
  ValorSoftwareRecrutamento: { mes: 9, valor: 6000 },
  TestesPDA: {
    valorTeste: 153,
    mesesCompra: [
      { mes: 2, quantTestes: 10 },
      { mes: 8, quantTestes: 10 },
    ],
  },
};

// Os valores de consultoria serão baseados em uma tabela de cargos que fecharemos
// com consultoria formulado pela Gabriele.
// Taxa DE 30 % (ABERTURA ) / 30% (APRESENTAÇÃO DE CANDIDATOS) E 40% ( FECHAMENTO) - 100% D0 SALÁRIO - com base nas projeções de QL em 2021.

export default function RecrutamentoESelecao(ano, mes) {
  const [QlMesAtual] = variaveis.QLRecrutamentoConsultoria.filter(ql => {
    return ql.mes === mes;
  });

  const [QlMesQueVem] = variaveis.QLRecrutamentoConsultoria.filter(ql => {
    return ql.mes === mes + 1;
  });

  let valorConsultoriaContratacao = 0;

  if (QlMesAtual) {
    const qlMesAtualAdm = QlMesAtual.ql.filter(ql => {
      return !ql.comercial;
    });

    valorConsultoriaContratacao +=
      Utils.SomaArray(
        qlMesAtualAdm.map(v => {
          return v.salarioBase;
        })
      ) * 0.4;
  }
  let valorConsultoriaApresentacao = 0;
  if (QlMesQueVem) {
    const qwlMesQueVemAdm = QlMesQueVem.ql.filter(ql => {
      return !ql.comercial;
    });

    valorConsultoriaApresentacao +=
      Utils.SomaArray(
        qwlMesQueVemAdm.map(v => {
          return v.salarioBase;
        })
      ) * 0.6;
  }

  // Anuidade Infojobs
  const valorInfojobs =
    variaveis.ValorInfoJobs.mes === mes ? variaveis.ValorInfoJobs.valor : 0;

  // Testes PDA
  let valorTestesPDA = 0;
  const testesPDAMes = variaveis.TestesPDA.mesesCompra.filter(e => {
    return e.mes === mes;
  });
  if (testesPDAMes.length > 0) {
    const { quantTestes } = testesPDAMes[0];
    valorTestesPDA = quantTestes * variaveis.TestesPDA.valorTeste;
  }

  // Anuidade software Recrutamento
  const valorSoftwareRecrutamento =
    variaveis.ValorSoftwareRecrutamento.mes === mes
      ? variaveis.ValorSoftwareRecrutamento.valor
      : 0;

  return {
    value: {
      Total:
        valorConsultoriaContratacao +
        valorConsultoriaApresentacao +
        valorInfojobs +
        valorTestesPDA +
        valorSoftwareRecrutamento,
      Descricao: {
        Consultoria: {
          Total: valorConsultoriaContratacao + valorConsultoriaApresentacao,
          AberturaEApresentacao: valorConsultoriaApresentacao,
          Fechamento: valorConsultoriaContratacao,
        },
        Infojobs: valorInfojobs,
        TestesPDA: valorTestesPDA,
        SoftwareRecrutamento: valorSoftwareRecrutamento,
      },
      politicas,
      variaveis,
    },
  };
}
