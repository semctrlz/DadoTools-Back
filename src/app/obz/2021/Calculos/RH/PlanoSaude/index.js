import QlAdm from '../../../GlobalVars/ql/qlAdm';
import Utils from '../../../../../../utils/utils';

export const NomeConta = 'PLANO DE SAUDE';
export const ContaContabil = '3.1.1.1.03.01.020.040';

export const politicas = {
  Unifacil: {
    CoparticipacaoEmpresaTitulares: 0.8,
    CoparticipacaoEmpresaDependentes: 0,
  },
  Unipart: {
    CoparticipacaoEmpresaTitulares: 0.5,
    CoparticipacaoEmpresaDependentes: 0,
  },
  Unimax: {
    CoparticipacaoEmpresaTitulares: 0.5,
    CoparticipacaoEmpresaDependentes: 0,
    CoparticipacaoEmpresaTitularesAntigos: 0.8,
    CoparticipacaoEmpresaDependentesAntigos: 0,
  },
  OdontoRede: {
    CoparticipacaoEmpresaTitulares: 0.8,
    CoparticipacaoEmpresaDependentes: 0,
  },
  OdontoMais: {
    CoparticipacaoEmpresaTitulares: 0,
    CoparticipacaoEmpresaDependentes: 0,
  },
  BradescoSaude: {
    CoparticipacaoEmpresaTitulares: 1,
    CoparticipacaoEmpresaDependentes: 1,
  },
};

export const variaveis = {
  Unifacil: {
    TaxaAdesao: 0.25,
    MensalidadeTitular: 83.75,
    MensalidadeDependente: 83.75,
    MediaQuantDependentes: 2,
  },
  Unipart: {
    TaxaAdesao: 0.23,
    FaixaEtariaMedia: 39,
    MensalidadeTitular: [
      {
        idadeMinima: 0,
        valor: 176.01,
      },
      {
        idadeMinima: 19,
        valor: 202.41,
      },
      {
        idadeMinima: 24,
        valor: 232.67,
      },
      {
        idadeMinima: 29,
        valor: 267.69,
      },
      {
        idadeMinima: 34,
        valor: 307.81,
      },
      {
        idadeMinima: 39,
        valor: 357.1,
      },
      {
        idadeMinima: 44,
        valor: 432.08,
      },
      {
        idadeMinima: 49,
        valor: 561.76,
      },
      {
        idadeMinima: 54,
        valor: 758.33,
      },
      {
        idadeMinima: 59,
        valor: 1054.71,
      },
    ],
    MensalidadeDependente: 176.01,
    MediaQuantDependentes: 0.22,
  },
  Unimax: {
    TaxaAdesao: 0.9,
    FaixaEtariaMedia: 44,
    MensalidadeTitular: [
      {
        idadeMinima: 0,
        valor: 249.13,
      },
      {
        idadeMinima: 19,
        valor: 285.34,
      },
      {
        idadeMinima: 24,
        valor: 328.02,
      },
      {
        idadeMinima: 29,
        valor: 377.41,
      },
      {
        idadeMinima: 34,
        valor: 433.98,
      },
      {
        idadeMinima: 39,
        valor: 503.44,
      },
      {
        idadeMinima: 44,
        valor: 609.16,
      },
      {
        idadeMinima: 49,
        valor: 792.02,
      },
      {
        idadeMinima: 54,
        valor: 1069.17,
      },
      {
        idadeMinima: 59,
        valor: 1487.03,
      },
    ],
    MensalidadeDependente: 313,
    MediaQuantDependentes: 1,
  },
  OdontoRede: {
    TaxaAdesao: 0.1,
    MensalidadeTitular: 15.88,
  },
  OdontoMais: {
    TaxaAdesao: 0.15,
    MensalidadeTitular: 27.23,
  },
  BradescoSaude: {
    ValorTotal: 5580,
  },
};

export default function PlanoSaude(ano, mes) {
  const QlMesAtual = QlAdm(ano, mes).value;
  const QlEfetivos = QlMesAtual.QLEfetivos;

  const QlGerentes = QlMesAtual.GerentesI.concat(QlMesAtual.GerentesII);

  // Unipart considerar idade média = 39

  // Considerar no Unimax a faixa etária dos gerentes = 44

  // Unifácil

  // Valor titulares
  const ValorUnifacilTitulares =
    QlEfetivos.length *
    variaveis.Unifacil.TaxaAdesao *
    variaveis.Unifacil.MensalidadeTitular;
  //
  // Valor dependentes
  const ValorUnifacilDependentes =
    QlEfetivos.length *
    variaveis.Unifacil.MediaQuantDependentes *
    variaveis.Unifacil.TaxaAdesao *
    variaveis.Unifacil.MensalidadeDependente;
  //
  // Desconto funcionário titulares
  const DescontoFolhaUnifacilTitulares =
    ValorUnifacilTitulares *
    (1 - politicas.Unifacil.CoparticipacaoEmpresaTitulares) *
    -1;
  //
  // Desconto dependentes
  const DescontoFolhaUnifacilDependentes =
    ValorUnifacilDependentes *
    (1 - politicas.Unifacil.CoparticipacaoEmpresaDependentes) *
    -1;
  //
  // Unipart

  let valorUnipart = 0;
  variaveis.Unipart.MensalidadeTitular.forEach(m => {
    if (
      variaveis.Unipart.FaixaEtariaMedia <= m.idadeMinima &&
      valorUnipart === 0
    ) {
      valorUnipart = m.valor;
    }
  });

  // Valor titulares
  const ValorUnipartTitulares =
    QlEfetivos.length * variaveis.Unipart.TaxaAdesao * valorUnipart;
  //
  // Valor dependentes
  const ValorUnipartDependentes =
    QlEfetivos.length *
    variaveis.Unipart.MediaQuantDependentes *
    variaveis.Unipart.TaxaAdesao *
    variaveis.Unipart.MensalidadeDependente;
  //
  // Desconto funcionário titulares
  const DescontoFolhaUnipartTitulares =
    ValorUnipartTitulares *
    (1 - politicas.Unipart.CoparticipacaoEmpresaTitulares) *
    -1;
  //
  // Desconto dependentes
  const DescontoFolhaUnipartDependentes =
    ValorUnipartDependentes *
    (1 - politicas.Unipart.CoparticipacaoEmpresaDependentes) *
    -1;
  //

  // Unimax
  let valorUnimax = 0;
  variaveis.Unimax.MensalidadeTitular.forEach(m => {
    if (
      variaveis.Unimax.FaixaEtariaMedia <= m.idadeMinima &&
      valorUnimax === 0
    ) {
      valorUnimax = m.valor;
    }
  });

  const quantGerentesAntigos = QlGerentes.filter(g => {
    return g.admissao < Utils.Mes(2019, 1);
  }).length;

  const quantGerentesNovos = QlGerentes.length - quantGerentesAntigos;

  // Valor titulares - gerentes novos
  const ValorUnimaxTitulares =
    quantGerentesNovos * variaveis.Unimax.TaxaAdesao * valorUnimax;
  //
  // Valor dependentes
  const ValorUnimaxDependentes =
    quantGerentesNovos *
    variaveis.Unimax.MediaQuantDependentes *
    variaveis.Unimax.TaxaAdesao *
    variaveis.Unimax.MensalidadeDependente;
  //
  // Desconto funcionário titulares
  const DescontoFolhaUnimaxTitulares =
    ValorUnimaxTitulares *
    (1 - politicas.Unimax.CoparticipacaoEmpresaTitulares) *
    -1;
  //
  // Desconto dependentes
  const DescontoFolhaUnimaxDependentes =
    ValorUnimaxDependentes *
    (1 - politicas.Unimax.CoparticipacaoEmpresaDependentes) *
    -1;
  //

  // Valor titulares - gerentes novos
  const ValorUnimaxTitularesAntigos =
    quantGerentesAntigos * variaveis.Unimax.TaxaAdesao * valorUnimax;
  //
  // Valor dependentes
  const ValorUnimaxDependentesAntigos =
    quantGerentesAntigos *
    variaveis.Unimax.MediaQuantDependentes *
    variaveis.Unimax.TaxaAdesao *
    variaveis.Unimax.MensalidadeDependente;
  //
  // Desconto funcionário titulares
  const DescontoFolhaUnimaxTitularesAntigos =
    ValorUnimaxTitularesAntigos *
    (1 - politicas.Unimax.CoparticipacaoEmpresaTitularesAntigos) *
    -1;
  //
  // Desconto dependentes
  const DescontoFolhaUnimaxDependentesAntigos =
    ValorUnimaxDependentesAntigos *
    (1 - politicas.Unimax.CoparticipacaoEmpresaDependentesAntigos) *
    -1;
  //

  // Bradesco saúde

  const valorBradescoSaude = variaveis.BradescoSaude.ValorTotal;

  const descontoEmfolhaBradescoSaude =
    valorBradescoSaude *
    (1 - politicas.BradescoSaude.CoparticipacaoEmpresaTitulares) *
    -1;
  //

  // OdontoRede

  // Valor titulares
  const ValorOdontoRede =
    QlEfetivos.length *
    variaveis.OdontoRede.TaxaAdesao *
    variaveis.OdontoRede.MensalidadeTitular;
  //

  // Desconto funcionário titulares
  const DescontoEmFolhaOdontoRede =
    ValorOdontoRede *
    (1 - politicas.OdontoRede.CoparticipacaoEmpresaTitulares) *
    -1;
  //

  // OdontoMais

  // Valor titulares
  const ValorOdontoMais =
    QlEfetivos.length *
    variaveis.OdontoMais.TaxaAdesao *
    variaveis.OdontoMais.MensalidadeTitular;
  //

  // Desconto funcionário titulares
  const DescontoEmFolhaOdontoMais =
    ValorOdontoMais *
    (1 - politicas.OdontoMais.CoparticipacaoEmpresaTitulares) *
    -1;
  //

  const totalPlanoSaude =
    ValorUnifacilTitulares +
    ValorUnifacilDependentes +
    DescontoFolhaUnifacilTitulares +
    DescontoFolhaUnifacilDependentes +
    ValorUnipartTitulares +
    ValorUnipartDependentes +
    DescontoFolhaUnipartTitulares +
    DescontoFolhaUnipartDependentes +
    ValorUnimaxTitulares +
    ValorUnimaxDependentes +
    DescontoFolhaUnimaxTitulares +
    DescontoFolhaUnimaxDependentes +
    ValorUnimaxTitularesAntigos +
    ValorUnimaxDependentesAntigos +
    DescontoFolhaUnimaxTitularesAntigos +
    DescontoFolhaUnimaxDependentesAntigos +
    valorBradescoSaude +
    descontoEmfolhaBradescoSaude +
    ValorOdontoRede +
    DescontoEmFolhaOdontoRede +
    ValorOdontoMais +
    DescontoEmFolhaOdontoMais;

  return {
    value: {
      Total: totalPlanoSaude,
      Descricao: {
        Unifacil: {
          QLConsiderado: QlEfetivos.length * variaveis.Unifacil.TaxaAdesao,
          Titulares: {
            Valor: ValorUnifacilTitulares,
            DescontoFolha: DescontoFolhaUnifacilTitulares,
            Total: ValorUnifacilTitulares + DescontoFolhaUnifacilTitulares,
          },
          Dependente: {
            Valor: ValorUnifacilDependentes,
            DescontoFolha: DescontoFolhaUnifacilDependentes,
            Total: ValorUnifacilDependentes + DescontoFolhaUnifacilDependentes,
          },
          Total:
            ValorUnifacilTitulares +
            DescontoFolhaUnifacilTitulares +
            ValorUnifacilDependentes +
            DescontoFolhaUnifacilDependentes,
        },
        Unipart: {
          QLConsiderado: QlEfetivos.length * variaveis.Unipart.TaxaAdesao,
          Titulares: {
            Valor: ValorUnipartTitulares,
            DescontoFolha: DescontoFolhaUnipartTitulares,
            Total: ValorUnipartTitulares + DescontoFolhaUnipartTitulares,
          },
          Dependente: {
            Valor: ValorUnipartDependentes,
            DescontoFolha: DescontoFolhaUnipartDependentes,
            Total: ValorUnipartDependentes + DescontoFolhaUnipartDependentes,
          },
          Total:
            ValorUnipartTitulares +
            DescontoFolhaUnipartTitulares +
            ValorUnipartDependentes +
            DescontoFolhaUnipartDependentes,
        },
        Unimax: {
          QLConsiderado: QlGerentes.length * variaveis.Unimax.TaxaAdesao,
          Titulares: {
            Valor: ValorUnimaxTitulares,
            DescontoFolha: DescontoFolhaUnimaxTitulares,
            Total: ValorUnimaxTitulares + DescontoFolhaUnimaxTitulares,
          },
          Dependente: {
            Valor: ValorUnimaxDependentes,
            DescontoFolha: DescontoFolhaUnimaxDependentes,
            Total: ValorUnimaxDependentes + DescontoFolhaUnimaxDependentes,
          },
          Total:
            ValorUnimaxTitulares +
            DescontoFolhaUnimaxTitulares +
            ValorUnimaxDependentes +
            DescontoFolhaUnimaxDependentes,
        },
        BradescoSaude: {
          Valores: {
            Valor: valorBradescoSaude,
            DescontoFolha: descontoEmfolhaBradescoSaude,
            Total: valorBradescoSaude + descontoEmfolhaBradescoSaude,
          },
          Total: valorBradescoSaude + descontoEmfolhaBradescoSaude,
        },
        OdontoRede: {
          QLConsiderado: QlEfetivos.length * variaveis.OdontoRede.TaxaAdesao,
          Valor: {
            Valor: ValorOdontoRede,
            DescontoFolha: DescontoEmFolhaOdontoRede,
            Total: ValorOdontoRede + DescontoEmFolhaOdontoRede,
          },
          Total: ValorOdontoRede + DescontoEmFolhaOdontoRede,
        },
        OdontoMais: {
          QLConsiderado: QlEfetivos.length * variaveis.OdontoMais.TaxaAdesao,
          Valor: {
            Valor: ValorOdontoMais,
            DescontoFolha: DescontoEmFolhaOdontoMais,
            Total: ValorOdontoMais + DescontoEmFolhaOdontoMais,
          },
          Total: ValorOdontoMais + DescontoEmFolhaOdontoMais,
        },
      },
      politicas,
      variaveis,
    },
  };
}
