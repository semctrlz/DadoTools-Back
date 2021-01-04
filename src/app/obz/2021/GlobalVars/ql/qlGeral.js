/* eslint-disable import/no-cycle */
import promocoes from '../../VariaveisEPoliticas/variaveis/promocoes';
import Utils from '../../../../../utils/utils';
import QlGeralV, {
  Cargos as cargosV,
  Regioes as RegioesV,
} from '../../VariaveisEPoliticas/variaveis/qlGeral';

// Importando as variáveis responsáveis pelo cálculo da base de remuneração
import { politicas as politicasFolha } from '../fixas/dp/variasFolha';

import {
  variaveis as varfixosAN,
  politicas as politicasAN,
} from '../fixas/dp/adicionalNoturno';
import { politicas as politicasGrat } from '../fixas/dp/gratificacoes';
import { politicas as politicasQuin } from '../fixas/dp/quinquenio';
import { variaveis as varFvAN } from '../forcaVendas/dp/adicionalNoturno';
import { variaveis as varFvRemVar } from '../forcaVendas/dp/remuneracaoVariavel';

export const Cargos = cargosV;
export const Regioes = RegioesV;

export const cargosGerenciais = [
  Cargos.GerenteDeMarketing,
  Cargos.GerenteGeral,
  Cargos.GerenteJurídicoERh,
  Cargos.GerenteFinanceiro,
  Cargos.GerenteDeVendas,
  Cargos.GerenteLogística,
  Cargos.GerenteIndustrial,
];
const estagiariosEJA = [Cargos.Estagiario, Cargos.JovemAprendiz];

const variavel = QlGeralV;

export default function ql_geral(ano, mes) {
  const mesAtual = Utils.Mes(ano, mes);

  let acumulado = [{ mes: 0, matricula: 0, valorDissidio: 0 }];
  // Looping pelos meses igual ou acima do inicio do dissidio e a data de efetividade -1
  for (
    let i = politicasFolha.MesInicialDissidio;
    i < politicasFolha.MesCompetenciaDissidio;
    i++
  ) {
    const mesD = Utils.Mes(ano, i);
    const qlmes = variavel.filter(v => {
      return (
        v.admissao.getTime() <= mesD.getTime() &&
        (v.dataLimite === null || v.dataLimite.getTime() >= mesD.getTime())
      );
    });

    acumulado = [
      ...acumulado,
      ...qlmes.map(funcionario => {
        const valores = promocoes.filter(p => {
          return p.setor === funcionario.setor && p.mes <= mesD;
        });

        let valor = 0;
        valores.forEach(element => {
          valor += element.valorAdicional;
        });

        const quantFuncSetor = qlmes.filter(v => {
          return v.setor === funcionario.setor;
        }).length;

        const valorRateio = valor / quantFuncSetor;

        return {
          mes: i,
          matricula: funcionario.matricula,
          valorDissidio:
            (funcionario.salarioBaseInicial + valorRateio) *
            politicasFolha.PercentualAumentoDiscidio,
        };
      }),
    ];
  }

  const qlMesAtual = variavel.filter(v => {
    return (
      v.admissao.getTime() <= mesAtual.getTime() &&
      (v.dataLimite === null || v.dataLimite.getTime() >= mesAtual.getTime())
    );
  });

  const qlAtualizado = qlMesAtual.map(funcionario => {
    const valores = promocoes.filter(p => {
      return p.setor === funcionario.setor && p.mes <= mesAtual;
    });

    let valor = 0;
    valores.forEach(element => {
      valor += element.valorAdicional;
    });

    const quantFuncSetor = qlMesAtual.filter(v => {
      return v.setor === funcionario.setor;
    }).length;

    const valorRateio = valor / quantFuncSetor;

    let rateioDissidio = 0;
    if (politicasFolha.MesesPagamentoAcumuladoDissidio.includes(mes)) {
      const valorDissidioAcum = Utils.SomaArray(
        acumulado
          .filter(ql => {
            return ql.matricula === funcionario.matricula;
          })
          .map(a => {
            return a.valorDissidio;
          })
      );
      rateioDissidio +=
        valorDissidioAcum /
        politicasFolha.MesesPagamentoAcumuladoDissidio.length;
    }

    let adicionalNoturno = 0;
    let quinquenios = 0;
    let gratificacoes = 0;
    let salarioVariavel = 0;

    const valorAumentoDissidio =
      mes >= politicasFolha.MesCompetenciaDissidio
        ? (funcionario.salarioBaseInicial + valorRateio) *
          politicasFolha.PercentualAumentoDiscidio
        : 0;

    const salarioBaseAlterado =
      funcionario.salarioBaseInicial +
      valorRateio +
      rateioDissidio +
      valorAumentoDissidio;

    // Ignorar cálculo de base de remuneração para estagiários e
    // jovens aprendizes
    if (!estagiariosEJA.includes(funcionario.nomeCargo)) {
      if (!cargosGerenciais.includes(funcionario.nomeCargo)) {
        if (funcionario.comercial) {
          // Cálculo Adicional Noturno
          adicionalNoturno =
            (salarioBaseAlterado / politicasFolha.cargaHorariaBaseMensal) *
            varFvAN.estimativaHorasMesAdicional *
            politicasAN.percentualSobreValorHora;
        } else {
          // Cálculo Adicional Noturno
          adicionalNoturno =
            (salarioBaseAlterado / politicasFolha.cargaHorariaBaseMensal) *
            varfixosAN.estimativaHorasMesAdicional *
            politicasAN.percentualSobreValorHora;
        }
      }
      const dias = Utils.DaysDif(funcionario.admissao, mesAtual);
      const QuantQuinquenios = Math.floor(dias / 365 / 5);

      // Cálculo quinquenios
      quinquenios =
        salarioBaseAlterado *
        politicasQuin.percentualQuinquenio *
        QuantQuinquenios;

      // Cálculo gratificações
      if (funcionario.funcaoGratificada) {
        gratificacoes =
          salarioBaseAlterado * politicasGrat.percentualFuncaoGratificada;
      }

      // Cálculo salários variáveis
      if (funcionario.comercial) {
        let valorPrecoMedio = 0;
        let valorVolume = 0;
        let valorCoberturaQuant = 0;
        let valorCoberturaQuali = 0;
        let valorAdicional = 0;

        const [valoresMeta] = varFvRemVar.valoresRemuneracao.filter(
          v => v.cargo === funcionario.nomeCargo
        );
        const [atingimentos] = varFvRemVar.atingimentosMeta.filter(
          v => v.cargo === funcionario.nomeCargo && v.mes === mes
        );

        if (valoresMeta && atingimentos) {
          if (atingimentos.preco) valorPrecoMedio = valoresMeta.precoMedio;
          if (atingimentos.volume === 1) valorVolume = valoresMeta.volume1;
          if (atingimentos.volume === 2) valorVolume = valoresMeta.volume2;
          if (atingimentos.volume === 3) valorVolume = valoresMeta.volume3;
          if (atingimentos.volume > 1 && atingimentos.preco)
            valorAdicional = valoresMeta.adicional;
          if (atingimentos.coberturaNum)
            valorCoberturaQuant = valoresMeta.coberturaNumerica;
          if (atingimentos.coberturaQual)
            valorCoberturaQuali = valoresMeta.coberturaQualificada;
        }
        salarioVariavel =
          valorPrecoMedio +
          valorVolume +
          valorCoberturaQuant +
          valorCoberturaQuali +
          valorAdicional;
      }
    }

    // Calcular valor de base de remuneração
    return {
      matricula: funcionario.matricula,
      setor: funcionario.setor,
      nomeCargo: funcionario.nomeCargo,
      admissao: funcionario.admissao,
      salarioBase: salarioBaseAlterado,
      salarioBaseInicial: funcionario.salarioBaseInicial,
      adicionalNoturno,
      quinquenios,
      gratificacoes,
      salarioVariavel,
      salario:
        salarioBaseAlterado + quinquenios + gratificacoes + salarioVariavel,
      baseDeRemuneracao:
        salarioBaseAlterado +
        adicionalNoturno +
        quinquenios +
        gratificacoes +
        salarioVariavel,
      funcaoGratificada: funcionario.funcaoGratificada,
      dataLimite: funcionario.dataLimite,
      temAdicionalNoturno: funcionario.temAdicionalNoturno,
      dataNascimento: funcionario.dataNascimento,
      comercial: funcionario.comercial,
      estadoResidencia: funcionario.estadoResidencia,
      sexo: funcionario.sexo,
      qtdFilhos: funcionario.qtdFilhos,
      regiao: funcionario.regiao,
    };
  });

  return {
    value: qlAtualizado,
    vars: [{ name: 'promocoes', value: promocoes }],
  };
}
