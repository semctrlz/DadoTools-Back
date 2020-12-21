import QLGeral, { Cargos } from '../ql/qlGeral';

export const tiposNotebook = {
  Basico: 'Básico',
  Intermediario: 'Intermediário',
};
const vars = {
  CargosQueUsamNotebookBasico: [
    Cargos.GerenteDeVendas,
    Cargos.GerenteIndustrial,
    Cargos.GerenteLogistica,
    Cargos.SupervisorDeControladoria,
    Cargos.SupervisorDeGrandesContas,
    Cargos.SupervisorDeProdução,
    Cargos.SupervisorDeSuprimentos,
    Cargos.SupervisorDeTradeEMarketing,
    Cargos.AnalistaSocialMidia,
    Cargos.AssistenteDeSuprimentos,
    Cargos.AssistenteAdministrativo,
    Cargos.EspecialistaContabil,
    Cargos.EspecialistaFinanceiro,
    Cargos.AnalistaFinanceiro,
    Cargos.AuxiliarDeMarketing,
    Cargos.Assistente_AnalistaComercial,
  ],
  CargosQueUsamNotebookIntermediario: [
    Cargos.GerenteDeMarketing,
    Cargos.GerenteFinanceiro,
    Cargos.GerenteGeral,
    Cargos.GerenteJurídicoERh,
  ],
};

export default function Notebooks(ano, mes) {
  const qlMesAtual = QLGeral(ano, mes).value;

  let quantNotebooksBasicos = 0;
  let quantNotebooksBasicosIntermediarios = 0;

  vars.CargosQueUsamNotebookBasico.forEach(c => {
    quantNotebooksBasicos += qlMesAtual.filter(ql => {
      return ql.nomeCargo === c;
    }).length;
  });

  vars.CargosQueUsamNotebookIntermediario.forEach(c => {
    quantNotebooksBasicosIntermediarios += qlMesAtual.filter(ql => {
      return ql.nomeCargo === c;
    }).length;
  });

  return {
    value: {
      Total: quantNotebooksBasicos + quantNotebooksBasicosIntermediarios,
      NotebooksBasicos: quantNotebooksBasicos,
      NotebooksIntermediarios: quantNotebooksBasicosIntermediarios,
    },
    vars,
  };
}
