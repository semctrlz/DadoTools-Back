import QlGeral, { Cargos } from '../../../GlobalVars/ql/qlGeral';
import QlComercial from '../../../GlobalVars/ql/qlComercial';
import Areas from '../../../GlobalVars/ql/areas';

export const NomeConta = 'TELEFONE';
export const ContaContabil = '3.1.1.1.04.01.001.040';
export const politicas = {};
// TODO Ver com o Marcio
export const variaveis = {
  Valores3CX: [{ mes: 1, valor: 2000 }],
  ValoresVivo: [
    { mes: 1, valor: 200 },
    { mes: 2, valor: 500 },
  ],
  ValorMedioPorCelularComercial: [{ mes: 1, valor: 90 }],
  ValorMedioPorCelularAdm: [{ mes: 1, valor: 60 }],
  ValoresConsultoriaTelefonia: [{ mes: 1, valor: 0 }],
};

export default function Telefonia(ano, mes) {
  const QlComercialMesAtual = QlComercial(ano, mes).value;
  const QlGeraLMesAtual = QlGeral(ano, mes).value;
  const QuantAreasMes = Areas(ano, mes).value.length;

  const QuantCelularesComercial = QlComercialMesAtual.Supervisores.concat(
    QlComercialMesAtual.Vendedores
  ).length;

  const QuantCelularesAdm =
    QlGeraLMesAtual.filter(c => {
      return (
        c.nomeCargo === Cargos.GerenteI ||
        c.nomeCargo === Cargos.GerenteII ||
        c.nomeCargo === Cargos.Supervisor
      );
    }).length + QuantAreasMes;

  let total3cx = 0;
  variaveis.Valores3CX.forEach(v => {
    if (v.mes <= mes) total3cx = v.valor;
  });

  let totalVivo = 0;
  variaveis.ValoresVivo.forEach(v => {
    if (v.mes <= mes) totalVivo = v.valor;
  });

  let valorCelularComercial = 0;
  variaveis.ValorMedioPorCelularComercial.forEach(v => {
    if (v.mes <= mes) valorCelularComercial = v.valor;
  });

  const totalCelularComercial = valorCelularComercial * QuantCelularesComercial;

  let valorCelularAdm = 0;
  variaveis.ValorMedioPorCelularAdm.forEach(v => {
    if (v.mes <= mes) valorCelularAdm = v.valor;
  });

  const totalCelularAdm = valorCelularAdm * QuantCelularesAdm;

  let totalConsultoria = 0;
  variaveis.ValoresConsultoriaTelefonia.forEach(v => {
    if (v.mes <= mes) totalConsultoria = v.valor;
  });

  const telefoniaIp = {
    Total: total3cx + totalVivo,
    Valor3CX: total3cx,
    ValorVivo: totalVivo,
  };
  const telefoniaMovel = {
    Total: totalCelularAdm + totalCelularComercial,
    Adm: totalCelularAdm,
    Comercial: totalCelularComercial,
  };

  return {
    value: {
      Total: telefoniaIp.Total + telefoniaMovel.Total + totalConsultoria,
      Descricao: {
        TelefoniaIP: telefoniaIp,
        TelefoniaMovel: telefoniaMovel,
        Consultoria: totalConsultoria,
      },
      politicas,
      variaveis,
    },
  };
}
