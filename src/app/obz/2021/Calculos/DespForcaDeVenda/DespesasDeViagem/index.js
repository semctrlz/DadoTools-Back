import QlComercial from '../../../GlobalVars/ql/qlComercial';
import QlVeiculos from '../../../GlobalVars/locacoes/veiculosComercial';
import { Regioes } from '../../../GlobalVars/ql/qlGeral';
import Rotas from '../../../GlobalVars/forcaVendas/rotas';
import Utils from '../../../../../../utils/utils';

export const NomeConta = 'DESPESAS COM VIAGEM - COMERCIAL';
export const ContaContabil = '3.1.1.1.06.01.001.090';
// #region Políticas e variáveis

const TipoTransporte = {
  CarroProprio: 'CarroProprio',
  CarroAlugado: 'CarroAlugado',
  Onibus: 'Onibus',
  Aviao: 'Aviao',
};

const Destinos = {
  SantaMaria: 'SantaMaria',
  Inab: 'Inab',
  NewAge: 'NewAge',
  Fabrica: 'Fabrica',
  Padrao: 'Padrao',
};

const politicas = {
  valorReembolsoRefeicao: 40,
  valorReembolsoCombustivelCarroAlugado: 4.5 / 12,
  CalculoLitroPorKmCarroProprio: 5,
  ValorDiarioUber: 40,
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
      presencial: false,
    },
    {
      mes: 6,
      presencial: false,
    },
    {
      mes: 7,
      presencial: false,
    },
    {
      mes: 8,
      presencial: false,
    },
    {
      mes: 9,
      presencial: false,
    },
    {
      mes: 10,
      presencial: false,
    },
    {
      mes: 11,
      presencial: false,
    },
    {
      mes: 12,
      presencial: false,
    },
  ],
  valorHospedagemPolitica: [
    { estado: 'RS', valor: 250 },
    { estado: 'SC', valor: 250 },
    { estado: 'PR', valor: 250 },
  ],
  calendarioReunioes: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
};
const variaveis = {
  CalendarioViagem: [],
  Destinos: [],
  ValoresPorEstado: [
    {
      mes: 1,
      estado: 'RS',
      combustivelLitro: 4.508,
      valorLavagem: 45,
      PassagemAerea: 0,
      Onibus: 0,
    },
    {
      mes: 1,
      estado: 'SC',
      combustivelLitro: 4.384,
      valorLavagem: 45,
      PassagemAerea: 400,
      Onibus: 0,
    },
    {
      mes: 1,
      estado: 'PR',
      combustivelLitro: 4.3718,
      valorLavagem: 40,
      PassagemAerea: 500,
      Onibus: 0,
    },
    {
      mes: 2,
      estado: 'RS',
      combustivelLitro: 4.508,
      valorLavagem: 45,
      PassagemAerea: 0,
      Onibus: 0,
    },
    {
      mes: 2,
      estado: 'SC',
      combustivelLitro: 4.384,
      valorLavagem: 45,
      PassagemAerea: 400,
      Onibus: 0,
    },
    {
      mes: 2,
      estado: 'PR',
      combustivelLitro: 4.3718,
      valorLavagem: 40,
      PassagemAerea: 500,
      Onibus: 0,
    },
    {
      mes: 3,
      estado: 'RS',
      combustivelLitro: 4.508,
      valorLavagem: 45,
      PassagemAerea: 0,
      Onibus: 0,
    },
    {
      mes: 3,
      estado: 'SC',
      combustivelLitro: 4.384,
      valorLavagem: 45,
      PassagemAerea: 400,
      Onibus: 0,
    },
    {
      mes: 3,
      estado: 'PR',
      combustivelLitro: 4.3718,
      valorLavagem: 40,
      PassagemAerea: 500,
      Onibus: 0,
    },
    {
      mes: 4,
      estado: 'RS',
      combustivelLitro: 4.508,
      valorLavagem: 45,
      PassagemAerea: 0,
      Onibus: 0,
    },
    {
      mes: 4,
      estado: 'SC',
      combustivelLitro: 4.384,
      valorLavagem: 45,
      PassagemAerea: 400,
      Onibus: 0,
    },
    {
      mes: 4,
      estado: 'PR',
      combustivelLitro: 4.3718,
      valorLavagem: 40,
      PassagemAerea: 500,
      Onibus: 0,
    },
    {
      mes: 5,
      estado: 'RS',
      combustivelLitro: 4.508,
      valorLavagem: 45,
      PassagemAerea: 0,
      Onibus: 0,
    },
    {
      mes: 5,
      estado: 'SC',
      combustivelLitro: 4.384,
      valorLavagem: 45,
      PassagemAerea: 400,
      Onibus: 0,
    },
    {
      mes: 5,
      estado: 'PR',
      combustivelLitro: 4.3718,
      valorLavagem: 40,
      PassagemAerea: 500,
      Onibus: 0,
    },
    {
      mes: 6,
      estado: 'RS',
      combustivelLitro: 4.508,
      valorLavagem: 45,
      PassagemAerea: 0,
      Onibus: 0,
    },
    {
      mes: 6,
      estado: 'SC',
      combustivelLitro: 4.384,
      valorLavagem: 45,
      PassagemAerea: 400,
      Onibus: 0,
    },
    {
      mes: 6,
      estado: 'PR',
      combustivelLitro: 4.3718,
      valorLavagem: 40,
      PassagemAerea: 500,
      Onibus: 0,
    },
    {
      mes: 7,
      estado: 'RS',
      combustivelLitro: 4.508,
      valorLavagem: 45,
      PassagemAerea: 0,
      Onibus: 0,
    },
    {
      mes: 7,
      estado: 'SC',
      combustivelLitro: 4.384,
      valorLavagem: 45,
      PassagemAerea: 400,
      Onibus: 0,
    },
    {
      mes: 7,
      estado: 'PR',
      combustivelLitro: 4.3718,
      valorLavagem: 40,
      PassagemAerea: 500,
      Onibus: 0,
    },
    {
      mes: 8,
      estado: 'RS',
      combustivelLitro: 4.508,
      valorLavagem: 45,
      PassagemAerea: 0,
      Onibus: 0,
    },
    {
      mes: 8,
      estado: 'SC',
      combustivelLitro: 4.384,
      valorLavagem: 45,
      PassagemAerea: 400,
      Onibus: 0,
    },
    {
      mes: 8,
      estado: 'PR',
      combustivelLitro: 4.3718,
      valorLavagem: 40,
      PassagemAerea: 500,
      Onibus: 0,
    },
    {
      mes: 9,
      estado: 'RS',
      combustivelLitro: 4.508,
      valorLavagem: 45,
      PassagemAerea: 0,
      Onibus: 0,
    },
    {
      mes: 9,
      estado: 'SC',
      combustivelLitro: 4.384,
      valorLavagem: 45,
      PassagemAerea: 400,
      Onibus: 0,
    },
    {
      mes: 9,
      estado: 'PR',
      combustivelLitro: 4.3718,
      valorLavagem: 40,
      PassagemAerea: 500,
      Onibus: 0,
    },
    {
      mes: 10,
      estado: 'RS',
      combustivelLitro: 4.508,
      valorLavagem: 45,
      PassagemAerea: 0,
      Onibus: 0,
    },
    {
      mes: 10,
      estado: 'SC',
      combustivelLitro: 4.384,
      valorLavagem: 45,
      PassagemAerea: 400,
      Onibus: 0,
    },
    {
      mes: 10,
      estado: 'PR',
      combustivelLitro: 4.3718,
      valorLavagem: 40,
      PassagemAerea: 500,
      Onibus: 0,
    },
    {
      mes: 11,
      estado: 'RS',
      combustivelLitro: 4.508,
      valorLavagem: 45,
      PassagemAerea: 0,
      Onibus: 0,
    },
    {
      mes: 11,
      estado: 'SC',
      combustivelLitro: 4.384,
      valorLavagem: 45,
      PassagemAerea: 400,
      Onibus: 0,
    },
    {
      mes: 11,
      estado: 'PR',
      combustivelLitro: 4.3718,
      valorLavagem: 40,
      PassagemAerea: 500,
      Onibus: 0,
    },
    {
      mes: 12,
      estado: 'RS',
      combustivelLitro: 4.508,
      valorLavagem: 45,
      PassagemAerea: 0,
      Onibus: 0,
    },
    {
      mes: 12,
      estado: 'SC',
      combustivelLitro: 4.384,
      valorLavagem: 45,
      PassagemAerea: 400,
      Onibus: 0,
    },
    {
      mes: 12,
      estado: 'PR',
      combustivelLitro: 4.3718,
      valorLavagem: 40,
      PassagemAerea: 500,
      Onibus: 0,
    },
  ],
  HistoricoMensalRota: [
    {
      rota: 'EXEC GPOA / LITORAL',
      consumoCombustivel: 213.21,
      quantLavagens: 1.0,
      valorPedagios: 118.2,
      estadiasViagensLongas: 6.0,
    },
    {
      rota: 'EXEC LC DPP',
      consumoCombustivel: 196.29,
      quantLavagens: 1.0,
      valorPedagios: 25.99,
      estadiasViagensLongas: 0.0,
    },
    {
      rota: 'EXEC NOROESTE RS',
      consumoCombustivel: 129.09,
      quantLavagens: 1.0,
      valorPedagios: 18.49,
      estadiasViagensLongas: 0.67,
    },
    {
      rota: 'EXEC NORTE SC',
      consumoCombustivel: 182.89,
      quantLavagens: 1.0,
      valorPedagios: 28.49,
      estadiasViagensLongas: 2.0,
    },
    {
      rota: 'EXEC OESTE SC',
      consumoCombustivel: 294.6,
      quantLavagens: 1.0,
      valorPedagios: 18.49,
      estadiasViagensLongas: 4.67,
    },
    {
      rota: 'EXEC PARANA',
      consumoCombustivel: 225.34,
      quantLavagens: 1.0,
      valorPedagios: 162.54,
      estadiasViagensLongas: 0.0,
    },
    {
      rota: 'EXEC POA',
      consumoCombustivel: 286.1,
      quantLavagens: 1.0,
      valorPedagios: 98.39,
      estadiasViagensLongas: 2.67,
    },
    {
      rota: 'EXEC SUL SC',
      consumoCombustivel: 317.86,
      quantLavagens: 1.0,
      valorPedagios: 46.49,
      estadiasViagensLongas: 0.0,
    },
    {
      rota: 'EXEC VALES / SERRA',
      consumoCombustivel: 275.07,
      quantLavagens: 1.0,
      valorPedagios: 0.0,
      estadiasViagensLongas: 6.33,
    },
    {
      rota: 'FRONTEIRA',
      consumoCombustivel: 250.76,
      quantLavagens: 1.0,
      valorPedagios: 68.59,
      estadiasViagensLongas: 10.0,
    },
    {
      rota: 'GERENTE COMERCIAL',
      consumoCombustivel: 72.56,
      quantLavagens: 1.0,
      valorPedagios: 0.0,
      estadiasViagensLongas: 0.67,
    },
    {
      rota: 'GFLORIPA',
      consumoCombustivel: 173.54,
      quantLavagens: 1.0,
      valorPedagios: 33.49,
      estadiasViagensLongas: 3.33,
    },
    {
      rota: 'LITORAL RS',
      consumoCombustivel: 287.51,
      quantLavagens: 2.33,
      valorPedagios: 0.0,
      estadiasViagensLongas: 0.0,
    },
    {
      rota: 'OESTE SC',
      consumoCombustivel: 171.32,
      quantLavagens: 3.0,
      valorPedagios: 27.74,
      estadiasViagensLongas: 5.67,
    },
    {
      rota: 'POA',
      consumoCombustivel: 202.59,
      quantLavagens: 1.67,
      valorPedagios: 0.0,
      estadiasViagensLongas: 0.0,
    },
    {
      rota: 'SERRA',
      consumoCombustivel: 167.58,
      quantLavagens: 1.33,
      valorPedagios: 59.44,
      estadiasViagensLongas: 0.0,
    },
    {
      rota: 'SGC RS',
      consumoCombustivel: 280.62,
      quantLavagens: 1.0,
      valorPedagios: 63.74,
      estadiasViagensLongas: 7.0,
    },
    {
      rota: 'SGC SC',
      consumoCombustivel: 130.16,
      quantLavagens: 1.0,
      valorPedagios: 59.29,
      estadiasViagensLongas: 0.0,
    },
    {
      rota: 'SUL SC',
      consumoCombustivel: 393.64,
      quantLavagens: 1.33,
      valorPedagios: 18.49,
      estadiasViagensLongas: 0.67,
    },
    {
      rota: 'SV INTERIOR',
      consumoCombustivel: 221.01,
      quantLavagens: 1.0,
      valorPedagios: 154.97,
      estadiasViagensLongas: 4.0,
    },
    {
      rota: 'SV MKT',
      consumoCombustivel: 306.77,
      quantLavagens: 1.0,
      valorPedagios: 0.0,
      estadiasViagensLongas: 4.67,
    },
    {
      rota: 'SV POA/LITORAL',
      consumoCombustivel: 207.0,
      quantLavagens: 1.0,
      valorPedagios: 80.69,
      estadiasViagensLongas: 0.0,
    },
    {
      rota: 'SV SC',
      consumoCombustivel: 190.39,
      quantLavagens: 1.0,
      valorPedagios: 77.79,
      estadiasViagensLongas: 7.33,
    },
    {
      rota: 'VALES',
      consumoCombustivel: 281.44,
      quantLavagens: 1.0,
      valorPedagios: 114.44,
      estadiasViagensLongas: 2.33,
    },
    {
      rota: 'ZONA SUL',
      consumoCombustivel: 261.22,
      quantLavagens: 1.0,
      valorPedagios: 246.04,
      estadiasViagensLongas: 0.0,
    },
    {
      rota: 'NORTE / SC',
      consumoCombustivel: 137.33,
      quantLavagens: 1.0,
      valorPedagios: 0.0,
      estadiasViagensLongas: 0.0,
    },
    {
      rota: 'NOVA ROTA 01',
      consumoCombustivel: 225,
      quantLavagens: 1.0,
      valorPedagios: 70,
      estadiasViagensLongas: 3,
    },
    {
      rota: 'NOVA ROTA 02',
      consumoCombustivel: 225,
      quantLavagens: 1.0,
      valorPedagios: 70,
      estadiasViagensLongas: 3,
    },
    {
      rota: 'NOVA ROTA 03',
      consumoCombustivel: 225,
      quantLavagens: 1.0,
      valorPedagios: 70,
      estadiasViagensLongas: 3,
    },
    {
      rota: 'NOVA ROTA 04',
      consumoCombustivel: 225,
      quantLavagens: 1.0,
      valorPedagios: 70,
      estadiasViagensLongas: 3,
    },
    {
      rota: 'NOVA ROTA 05',
      consumoCombustivel: 225,
      quantLavagens: 1.0,
      valorPedagios: 70,
      estadiasViagensLongas: 3,
    },
    {
      rota: 'NOVA ROTA 06',
      consumoCombustivel: 225,
      quantLavagens: 1.0,
      valorPedagios: 70,
      estadiasViagensLongas: 3,
    },
    {
      rota: 'NOVA ROTA 07',
      consumoCombustivel: 225,
      quantLavagens: 1.0,
      valorPedagios: 70,
      estadiasViagensLongas: 3,
    },
  ],
  ValorDiariaAluguelCarro: 200,
  ValorSemParar: 18.5,
};
// #endregion

export default function DespesasDeViagem(ano, mes) {
  // #region Variáveis iniciais
  const rotasMes = Rotas(ano, mes).value;
  const valoresEstado = variaveis.ValoresPorEstado.filter(e => e.mes === mes);

  const QLMes = QlComercial(ano, mes).value;
  const QlVendasESupervisao = QLMes.Vendedores.concat(QLMes.Supervisores);
  const VeiculosMes = QlVeiculos(ano, mes).value.TotalCarros;

  let ResumoReuniaoPresencial = { mes: 1, presencial: true };

  politicas.ReunioesPresenciais.forEach(r => {
    if (r.mes <= mes) ResumoReuniaoPresencial = r;
  });

  const reuniaoPresencial = ResumoReuniaoPresencial.presencial;
  const QuantReunioesMes = politicas.calendarioReunioes.filter(c => {
    return c === mes;
  }).length;
  // #endregion

  // #region Viagens dentro da rota

  const resumoRotas = rotasMes.Rotas.map(r => {
    // Cobnsulta o histórico da rota
    const historico = variaveis.HistoricoMensalRota.filter(h => {
      return h.rota === r.rota;
    });
    const consumoCombustivel = Utils.SomaArray(
      historico.map(v => {
        return v.consumoCombustivel;
      })
    );
    const quantLavagens = Utils.SomaArray(
      historico.map(v => {
        return v.quantLavagens;
      })
    );
    const valorPedagio = Utils.SomaArray(
      historico.map(v => {
        return v.valorPedagios;
      })
    );
    const quantEstadias = Utils.SomaArray(
      historico.map(v => {
        return v.estadiasViagensLongas;
      })
    );

    const valorCombustivelEstado = Utils.SomaArray(
      valoresEstado
        .filter(v => {
          return v.estado === r.estado;
        })
        .map(v => {
          return v.combustivelLitro;
        })
    );
    const valorLavagemlEstado = Utils.SomaArray(
      valoresEstado
        .filter(v => {
          return v.estado === r.estado;
        })
        .map(v => {
          return v.valorLavagem;
        })
    );

    const valorTotalConbustivel = valorCombustivelEstado * consumoCombustivel;
    const valorTotalLavagem = valorLavagemlEstado * quantLavagens;
    const valorTotalPedagio = valorPedagio;

    const ValorEstadiaEstado = Utils.SomaArray(
      politicas.valorHospedagemPolitica
        .filter(e => {
          return e.estado === r.estado;
        })
        .map(v => {
          return v.valor;
        })
    );

    const valorTotalEstadias = quantEstadias * ValorEstadiaEstado;
    const valorTotalRefeicoes =
      quantEstadias * politicas.valorReembolsoRefeicao;

    return {
      estado: r.estado,
      rota: r.rota,
      valorCombustivel: valorTotalConbustivel,
      valorLavagens: valorTotalLavagem,
      valorPedagios: valorTotalPedagio,
      valorEstadiasViagensLongas: valorTotalEstadias,
      valorRefeicaoViagensLongas: valorTotalRefeicoes,
    };
  });

  const totalValorCombustivel = Utils.SomaArray(
    resumoRotas.map(r => {
      return r.valorCombustivel;
    })
  );
  const totalValorLavagens = Utils.SomaArray(
    resumoRotas.map(r => {
      return r.valorLavagens;
    })
  );
  const totalValorPedagios = Utils.SomaArray(
    resumoRotas.map(r => {
      return r.valorPedagios;
    })
  );
  const totalValorSemParar = VeiculosMes * variaveis.ValorSemParar;
  const totalValorEstadias = Utils.SomaArray(
    resumoRotas.map(r => {
      return r.valorEstadiasViagensLongas;
    })
  );
  const totalValorRefeicao = Utils.SomaArray(
    resumoRotas.map(r => {
      return r.valorRefeicaoViagensLongas;
    })
  );

  const totalViagensRotas = {
    totalValorCombustivel,
    totalValorLavagens,
    totalValorSemParar,
    totalValorPedagios,
    totalValorEstadias,
    totalValorRefeicao,
  };
  // #endregion

  // #region Contratação e reunião mensal vendedores
  // Reunião vendedores
  const ResumoReuniaoVendedores = QlVendasESupervisao.map(ql => {
    let valorTransporte = 0;
    let valorEstadia = 0;
    let valorRefeicao = 0;

    const valorEstadiaPolitica = Utils.SomaArray(
      politicas.valorHospedagemPolitica
        .filter(e => {
          return e.estado === 'RS';
        })
        .map(e => {
          return e.valor;
        })
    );

    if (ql.regiao === Regioes.SCSul || ql.regiao === Regioes.RSInterior) {
      valorRefeicao = politicas.valorReembolsoRefeicao;
      valorEstadia = valorEstadiaPolitica;
    } else if (ql.regiao === Regioes.SCNorte || ql.regiao === Regioes.PR) {
      const passagemAerea = Utils.SomaArray(
        valoresEstado
          .filter(e => {
            return e.estado === 'RS';
          })
          .map(e => {
            return e.PassagemAerea;
          })
      );
      valorRefeicao = politicas.valorReembolsoRefeicao;
      valorEstadia = valorEstadiaPolitica;
      valorTransporte = passagemAerea + politicas.ValorDiarioUber;
    }

    return { ...ql, valorRefeicao, valorEstadia, valorTransporte };
  });

  const reuniaoRefeicao = Utils.SomaArray(
    ResumoReuniaoVendedores.map(v => {
      return v.valorRefeicao;
    })
  );
  const reuniaoEstadia = Utils.SomaArray(
    ResumoReuniaoVendedores.map(v => {
      return v.valorEstadia;
    })
  );
  const reuniaoTransporte = Utils.SomaArray(
    ResumoReuniaoVendedores.map(v => {
      return v.valorTransporte;
    })
  );

  const ReuniaoVendedores = {
    Total: reuniaoPresencial
      ? (reuniaoRefeicao + reuniaoEstadia + reuniaoTransporte) *
        QuantReunioesMes
      : 0,
    Transporte: reuniaoPresencial ? reuniaoTransporte * QuantReunioesMes : 0,
    Estadia: reuniaoPresencial ? reuniaoEstadia * QuantReunioesMes : 0,
    Refeicao: reuniaoPresencial ? reuniaoRefeicao * QuantReunioesMes : 0,
  };

  const ResumoContratacao = QlVendasESupervisao.filter(ql => {
    return Utils.DatasIguaisAM(ql.admissao, ano, mes);
  }).map(ql => {
    let valorTransporte = 0;
    let valorEstadia = 0;
    let valorRefeicao = 0;

    const valorEstadiaPolitica = Utils.SomaArray(
      politicas.valorHospedagemPolitica
        .filter(e => {
          return e.estado === 'RS';
        })
        .map(e => {
          return e.valor;
        })
    );

    if (ql.regiao === Regioes.SCSul || ql.regiao === Regioes.RSInterior) {
      const onibus = Utils.SomaArray(
        valoresEstado
          .filter(e => {
            return e.estado === ql.estadoResidencia;
          })
          .map(e => {
            return e.Onibus;
          })
      );
      valorRefeicao = politicas.valorReembolsoRefeicao;
      valorEstadia = valorEstadiaPolitica;
      valorTransporte = onibus / 2 + politicas.ValorDiarioUber;
    } else if (ql.regiao === Regioes.SCNorte || ql.regiao === Regioes.PR) {
      const passagemAerea = Utils.SomaArray(
        valoresEstado
          .filter(e => {
            return e.estado === ql.estadoResidencia;
          })
          .map(e => {
            return e.PassagemAerea;
          })
      );
      valorRefeicao = politicas.valorReembolsoRefeicao;
      valorEstadia = valorEstadiaPolitica;
      valorTransporte = passagemAerea / 2 + politicas.ValorDiarioUber;
    }

    return { ...ql, valorRefeicao, valorEstadia, valorTransporte };
  });

  const contratacaoRefeicao = Utils.SomaArray(
    ResumoContratacao.map(v => {
      return v.valorRefeicao;
    })
  );

  const contratacaoEstadia = Utils.SomaArray(
    ResumoContratacao.map(v => {
      return v.valorEstadia;
    })
  );
  const contratacaoTransporte = Utils.SomaArray(
    ResumoContratacao.map(v => {
      return v.valorTransporte;
    })
  );

  const ContratacaoVendedores = {
    Total: contratacaoRefeicao + contratacaoEstadia + contratacaoTransporte,
    Transporte: contratacaoTransporte,
    Estadia: contratacaoEstadia,
    Refeicao: contratacaoRefeicao,
  };

  // #endregion

  // Despesas de viagem extraordinaria
  let ValorTransporte = 0;
  let ValorAlimentacao = 0;
  let ValorEstadia = 0;
  let ValorIngresso = 0;

  const viagens = variaveis.CalendarioViagem.filter(v => {
    return v.mes === mes;
  });

  viagens.forEach(viagem => {
    const destinoFiltro = variaveis.Destinos.filter(d => {
      return d.Destino === viagem.Destino;
    });

    // Tenta localizar o destino na tabela de destinos, caso não consiga,
    // pega o destino padrão
    const destino =
      destinoFiltro.length > 0
        ? destinoFiltro[0]
        : variaveis.Destinos.filter(d => {
            return d.Destino === Destinos.Padrao;
          })[0];

    // Considera o valor de combustivel do RS
    const valorCombustivelRS = variaveis.ValoresPorEstado.filter(e => {
      return e.estado === 'RS' && e.mes === mes;
    })[0].valor;

    // Calcula o valor da passagem

    if (!viagem.Carona) {
      if (viagem.TipoTransporte === TipoTransporte.Onibus) {
        ValorTransporte +=
          destino.ValorPassagemOnibus +
          politicas.ValorDiarioUber * viagem.Diarias;
      } else if (viagem.TipoTransporte === TipoTransporte.CarroProprio) {
        ValorTransporte +=
          (destino.Distancia / politicas.CalculoLitroPorKmCarroProprio) *
            valorCombustivelRS +
          destino.ValorPedagios;
      } else if (viagem.TipoTransporte === TipoTransporte.CarroAlugado) {
        ValorTransporte +=
          destino.Distancia * politicas.valorReembolsoCombustivelCarroAlugado +
          destino.ValorPedagios +
          viagem.Diarias * variaveis.ValorDiariaAluguelCarro;
      } else if (viagem.TipoTransporte === TipoTransporte.Aviao) {
        ValorTransporte +=
          destino.ValorPassagemAerea +
          viagem.Diarias * politicas.ValorDiarioUber;
      }
    }
    ValorAlimentacao += viagem.Diarias * politicas.valorReembolsoRefeicao;
    ValorEstadia += viagem.Diarias * destino.ValorDiaria;
    ValorIngresso += viagem.ValorIngresso;
  });

  return {
    value: {
      Total:
        ValorTransporte +
        ValorAlimentacao +
        ValorEstadia +
        ValorIngresso +
        totalViagensRotas.totalValorCombustivel +
        totalViagensRotas.totalValorEstadias +
        totalViagensRotas.totalValorSemParar +
        totalViagensRotas.totalValorLavagens +
        totalViagensRotas.totalValorPedagios +
        totalViagensRotas.totalValorRefeicao +
        ReuniaoVendedores.Total +
        ContratacaoVendedores.Total,
      ViagensLongas: {
        Total:
          totalViagensRotas.totalValorCombustivel +
          totalViagensRotas.totalValorEstadias +
          totalViagensRotas.totalValorLavagens +
          totalViagensRotas.totalValorPedagios +
          totalViagensRotas.totalValorRefeicao +
          totalViagensRotas.totalValorSemParar,
        totalValorCombustivel,
        totalValorLavagens,
        totalValorPedagios,
        totalValorSemParar,
        totalValorEstadias,
        totalValorRefeicao,
        ResumoPorRota: resumoRotas,
      },
      ReuniaoVendedores,
      ContratacaoVendedores,
      Descricao: {
        Transporte: ValorTransporte,
        Alimentacao: ValorAlimentacao,
        Estadia: ValorEstadia,
        Ingresso: ValorIngresso,
      },
      politicas,
      variaveis,
    },
  };
}
