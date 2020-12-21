import QLComercial from '../../../GlobalVars/ql/qlComercial';
import Utils from '../../../../../../utils/utils';
import { variaveis as variaveisRH } from '../../RH/CapacitacaoEDesenvolvimento';

export const NomeConta = 'CAPACITACAO E DESENV PROFISSIONAL - COML';
export const ContaContabil = '3.1.1.1.06.01.002.010';
const politicas = {
  ReunioesPresenciais: [
    {
      mes: 1,
      presencial: false,
    },
    {
      mes: 2,
      presencial: true,
    },
    {
      mes: 3,
      presencial: false,
    },
    {
      mes: 4,
      presencial: true,
    },
    {
      mes: 5,
      presencial: false,
    },
    {
      mes: 6,
      presencial: true,
    },
    {
      mes: 7,
      presencial: false,
    },
    {
      mes: 8,
      presencial: true,
    },
    {
      mes: 9,
      presencial: false,
    },
    {
      mes: 10,
      presencial: true,
    },
    {
      mes: 11,
      presencial: false,
    },
    {
      mes: 12,
      presencial: true,
    },
  ],
};
const variaveis = {
  ValorAlguelSala: variaveisRH.ValorAlguelSala,
  CapacitacaoVendedores: {
    Coffee: [
      {
        item: 'Coffee',
        valor: 20,
      },
    ],
    QuantTurnos: 1,
    Calendario: [2, 4, 6, 8, 10, 12],
  },
  Workshops: [
    { mes: 7, Empresa: 'SENAC', valor: 6500 },
    { mes: 3, Empresa: 'GR', valor: 2600 },
    { mes: 5, Empresa: 'GR', valor: 2600 },
    { mes: 7, Empresa: 'GR', valor: 2600 },
    { mes: 9, Empresa: 'GR', valor: 2600 },
    { mes: 11, Empresa: 'GR', valor: 2600 },
  ],
  Educacao: [
    { mes: 1, valor: 300 },
    { mes: 2, valor: 300 },
    { mes: 3, valor: 300 },
    { mes: 4, valor: 300 },
    { mes: 5, valor: 300 },
    { mes: 6, valor: 300 },
    { mes: 7, valor: 300 },
    { mes: 8, valor: 300 },
    { mes: 9, valor: 300 },
    { mes: 10, valor: 300 },
    { mes: 11, valor: 300 },
    { mes: 12, valor: 300 },
  ],
};

export default function CapacitacaoEDesenvolvimento(ano, mes) {
  const QLComMes = QLComercial(ano, mes).value;
  const QLVendedores = QLComMes.QLEfetivos;

  let TotalCapacitacaoVendedores = 0;
  if (variaveis.CapacitacaoVendedores.Calendario.includes(mes)) {
    TotalCapacitacaoVendedores +=
      variaveis.CapacitacaoVendedores.QuantTurnos * variaveis.ValorAlguelSala;
    TotalCapacitacaoVendedores +=
      Utils.SomaArray(
        variaveis.CapacitacaoVendedores.Coffee.map(v => v.valor)
      ) *
      (QLVendedores.length + 3); // Adicionado 3 para palestrantes/treinadores
  }

  const valorWorkshops = Utils.SomaArray(
    variaveis.Workshops.filter(w => w.mes === mes).map(w => w.valor)
  );
  const valorEducacao = Utils.SomaArray(
    variaveis.Educacao.filter(w => w.mes === mes).map(w => w.valor)
  );

  return {
    value: {
      Total: TotalCapacitacaoVendedores + valorWorkshops + valorEducacao,
      Capacitacao: {
        Total: TotalCapacitacaoVendedores,
        CapacitacaoVendedores: TotalCapacitacaoVendedores,
        WorkshopsPalestrasTreinamentos: valorWorkshops,
        Educacao: valorEducacao,
      },
      politicas,
      variaveis,
    },
  };
}
