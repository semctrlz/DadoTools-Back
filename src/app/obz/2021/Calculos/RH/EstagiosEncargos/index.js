import QlAdm from '../../../GlobalVars/ql/qlAdm';
import Utils from '../../../../../../utils/utils';

// VALIDADO Com Vanessa em 06/01/21

export const donoConta = 'Cris';
export const dataValidacao = '06/01/2021';

export const NomeConta = 'ESTAGIOS E ENCARGOS DE ESTAGIOS';
export const ContaContabil = '3.1.1.1.03.01.001.050';
const politicas = {
  taxaEstagio: 0.09, // Taxa incidente sobre o total de bolsa
};
export const variaveis = {};

export default function EstagiosEncargos(ano, mes) {
  const QLAdmMesAtual = QlAdm(ano, mes).value.Estagiarios;
  const totalBolsa = Utils.SomaArray(QLAdmMesAtual.map(v => v.salarioBase));
  const totalEncargosEstagio = totalBolsa * politicas.taxaEstagio;

  return {
    value: {
      Total: totalBolsa + totalEncargosEstagio,
      Bolsa: totalBolsa,
      Encargos: totalEncargosEstagio,
      politicas,
      variaveis,
    },
  };
}
