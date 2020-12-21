import ReceitaBruta from '../../../GlobalVars/Simulador/ReceitaBruta';

export const NomeConta = 'DESAGIO NA COMPRA DE CREDITOS ICMS';
export const ContaContabil = '3.1.2.1.01.01.001.030';

const politicas = {
  PisDesagioCompraICMS: 0.0165,
  CofinsDesagioCompraICMS: 0.076,
};

const variaveis = {
  percentualICMSTotal: 0.0948,
  PercentualCompraICMS: 0.8,
  DesagioCompraIcms: 0.04,
  SuccessFeeCompraIcms: 0.2,
};

export default async function DesagioCompraIcms(ano, mes) {
  // Valor mensal Desagio na compra de ICMS
  // ValorIcnsComprado

  const ReceitaBrutaMes = (await ReceitaBruta(ano, mes)).value.Total;

  const ValorIcmsMes = ReceitaBrutaMes * variaveis.percentualICMSTotal;
  const CompraIcms = ValorIcmsMes * variaveis.PercentualCompraICMS;

  const valorDesagioCompraIcms = CompraIcms * variaveis.DesagioCompraIcms;

  const TotalPisSobreDesagio =
    valorDesagioCompraIcms * politicas.PisDesagioCompraICMS;

  const TotalCofinsSobreDesagio =
    valorDesagioCompraIcms * politicas.CofinsDesagioCompraICMS;

  const Descricao = {
    DesagioCompraIcms: {
      Total: valorDesagioCompraIcms,
    },
    ImpostosSObreDesagio: {
      Total: TotalPisSobreDesagio + TotalCofinsSobreDesagio,
      PisSobreDesagio: TotalPisSobreDesagio,
      CofinsSobreDesagio: TotalCofinsSobreDesagio,
    },
  };

  return {
    value: {
      Total:
        Descricao.DesagioCompraIcms.Total -
        Descricao.ImpostosSObreDesagio.Total,
      Descricao,
      politicas,
      variaveis,
    },
  };
}
