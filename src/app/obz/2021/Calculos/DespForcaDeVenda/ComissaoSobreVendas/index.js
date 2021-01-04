import QlComercial from '../../../GlobalVars/ql/qlComercial';
import Utils from '../../../../../../utils/utils';
import { Cargos } from '../../../GlobalVars/ql/qlGeral';

export const donoConta = 'Cristiane Paiva';
export const NomeConta = 'COMISSOES SOBRE VENDAS';
export const ContaContabil = '3.1.1.1.06.01.001.010';
const politicas = {};
const variaveis = {
  valorCampanhas: [
    {
      mes: 1,
      cargo: Cargos.Vendedor,
      valorMetaIndividual: 20,
      valorMetaColetiva: 20,
    },
    {
      mes: 1,
      cargo: Cargos.ExecutivoDeContas,
      valorMetaIndividual: 20,
      valorMetaColetiva: 20,
    },
    {
      mes: 1,
      cargo: Cargos.SupervisorDeVendas,
      valorMetaIndividual: 20,
      valorMetaColetiva: 20,
    },
    {
      mes: 1,
      cargo: Cargos.SupervisorDeGrandesContas,
      valorMetaIndividual: 20,
      valorMetaColetiva: 20,
    },
  ],
  atingimentos: [
    {
      mes: 1,
      cargo: Cargos.Vendedor,
      atingimentoIndividual: 0.5,
    },
    {
      mes: 1,
      cargo: Cargos.ExecutivoDeContas,
      atingimentoIndividual: 0.7,
    },
    {
      mes: 1,
      cargo: Cargos.SupervisorDeVendas,
      atingimentoIndividual: 0.5,
    },
    {
      mes: 1,
      cargo: Cargos.SupervisorDeGrandesContas,
      atingimentoIndividual: 1,
    },
  ],
};
export default function ComissaoSobreVendas(ano, mes) {
  const atingimentosMes = variaveis.atingimentos.filter(v => v.mes === mes);
  const valorCampanhaMes = variaveis.valorCampanhas.filter(v => v.mes === mes);
  const { QLEfetivos: QlEfetivosMes } = QlComercial(ano, mes).value;

  const valorCargos = [];
  atingimentosMes.forEach(am => {
    const quantCargo = QlEfetivosMes.filter(c => c.nomeCargo === am.cargo)
      .length;
    const atingimento = am.atingimentoIndividual;
    const [valoresCampanha] = valorCampanhaMes.filter(
      c => c.cargo === am.cargo
    );
    const valorCampanha = valoresCampanha.valorMetaIndividual || 0;

    // TODO verificar
    const totalCargo =
      quantCargo * valorCampanha * atingimento +
      valoresCampanha.valorMetaColetiva;
    valorCargos.push({ cargo: am.cargo, valor: totalCargo });
  });

  const total = Utils.SomaArray(valorCargos.map(vc => vc.valor));

  return {
    value: {
      Total: total,
      Resumo: valorCargos,
      variaveis,
      politicas,
    },
  };
}
