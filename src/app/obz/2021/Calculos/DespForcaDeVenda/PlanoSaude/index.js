import QlComercial from '../../../GlobalVars/ql/qlComercial';
import Utils from '../../../../../../utils/utils';
import { politicas, variaveis as variaveisRH } from '../../RH/PlanoSaude';

export const NomeConta = 'PLANO DE  SAUDE - COMERCIAL';
export const ContaContabil = '3.1.1.1.06.01.002.007';
const variaveis = {
  Unifacil: {
    TaxaAdesao: variaveisRH.Unifacil.TaxaAdesao,
    MensalidadeTitular: variaveisRH.Unifacil.MensalidadeTitular,
    MensalidadeDependente: variaveisRH.Unifacil.MensalidadeDependente,
    MediaQuantDependentes: variaveisRH.Unifacil.MediaQuantDependentes,
  },
  Unipart: {
    TaxaAdesao: variaveisRH.Unipart.TaxaAdesao,
    FaixaEtariaMedia: variaveisRH.Unipart.FaixaEtariaMedia,
    MensalidadeTitular: variaveisRH.Unipart.MensalidadeTitular,
    MensalidadeDependente: variaveisRH.Unipart.MensalidadeDependente,
    MediaQuantDependentes: variaveisRH.Unipart.MediaQuantDependentes,
  },
  Unimax: {
    TaxaAdesao: variaveisRH.Unimax.TaxaAdesao,
    FaixaEtariaMedia: variaveisRH.Unimax.FaixaEtariaMedia,
    MensalidadeTitular: variaveisRH.Unimax.MensalidadeTitular,
    MensalidadeDependente: variaveisRH.Unimax.MensalidadeDependente,
    MediaQuantDependentes: variaveisRH.Unimax.MediaQuantDependentes,
  },
  OdontoRede: {
    TaxaAdesao: variaveisRH.OdontoRede.TaxaAdesao,
    MensalidadeTitular: variaveisRH.OdontoRede.MensalidadeTitular,
  },
  OdontoMais: {
    TaxaAdesao: variaveisRH.OdontoMais.TaxaAdesao,
    MensalidadeTitular: variaveisRH.OdontoMais.MensalidadeTitular,
  },
};

export default function PlanoSaude(ano, mes) {
  const QlMesAtual = QlComercial(ano, mes).value;
  const QlEfetivos = QlMesAtual.QLEfetivos;

  const QlGerentes = QlMesAtual.GerentesI.concat(QlMesAtual.GerentesII);

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
