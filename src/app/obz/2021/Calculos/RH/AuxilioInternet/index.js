import QlAdm from '../../../GlobalVars/ql/qlAdm';

export const NomeConta = 'AUXILIO INTERNET';
export const ContaContabil = '3.1.1.1.03.01.020.081';

const politicas = {};
const variaveis = {
  valorMensal: [
    {
      mes: 1,
      valor: 119.88,
    },
  ],
};

export default function AuxilioInternet(ano, mes) {
  const QlMesAtual = QlAdm(ano, mes).value;
  const { QLEfetivos } = QlMesAtual;

  let valorAuxilioInternet = 0;
  variaveis.valorMensal.forEach(v => {
    if (v.mes <= mes) valorAuxilioInternet = v.valor;
  });

  return {
    value: {
      Total: valorAuxilioInternet * QLEfetivos.length,
      politicas,
      variaveis,
    },
  };
}
