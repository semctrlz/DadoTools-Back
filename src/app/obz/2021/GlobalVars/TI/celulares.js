import QLGeral, { Cargos } from '../ql/qlGeral';
import Areas from '../ql/areas';

export const tiposCelular = {
  Basico: 'Básico',
  Intermediario: 'Intermediário',
  IPhone: 'IPhone',
};
const vars = {
  CargosCelularBasico: [
    Cargos.Vendedor,
    Cargos.SupervisorDeControladoria,
    Cargos.SupervisorDeGrandesContas,
    Cargos.SupervisorDeProdução,
    Cargos.SupervisorDeSuprimentos,
    Cargos.SupervisorDeTradeEMarketing,
    Cargos.SupervisorDeVendas,
  ],
  CargosIntermediario: [
    Cargos.GerenteDeVendas,
    Cargos.GerenteIndustrial,
    Cargos.GerenteLogistica,
  ],
  CargosIphone: [
    Cargos.GerenteDeMarketing,
    Cargos.GerenteFinanceiro,
    Cargos.GerenteGeral,
    Cargos.GerenteJurídicoERh,
  ],
};

export default function Celulares(ano, mes) {
  const qlMesAtual = QLGeral(ano, mes).value;
  const AreasMes = Areas(ano, mes).value;
  const QlCelularesBasicos = qlMesAtual.filter(ql =>
    vars.CargosCelularBasico.includes(ql.nomeCargo)
  );
  const quantCelularesBasicos = QlCelularesBasicos.length + AreasMes.length;

  const QlCelularesIntermediarios = qlMesAtual.filter(ql =>
    vars.CargosIntermediario.includes(ql.nomeCargo)
  );
  const quantCelularesIntermediarios = QlCelularesIntermediarios.length;

  const QLIphone = qlMesAtual.filter(ql =>
    vars.CargosIphone.includes(ql.nomeCargo)
  );
  const quantIphones = QLIphone.length;

  return {
    value: {
      Total:
        quantCelularesBasicos + quantCelularesIntermediarios + quantIphones,
      CelularesBasicos: quantCelularesBasicos,
      CelularesIntermediarios: quantCelularesIntermediarios,
      IPhones: quantIphones,
      Ql: {
        QlCelularesBasicos,
        QlCelularesIntermediarios,
        QLIphone,
      },
    },
    vars,
  };
}
