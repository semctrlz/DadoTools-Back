import { politicas as politicasFolha } from '../../../GlobalVars/fixas/dp/variasFolha';
import ProLabore from '../ProLabore';

export const donoConta = 'Cristiane';

export const NomeConta = 'INSS SOBRE PRO-LABORE';
export const ContaContabil = '3.1.1.1.03.01.040.010';
const politicas = {
  inss: politicasFolha.InssProLabore,
};
export const variaveis = {
  ProLabore: [{ mes: 1, valor: 1144.5 }],
};

export default function InssSobreProLabore(ano, mes) {
  const valorBrutoProLaboreMes = ProLabore(ano, mes).value.Total;
  const inssSobreProLabore = valorBrutoProLaboreMes * politicas.inss;

  return {
    value: {
      Total: inssSobreProLabore,
      politicas,
      variaveis,
    },
  };
}
