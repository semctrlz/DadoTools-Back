import { versao, versoes } from '../../versions';

const variaveis = {
  Rotas: [
    { mesInicial: 1, mesFinal: 12, estado: 'RS', rota: 'EXEC GPOA / LITORAL' },
    { mesInicial: 1, mesFinal: 12, estado: 'RS', rota: 'EXEC LC DPP' },
    { mesInicial: 1, mesFinal: 12, estado: 'RS', rota: 'EXEC NOROESTE RS' },
    { mesInicial: 1, mesFinal: 12, estado: 'SC', rota: 'EXEC NORTE SC' },
    { mesInicial: 1, mesFinal: 12, estado: 'SC', rota: 'EXEC OESTE SC' },
    { mesInicial: 1, mesFinal: 12, estado: 'PR', rota: 'EXEC PARANA' },
    { mesInicial: 1, mesFinal: 12, estado: 'RS', rota: 'EXEC POA' },
    { mesInicial: 1, mesFinal: 12, estado: 'SC', rota: 'EXEC SUL SC' },
    { mesInicial: 1, mesFinal: 12, estado: 'RS', rota: 'EXEC VALES / SERRA' },
    { mesInicial: 1, mesFinal: 12, estado: 'RS', rota: 'FRONTEIRA' },
    { mesInicial: 1, mesFinal: 12, estado: 'RS', rota: 'GERENTE COMERCIAL' },
    { mesInicial: 1, mesFinal: 12, estado: 'SC', rota: 'GFLORIPA' },
    { mesInicial: 1, mesFinal: 12, estado: 'RS', rota: 'LITORAL RS' },
    { mesInicial: 1, mesFinal: 12, estado: 'SC', rota: 'OESTE SC' },
    { mesInicial: 1, mesFinal: 12, estado: 'RS', rota: 'POA' },
    { mesInicial: 1, mesFinal: 12, estado: 'RS', rota: 'SERRA' },
    { mesInicial: 1, mesFinal: 12, estado: 'RS', rota: 'SGC RS' },
    { mesInicial: 1, mesFinal: 12, estado: 'SC', rota: 'SGC SC' },
    { mesInicial: 1, mesFinal: 12, estado: 'SC', rota: 'SUL SC' },
    { mesInicial: 1, mesFinal: 12, estado: 'RS', rota: 'SV INTERIOR' },
    { mesInicial: 1, mesFinal: 12, estado: 'RS', rota: 'SV MKT' },
    { mesInicial: 1, mesFinal: 12, estado: 'RS', rota: 'SV POA/LITORAL' },
    { mesInicial: 1, mesFinal: 12, estado: 'SC', rota: 'SV SC' },
    { mesInicial: 1, mesFinal: 12, estado: 'RS', rota: 'VALES' },
    { mesInicial: 1, mesFinal: 12, estado: 'RS', rota: 'ZONA SUL' },
    { mesInicial: 1, mesFinal: 12, estado: 'SC', rota: 'NORTE / SC' },
    { mesInicial: 1, mesFinal: 12, estado: 'RS', rota: 'NOVA ROTA 01' },
    { mesInicial: 1, mesFinal: 12, estado: 'RS', rota: 'NOVA ROTA 02' },
  ],
};
export default function Rotas(ano, mes) {
  const rotasMes = variaveis.Rotas.filter(r => {
    return r.mesInicial <= mes && (r.mesFinal === null || r.mesFinal >= mes);
  });

  let rotas = rotasMes;

  if (
    versao.Versao === versoes.Cenario25MMNovoPortfolioCenario2 ||
    versao.Versao === versoes.Cenario22MMNovoPortfolioCenario3
  ) {
    rotas = rotasMes.filter(r => {
      return (
        r.rota !== 'EXEC PARANA' &&
        r.rota !== 'OESTE SC' &&
        r.rota !== 'NORTE / SC' &&
        r.rota !== 'GFLORIPA' &&
        r.rota !== 'SUL SC'
      );
    });
  } else {
    rotas = rotasMes.filter(r => {
      return r.rota !== 'NOVA ROTA 01' && r.rota !== 'NOVA ROTA 02';
    });
  }

  return {
    value: { Rotas: rotas },
    vars: variaveis,
  };
}
