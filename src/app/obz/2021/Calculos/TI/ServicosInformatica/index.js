import QlGeral, {
  Cargos,
  cargosGerenciais,
} from '../../../GlobalVars/ql/qlGeral';
// import QlAdm from '../../../GlobalVars/ql/qlAdm';
import Areas from '../../../GlobalVars/ql/areas';
// import Dolar from '../../../GlobalVars/financeiros/dolar';
import Notebooks from '../../../GlobalVars/TI/notebooks';
import Utils from '../../../../../../utils/utils';
import Dolar from '../../../GlobalVars/financeiros/dolar';

export const NomeConta = 'SERVICOS INFORMATICA';
export const ContaContabil = '3.1.1.1.04.02.002.002';
export const politicas = {
  CargosQueUsamPowerBIPro: [
    ...cargosGerenciais,
    Cargos.SupervisorDeVendas,
    Cargos.SupervisorDeGrandesContas,
  ],
};
// TODO Ver com o Marcio
export const variaveis = {
  // Checklist das atividades dos vendedores e supervisores
  ChecklistFacilComercial: [
    {
      mes: 1,
      valor: 800,
    },
  ],
  // Zoom cobrado em dólares
  Zoom: [
    {
      mes: 1,
      valor: 15,
    },
  ],
  ProjetoAntecipacaoRecebiveis: [
    { mes: 1, valor: 3584 },
    { mes: 2, valor: 3584 },
  ],
  GestorCreditoSerasa: [{ mes: 2, valor: 24000 }],
  sistemaLogistica: [{ mes: 1, valor: 2870 }],
  QuantServidores: 5,
  MensalidadeStart: [{ mes: 1, valor: 6800 }],
  MensalidadeCigam: [{ mes: 1, valor: 4700 * 1.2 }],
  valorHoraSuporteCigam: [{ mes: 1, valor: 200 }],
  TotalHorasCigam: [
    { mes: 1, valor: 15 },
    { mes: 2, valor: 25 },
    { mes: 3, valor: 25 },
    { mes: 4, valor: 15 },
    { mes: 5, valor: 15 },
    { mes: 6, valor: 15 },
    { mes: 7, valor: 15 },
    { mes: 8, valor: 15 },
    { mes: 9, valor: 20 },
    { mes: 10, valor: 20 },
    { mes: 11, valor: 20 },
    { mes: 12, valor: 20 },
  ],
  // Valores trimestrais
  ValoresLocaweb: [
    { mes: 1, valor: 142 },
    { mes: 2, valor: 142 },
    { mes: 3, valor: 142 },
    { mes: 4, valor: 142 },
    { mes: 5, valor: 142 },
    { mes: 6, valor: 142 },
    { mes: 7, valor: 142 },
    { mes: 8, valor: 142 },
    { mes: 9, valor: 142 },
    { mes: 10, valor: 142 },
    { mes: 11, valor: 142 },
    { mes: 12, valor: 142 },
  ],
  ValoresFullsoft: [{ mes: 1, valor: 0 }],
  ValoresTopDb: [
    { mes: 4, valor: 386 },
    { mes: 6, valor: 180 },
  ],
  ValorLicencaPowerBi: 9.99, // Cobrado em Dólar
  ValorUnitarioRenovacaoAntivirus: 82,
  AdobeMarketing: [
    { mes: 1, valor: 127 },
    { mes: 6, valor: 132 },
  ],
  SpotifyMarketing: [
    { mes: 1, valor: 16.9 },
    { mes: 6, valor: 17.8 },
  ],
  ValorTotalGarantiasDellUnitario: [
    { mes: 1, valor: 50 },
    { mes: 2, valor: 50 },
  ],
  ParcelasGarantiaDell2020PagamentoEm2021: [
    { mes: 1, valor: 50 },
    { mes: 2, valor: 50 },
  ],
  ValorDigitalOceanUsd: [{ mes: 1, valor: 5 }],
  ModuloFiscalImplantacao: { mes: 1, valor: 3750 },
  ModuloFiscalMensal: [
    {
      mes: 1,
      valor: 639,
    },
  ],
};

export default function ServicosInformatica(ano, mes) {
  const QlGeralMes = QlGeral(ano, mes).value;
  const NotebooksMes = Notebooks(ano, mes);
  const cargosQueUsamNotebook = NotebooksMes.vars.CargosQueUsamNotebookBasico.concat(
    NotebooksMes.vars.CargosQueUsamNotebookIntermediario
  );

  const DolarMes = Dolar(ano, mes).value;

  let valorModuloFiscal = 0;
  if (variaveis.ModuloFiscalImplantacao.mes === mes)
    valorModuloFiscal += variaveis.ModuloFiscalImplantacao.valor;

  variaveis.ModuloFiscalMensal.forEach(v => {
    if (v.mes <= mes) {
      valorModuloFiscal += v.valor;
    }
  });

  let totalSistemaLogistica = 0;

  variaveis.sistemaLogistica.forEach(e => {
    if (e.mes <= mes) totalSistemaLogistica = e.valor;
  });

  const projetoAntecipacaoRecebiveis = Utils.SomaArray(
    variaveis.ProjetoAntecipacaoRecebiveis.filter(v => v.mes === mes).map(
      v => v.valor
    )
  );
  const projetoGestorCreditoSerasa = Utils.SomaArray(
    variaveis.GestorCreditoSerasa.filter(v => v.mes === mes).map(v => v.valor)
  );

  const NovosUsuariosNotebook = QlGeralMes.filter(ql => {
    return (
      cargosQueUsamNotebook.includes(ql.nomeCargo) &&
      Utils.DatasIguaisAM(ql.admissao, ano, mes)
    );
  });

  const UsuariosNotebookComGarantiaDell2021 = QlGeralMes.filter(ql => {
    if (
      ql.admissao.getFullYear() === ano &&
      ql.admissao.getMonth() <= mes - 10
    ) {
      return cargosQueUsamNotebook.includes(ql.nomeCargo);
    }

    return false;
  });

  // const qlAdmMes = QlAdm(ano, mes).value.qlTotal;
  const QuantAreasMes = Areas(ano, mes).value.length;
  const QuantUsuariosPowerBI =
    QlGeralMes.filter(ql => {
      return politicas.CargosQueUsamPowerBIPro.includes(ql.nomeCargo);
    }).length + QuantAreasMes;

  const totalPowerBiMes =
    QuantUsuariosPowerBI * variaveis.ValorLicencaPowerBi * DolarMes;

  let totalMensalidadeStart = 0;
  variaveis.MensalidadeStart.forEach(m => {
    if (m.mes <= mes) totalMensalidadeStart = m.valor;
  });
  let totalMensalidadeAdobeMarketing = 0;
  variaveis.AdobeMarketing.forEach(m => {
    if (m.mes <= mes) totalMensalidadeAdobeMarketing = m.valor;
  });
  let totalMensalidadeCigam = 0;
  variaveis.MensalidadeCigam.forEach(m => {
    if (m.mes <= mes) totalMensalidadeCigam = m.valor;
  });

  let valorHoraSuporteCigam = 0;
  variaveis.valorHoraSuporteCigam.forEach(v => {
    if (v.mes <= mes) {
      valorHoraSuporteCigam = v.valor;
    }
  });

  const TotalHorasCigam = Utils.SomaArray(
    variaveis.TotalHorasCigam.filter(v => {
      return v.mes === mes;
    }).map(v => {
      return v.valor;
    })
  );

  const totalSuporteCigam = valorHoraSuporteCigam * TotalHorasCigam;

  const totalLocaweb = Utils.SomaArray(
    variaveis.ValoresLocaweb.filter(v => {
      return v.mes === mes;
    }).map(v => {
      return v.valor;
    })
  );
  const totalFullsoft = Utils.SomaArray(
    variaveis.ValoresFullsoft.filter(v => {
      return v.mes === mes;
    }).map(v => {
      return v.valor;
    })
  );
  const totalTopDB = Utils.SomaArray(
    variaveis.ValoresTopDb.filter(v => {
      return v.mes === mes;
    }).map(v => {
      return v.valor;
    })
  );
  let totalMensalidadeSpotify = 0;
  variaveis.SpotifyMarketing.forEach(m => {
    if (m.mes <= mes) totalMensalidadeSpotify = m.valor;
  });

  const valorOffice365 = 0;

  const totalOffice365 = NovosUsuariosNotebook.length * valorOffice365;
  let valorGarantiaDell = 0;
  variaveis.ValorTotalGarantiasDellUnitario.forEach(m => {
    if (m.mes <= mes) valorGarantiaDell = m.valor;
  });

  const parcelaAnoAnteriorDell = Utils.SomaArray(
    variaveis.ParcelasGarantiaDell2020PagamentoEm2021.filter(v => {
      return v.mes === mes;
    }).map(v => {
      return v.valor;
    })
  );

  const totalGarantiaDell =
    UsuariosNotebookComGarantiaDell2021.length * valorGarantiaDell +
    parcelaAnoAnteriorDell;

  let valorDigitalOcean = 0;
  variaveis.ValorDigitalOceanUsd.forEach(m => {
    if (m.mes <= mes) valorDigitalOcean = m.valor;
  });

  const totalDigitalOcean = valorDigitalOcean * 5.9;

  let totalAntivirus = 0;
  if (mes === 3) {
    totalAntivirus =
      (QlGeralMes.length + variaveis.QuantServidores) *
      variaveis.ValorUnitarioRenovacaoAntivirus;
  }

  let ValorChecklistFacil = 0;
  variaveis.ChecklistFacilComercial.forEach(cf => {
    if (cf.mes <= mes) {
      ValorChecklistFacil = cf.valor;
    }
  });
  let ValorZoom = 0;
  variaveis.Zoom.forEach(z => {
    if (z.mes <= mes) {
      ValorZoom = z.valor * DolarMes;
    }
  });

  const Descricao = {
    PowerBI: {
      Total: totalPowerBiMes,
      QuantUsuarios: QuantUsuariosPowerBI,
    },
    Start: totalMensalidadeStart,
    AdobeMarketing: totalMensalidadeAdobeMarketing,
    SpotifyMarketing: totalMensalidadeSpotify,
    Cigam: {
      Total: totalMensalidadeCigam + totalSuporteCigam,
      Mensalidade: totalMensalidadeCigam,
      Suporte: totalSuporteCigam,
    },
    ProjetoModuloFiscal: valorModuloFiscal,
    ProjetoAntecipacaoRecebiveis: projetoAntecipacaoRecebiveis,
    ProjetoGestorCreditoSerasa: projetoGestorCreditoSerasa,
    SistemaLogistica: totalSistemaLogistica,
    Locaweb: totalLocaweb,
    FullSoft: totalFullsoft,
    TopDb: totalTopDB,
    Office365: totalOffice365,
    GarantiaDell: totalGarantiaDell,
    DigitalOcean: totalDigitalOcean,
    Antivirus: totalAntivirus,
    ZoomRH: ValorZoom,
    ChecklistFacilComercial: ValorChecklistFacil,
  };

  return {
    value: {
      Total:
        Descricao.PowerBI.Total +
        Descricao.Start +
        Descricao.AdobeMarketing +
        Descricao.SpotifyMarketing +
        Descricao.Cigam.Total +
        Descricao.Locaweb +
        Descricao.FullSoft +
        Descricao.TopDb +
        Descricao.Office365 +
        Descricao.GarantiaDell +
        Descricao.DigitalOcean +
        Descricao.Antivirus +
        Descricao.SistemaLogistica +
        Descricao.ProjetoAntecipacaoRecebiveis +
        Descricao.ProjetoGestorCreditoSerasa +
        Descricao.ProjetoModuloFiscal +
        ValorZoom +
        ValorChecklistFacil,
      Descricao,
      politicas,
      variaveis,
    },
  };
}
