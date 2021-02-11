import Utils from '../../../../../../utils/utils';

export const donoConta = 'Cristiane Paiva';
export const NomeConta = 'COMISSOES SOBRE VENDAS';
export const ContaContabil = '3.1.1.1.06.01.001.010';
const politicas = {};
const variaveis = {
  valorCampanhasMensais: [
    {
      mes: 1,
      valor: 1850,
    },
  ],
  valorCampanhasAnual: [
    {
      mes: 12,
      valor: 24500,
    },
  ],
};
export default function ComissaoSobreVendas(ano, mes) {
  let valorTotalCampanhasMensais = 0;
  variaveis.valorCampanhasMensais.forEach(v => {
    if (v.mes <= mes) valorTotalCampanhasMensais = v.valor;
  });

  const valorTotalCampanhaAnual = Utils.SomaArray(
    variaveis.valorCampanhasAnual.filter(m => m.mes === mes).map(v => v.valor)
  );

  return {
    value: {
      Total: valorTotalCampanhasMensais + valorTotalCampanhaAnual,
      Resumo: {
        CampanhaMensal: valorTotalCampanhasMensais,
        CampanhaAnual: valorTotalCampanhaAnual,
      },
      variaveis,
      politicas,
    },
  };
}
