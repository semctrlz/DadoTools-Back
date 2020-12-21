import QlComercial from '../ql/qlComercial';
import { Cargos } from '../ql/qlGeral';

const variaveis = {
  CargosQueUtilizamCarro: [
    Cargos.SupervisorDeVendas,
    Cargos.Vendedor,
    Cargos.ExecutivoDeContas,
    Cargos.GerenteDeVendas,
    Cargos.SupervisorDeGrandesContas,
    Cargos.SupervisorDeTradeEMarketing,
  ],
};

export default function VeiculosComercial(ano, mes) {
  const qlMes = QlComercial(ano, mes).value.qlTotal;

  const quantidadeCarros = qlMes.filter(ql => {
    return variaveis.CargosQueUtilizamCarro.includes(ql.nomeCargo);
  }).length;

  return {
    value: { TotalCarros: quantidadeCarros, QLQueUsaCarro: qlMes },
    vars: variaveis,
  };
}
