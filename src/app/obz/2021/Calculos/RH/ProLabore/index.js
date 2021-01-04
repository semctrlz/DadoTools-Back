import { politicas as politicasFolha } from '../../../GlobalVars/fixas/dp/variasFolha';

export const donoConta = 'Cristiane';

export const NomeConta = 'PRO-LABORE';
export const ContaContabil = '3.1.1.1.03.01.040.001';
const politicas = {
  inss: politicasFolha.Inss,
};
export const variaveis = {
  ProLabore: [{ mes: 1, valor: 1144.5 }],
};

export default function ProLabore(ano, mes) {
  let valorBrutoProLaboreMes = 0;
  variaveis.ProLabore.forEach(p => {
    if (p.mes <= mes) {
      valorBrutoProLaboreMes = p.valor;
    }
  });

  return {
    value: {
      Total: valorBrutoProLaboreMes,
      politicas,
      variaveis,
    },
  };
}
