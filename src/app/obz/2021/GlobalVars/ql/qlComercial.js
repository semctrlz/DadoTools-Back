import QLGeral, { Cargos } from './qlGeral';

const tiposCargo = {
  GerenteI: [
    Cargos.GerenteDeMarketing,
    Cargos.GerenteGeral,
    Cargos.GerenteJurídicoERh,
    Cargos.GerenteFinanceiro,
  ],
  GerenteII: [
    Cargos.GerenteDeVendas,
    Cargos.GerenteLogística,
    Cargos.GerenteIndustrial,
  ],
  Especiais: [Cargos.EspecialistaContabil, Cargos.EspecialistaFinanceiro],
  Supervisores: [
    Cargos.SupervisorDeSuprimentos,
    Cargos.SupervisorDeControladoria,
    Cargos.SupervisorDeGrandesContas,
    Cargos.SupervisorDeProdução,
    Cargos.SupervisorDeTradeEMarketing,
    Cargos.SupervisorDeVendas,
  ],
  Estagiarios: [Cargos.Estagiario],
  JovemAprendiz: [Cargos.JovemAprendiz],
  Vendedores: [Cargos.Vendedor, Cargos.ExecutivoDeContas],
};

// Colocar o adicional noturno, gratificações, quinquenio e salario variável = 0
// para cada funcionário

export default function qlAdm(ano, mes) {
  const comercial = true;
  const qlMesAtual = QLGeral(ano, mes);

  const qlAtualizado = qlMesAtual.value.filter(f => {
    return f.comercial === comercial;
  });

  const GerentesI = qlAtualizado.filter(ql => {
    return tiposCargo.GerenteI.includes(ql.nomeCargo);
  });

  const GerentesII = qlAtualizado.filter(ql => {
    return tiposCargo.GerenteII.includes(ql.nomeCargo);
  });

  const Especiais = qlAtualizado.filter(ql => {
    return tiposCargo.Especiais.includes(ql.nomeCargo);
  });

  const Supervisores = qlAtualizado.filter(ql => {
    return tiposCargo.Supervisores.includes(ql.nomeCargo);
  });

  const Vendedores = qlAtualizado.filter(ql => {
    return tiposCargo.Vendedores.includes(ql.nomeCargo);
  });

  const Estagiarios = qlAtualizado.filter(ql => {
    return tiposCargo.Estagiarios.includes(ql.nomeCargo);
  });

  const JovemAprendiz = qlAtualizado.filter(ql => {
    return tiposCargo.JovemAprendiz.includes(ql.nomeCargo);
  });

  const QlTotalSemGerentes = qlAtualizado.filter(ql => {
    return (
      !tiposCargo.GerenteI.includes(ql.nomeCargo) &&
      !tiposCargo.GerenteII.includes(ql.nomeCargo)
    );
  });

  const Outros = qlAtualizado.filter(ql => {
    return (
      !tiposCargo.GerenteI.includes(ql.nomeCargo) &&
      !tiposCargo.GerenteII.includes(ql.nomeCargo) &&
      !tiposCargo.Especiais.includes(ql.nomeCargo) &&
      !tiposCargo.Estagiarios.includes(ql.nomeCargo) &&
      !tiposCargo.JovemAprendiz.includes(ql.nomeCargo) &&
      !tiposCargo.Vendedores.includes(ql.nomeCargo) &&
      !tiposCargo.Supervisores.includes(ql.nomeCargo)
    );
  });

  const QLEfetivos = qlAtualizado.filter(ql => {
    return (
      ql.nomeCargo !== Cargos.Estagiario &&
      ql.nomeCargo !== Cargos.JovemAprendiz
    );
  });

  return {
    value: {
      qlTotal: qlAtualizado,
      GerentesI,
      GerentesII,
      Especiais,
      Supervisores,
      Vendedores,
      Estagiarios,
      JovemAprendiz,
      QLEfetivos,
      QlTotalSemGerentes,
      Outros,
    },
    vars: { name: 'Tipos de cargo', value: tiposCargo },
  };
}
