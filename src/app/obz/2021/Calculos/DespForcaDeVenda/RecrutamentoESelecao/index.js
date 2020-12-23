import Utils from '../../../../../../utils/utils';
import RES from '../../../VariaveisEPoliticas/variaveis/qlRecrutamentoConsultoria';

// VALIDADO Com Gabi em 22/10/20

export const donoConta = 'Gabriele';
export const dataValidacao = '22/12/2020';

export const NomeConta = 'RECRUTAMENTO E SELECAO - COMERCIAL';
export const ContaContabil = '3.1.1.1.06.01.002.009';
const politicas = {};
const variaveis = {
  QLRecrutamentoConsultoria: RES,
  PEFechadoComConsultoriaGPOA: 0.3,
  PEFechadoComConsultoriaForaGPOA: 0.6,
};
// Conforme definido em reunião, o cálculo é baseado na tabela de recrutamento
// definida pala Gabi e pago 60% no mês anterior a entrada da pessoa e 40% no mês
// de contratação
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
      return ql.comercial;
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
      return ql.comercial;
    });

    valorConsultoriaApresentacao +=
      Utils.SomaArray(
        qwlMesQueVemAdm.map(v => {
          return v.salarioBase;
        })
      ) * 0.6;
  }

  return {
    value: {
      Total: valorConsultoriaApresentacao + valorConsultoriaContratacao,
      AberturaEApresentacao: valorConsultoriaApresentacao,
      Fechamento: valorConsultoriaContratacao,
      politicas,
      variaveis,
    },
  };
}
