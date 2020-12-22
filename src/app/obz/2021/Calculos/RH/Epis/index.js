import Utils from '../../../../../../utils/utils';

export const donoConta = 'Vanessa';
export const dataValidacao = '21/12/2020';

export const NomeConta = 'EQUIPAMENTOS DE PROTECAO INDIVIDUAL';
export const ContaContabil = '3.1.1.1.03.01.021.001';

const politicas = {};
const variaveis = {
  CotacaoEpis: [
    { epi: 'Mascáras para proteção ', valor: 7 },
    { epi: 'Botas de Segurança com resistência a água', valor: 190 },
    { epi: 'Bota de Segurança normal', valor: 80 },
    { epi: 'Uniforme - Calças', valor: 70 },
    { epi: 'Uniforme - Camisetas', valor: 30 },
    { epi: 'Protetor auricular', valor: 50 },
    { epi: 'Óculos de proteção', valor: 8 },
    { epi: 'Luvas nitrílicas', valor: 9 },
    { epi: 'Respirador semifcial + cartucho de gases', valor: 216 },
  ],
  NecessidadeEpis: [
    { mes: 2, epi: 'Mascáras para proteção ', quantidade: 100 },
    { mes: 6, epi: 'Mascáras para proteção ', quantidade: 100 },
    { mes: 10, epi: 'Mascáras para proteção ', quantidade: 100 },
    { mes: 1, epi: 'Botas de Segurança com resistência a água', quantidade: 3 },
    { mes: 7, epi: 'Botas de Segurança com resistência a água', quantidade: 3 },
    { mes: 1, epi: 'Bota de Segurança normal', quantidade: 1 },
    { mes: 7, epi: 'Bota de Segurança normal', quantidade: 1 },
    { mes: 1, epi: 'Uniforme - Calças', quantidade: 9 },
    { mes: 9, epi: 'Uniforme - Calças', quantidade: 9 },
    { mes: 2, epi: 'Uniforme - Camisetas', quantidade: 9 },
    { mes: 9, epi: 'Uniforme - Camisetas', quantidade: 9 },
    { mes: 1, epi: 'Protetor auricular', quantidade: 10 },
    { mes: 6, epi: 'Protetor auricular', quantidade: 10 },
    { mes: 1, epi: 'Óculos de proteção', quantidade: 10 },
    { mes: 6, epi: 'Óculos de proteção', quantidade: 10 },
    { mes: 1, epi: 'Luvas nitrílicas', quantidade: 20 },
    { mes: 6, epi: 'Luvas nitrílicas', quantidade: 20 },
    { mes: 8, epi: 'Luvas nitrílicas', quantidade: 20 },
    { mes: 2, epi: 'Respirador semifcial + cartucho de gases', quantidade: 4 },
    { mes: 8, epi: 'Respirador semifcial + cartucho de gases', quantidade: 4 },
  ],
};

export default function Epis(ano, mes) {
  const NecessidadeEpisMes = variaveis.NecessidadeEpis.filter(n => {
    return n.mes === mes;
  });

  let totalEpis = 0;
  NecessidadeEpisMes.forEach(n => {
    const valor = Utils.SomaArray(
      variaveis.CotacaoEpis.filter(c => {
        return c.epi === n.epi;
      }).map(v => {
        return v.valor;
      })
    );
    totalEpis += valor * n.quantidade;
  });

  return {
    value: {
      Total: totalEpis,
      politicas,
      variaveis,
    },
  };
}
