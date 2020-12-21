import QlAdm from '../../../GlobalVars/ql/qlAdm';

export const NomeConta = 'MATERIAIS DE LIMPEZA';
export const ContaContabil = '3.1.1.1.04.02.001.130';
const politicas = {};
const variaveis = {
  PercentualQlTrabalhoLocal: 0,
  ConsumoMedioAlcoolGel: 0,
  ValoresMensaisMateriaisLimpeza: [
    {
      mes: 1,
      SacosLixo: 0,
      ProdutosLimpeza: 0,
      AlcoolGel: 0,
    },
  ],
};

export default function MateriaisLimpeza(ano, mes) {
  const qlAdm = QlAdm(ano, mes).value.qlTotal;

  const [
    valorMensalLimpeza = { SacosLixo: 0, ProdutosLimpeza: 0, AlcoolGel: 0 },
  ] = variaveis.ValoresMensaisMateriaisLimpeza.filter(l => {
    return l.mes === mes;
  });

  const valorTotalSacosLixo = valorMensalLimpeza.SacosLixo;
  const valorTotalProdLimpeza = valorMensalLimpeza.ProdutosLimpeza;
  const valorTotalAlcoolGel =
    valorMensalLimpeza.AlcoolGel *
    qlAdm.length *
    variaveis.PercentualQlTrabalhoLocal *
    variaveis.ConsumoMedioAlcoolGel;

  const Descricao = {
    SacosLixo: valorTotalSacosLixo,
    ProdutosLimpeza: valorTotalProdLimpeza,
    alcoolGel: valorTotalAlcoolGel,
  };

  return {
    value: {
      Total:
        Descricao.SacosLixo + Descricao.ProdutosLimpeza + Descricao.alcoolGel,
      Descricao,
      politicas,
      variaveis,
    },
  };
}
