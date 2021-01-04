import QlAdm from '../../../GlobalVars/ql/qlAdm';
import QlComercial from '../../../GlobalVars/ql/qlComercial';
import Utils from '../../../../../../utils/utils';

export const NomeConta = 'MEDICINA DO TRABALHO';
export const ContaContabil = '3.1.1.1.03.01.021.002';
const politicas = {};

const variaveis = {
  ValorAdendoNovoCargo: [
    { mes: 3, valor: 60 },
    { mes: 10, valor: 60 },
  ],
  ValorExamesAdm: [
    {
      mes: 1,
      valor: 0,
    },
  ],
  ValorPCMSO: [
    {
      mes: 1,
      valor: 7.9,
    },
  ],
};

export default function MedicinaTrabalho(ano, mes) {
  const QlComercialMes = QlComercial(ano, mes).value.QLEfetivos;
  const QlMesAtualT = QlAdm(ano, mes).value;
  const QlMensal = QlMesAtualT.qlTotal;
  const QlEfetivosT = QlMesAtualT.QLEfetivos;

  let valorExames = 0;
  variaveis.ValorExamesAdm.forEach(v => {
    if (v.mes <= mes) valorExames = v.valor;
  });

  const valorTotal =
    QlMensal.filter(ql => {
      return Utils.DatasIguaisAM(ql.admissao, ano, mes);
    }).length * valorExames;

  let valorPCMSO = 0;
  variaveis.ValorPCMSO.forEach(v => {
    if (v.mes <= mes) {
      valorPCMSO = v.valor;
    }
  });

  const valorMensalPCMSO =
    (QlEfetivosT.length + QlComercialMes.length) * valorPCMSO;

  return {
    value: {
      Total: valorTotal + valorMensalPCMSO,
      Descricao: {
        ValorExames: valorTotal,
        ValorPCMSO: valorMensalPCMSO,
        QLConsiderado: QlEfetivosT.length + QlComercialMes.length,
      },
      politicas,
      variaveis,
    },
  };
}
