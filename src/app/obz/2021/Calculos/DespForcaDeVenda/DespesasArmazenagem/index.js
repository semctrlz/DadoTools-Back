import Utils from '../../../../../../utils/utils';

export const NomeConta = 'DESPESAS COM ARMAZENAGEM - DESP. VENDAS';
export const ContaContabil = '3.1.1.1.06.01.001.041';

const politicas = {
  transportadoras: { SouzaRoxo: 'Souza Roxo', TRE: 'TRE', Reiter: 'Reiter' },
};

const variaveis = {
  Valores: [
    {
      mes: 1,
      transportadora: politicas.transportadoras.SouzaRoxo,
      valor: 3000,
    },
    { mes: 1, transportadora: politicas.transportadoras.TRE, valor: 2000 },
    {
      mes: 1,
      transportadora: politicas.transportadoras.Reiter,
      valor: 8969.54,
    },
    {
      mes: 3,
      transportadora: politicas.transportadoras.Reiter,
      valor: 12778,
    },
    {
      mes: 5,
      transportadora: politicas.transportadoras.Reiter,
      valor: 16577.85,
    },
  ],
};

export default function DespesasArmazenagem(ano, mes) {
  const valoresTransp = [];

  Object.values(politicas.transportadoras).forEach(t => {
    const valoresTransportadora = variaveis.Valores.filter(
      v => v.transportadora === t
    );

    let valorAtualizado = 0;
    valoresTransportadora.forEach(v => {
      if (v.mes <= mes) valorAtualizado = v.valor;
    });
    valoresTransp.push({ transportadora: t, valor: valorAtualizado });
  });

  const valorMes = Utils.SomaArray(valoresTransp.map(v => v.valor));

  return {
    value: {
      Total: valorMes,
      Detalhes: valoresTransp,
      politicas,
      variaveis,
    },
  };
}
