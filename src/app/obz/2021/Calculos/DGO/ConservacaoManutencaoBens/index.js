import Utils from '../../../../../../utils/utils';

export const NomeConta = 'CONSERVACAO E MANUTENCAO DE BENS';
export const ContaContabil = '3.1.1.1.04.02.001.020';
const politicas = {};
const variaveis = {
  Local: [
    {
      nome: 'Nanocervejaria Food Hall',
      manutencoes: [
        { mes: 3, manutencao: 'Inspeção Rota', valor: 700 },
        { mes: 6, manutencao: 'Inspeção Rota', valor: 700 },
        { mes: 9, manutencao: 'Inspeção Rota', valor: 700 },
        { mes: 12, manutencao: 'Inspeção Rota', valor: 700 },
        { mes: 3, manutencao: 'Adequação/Inspeção NR13', valor: 3000 },
      ],
    },
    {
      nome: 'Microcervejaria Santamate',
      manutencoes: [
        { mes: 3, manutencao: 'Adequação Tubulação', valor: 1000 },
        { mes: 3, manutencao: 'Inspeção Rota', valor: 400 },
        { mes: 6, manutencao: 'Inspeção Rota', valor: 400 },
        { mes: 9, manutencao: 'Inspeção Rota', valor: 400 },
        { mes: 12, manutencao: 'Inspeção Rota', valor: 400 },
        { mes: 2, manutencao: 'Revisar 23 Válvulas comb', valor: 4800 },
        { mes: 5, manutencao: 'Revisar 23 Válvulas comb', valor: 4800 },
        { mes: 8, manutencao: 'Revisar 23 Válvulas comb', valor: 4800 },
        { mes: 11, manutencao: 'Revisar 23 Válvulas comb', valor: 4800 },
        { mes: 2, manutencao: 'Manometros Calibração / Troca', valor: 2250 },
        { mes: 5, manutencao: 'Manometros Calibração / Troca', valor: 2250 },
        { mes: 6, manutencao: 'Adequação/Inspeção NR13', valor: 15000 },
      ],
    },
    {
      nome: 'Centrifuga Santamate',
      manutencoes: [
        {
          mes: 7,
          manutencao: 'Plano INSPEÇÃO Centrífuga ( LUB/REAP/LIMP)',
          valor: 2500,
        },
      ],
    },
    {
      nome: 'Rotuladora Zegla',
      manutencoes: [
        { mes: 3, manutencao: 'Adequação NR12/NR10', valor: 18000 },
        { mes: 4, manutencao: 'Manutenção preventiva', valor: 4000 },
      ],
    },
  ],
};

export default function BensNaturezaPermanente(ano, mes) {
  // Separadas as variaveis por local

  const [ManutencaoNanocervejariaFH] = variaveis.Local.filter(l => {
    return l.nome === 'Nanocervejaria Food Hall';
  });
  const [ManutencaoMicrocervejariaSM] = variaveis.Local.filter(l => {
    return l.nome === 'Microcervejaria Santamate';
  });
  const [ManutencaoCentrifugaSM] = variaveis.Local.filter(l => {
    return l.nome === 'Centrifuga Santamate';
  });
  const [Rotuladora] = variaveis.Local.filter(l => {
    return l.nome === 'Rotuladora Zegla';
  });

  // Valores mensais
  const totalNanocervejariaFH = Utils.SomaArray(
    ManutencaoNanocervejariaFH.manutencoes
      .filter(v => {
        return v.mes === mes;
      })
      .map(v => {
        return v.valor;
      })
  );
  const totalMicrocervejariaSM = Utils.SomaArray(
    ManutencaoMicrocervejariaSM.manutencoes
      .filter(v => {
        return v.mes === mes;
      })
      .map(v => {
        return v.valor;
      })
  );
  const totalCentrifugaSM = Utils.SomaArray(
    ManutencaoCentrifugaSM.manutencoes
      .filter(v => {
        return v.mes === mes;
      })
      .map(v => {
        return v.valor;
      })
  );

  const totalRotuladora = Utils.SomaArray(
    Rotuladora.manutencoes
      .filter(v => {
        return v.mes === mes;
      })
      .map(v => {
        return v.valor;
      })
  );

  const Descricao = {
    Santamate: {
      Total: totalMicrocervejariaSM + totalCentrifugaSM + totalRotuladora,
      Microcervejaria: totalMicrocervejariaSM,
      Centrifuga: totalCentrifugaSM,
      Rotuladora: totalRotuladora,
    },
    FoodHall: {
      Total: totalNanocervejariaFH,
    },
  };

  return {
    value: {
      Total: Descricao.Santamate.Total + Descricao.FoodHall.Total,
      Descricao,
      politicas,
      variaveis,
    },
  };
}
