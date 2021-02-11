import Utils from '../../../../../../utils/utils';

// VALIDADO Com Vanessa em 21/10/20

export const donoConta = 'Vanessa';
export const dataValidacao = '21/12/2020';

export const NomeConta = 'SERVICOS CONTRATADOS';
export const ContaContabil = '3.1.1.1.03.01.050.030';

const politicas = {};
const variaveis = {
  Designer: [
    { mes: 1, valor: 2500 },
    { mes: 2, valor: 2500 },
    { mes: 3, valor: 2500 },
    { mes: 4, valor: 2500 },
    { mes: 5, valor: 2500 },
    { mes: 6, valor: 2500 },
    { mes: 7, valor: 2500 },
    { mes: 8, valor: 2500 },
    { mes: 9, valor: 2500 },
    { mes: 10, valor: 2500 },
    { mes: 11, valor: 2500 },
    { mes: 12, valor: 2500 },
  ],
  Comex: [
    { mes: 1, valor: 4600 },
    { mes: 2, valor: 4600 },
    { mes: 3, valor: 4600 },
    { mes: 4, valor: 4600 },
    { mes: 5, valor: 4600 },
    { mes: 6, valor: 4600 },
    { mes: 7, valor: 4600 },
    { mes: 8, valor: 4600 },
    { mes: 9, valor: 4600 },
    { mes: 10, valor: 4600 },
    { mes: 11, valor: 4600 },
    { mes: 12, valor: 4600 },
  ],
  CEO: [
    { mes: 1, valor: 53775.85 },
    { mes: 2, valor: 53775.85 },
    { mes: 3, valor: 53775.85 },
    { mes: 4, valor: 53775.85 },
    { mes: 5, valor: 53775.85 },
    { mes: 6, valor: 53775.85 },
    { mes: 7, valor: 53775.85 },
    { mes: 8, valor: 53775.85 },
    { mes: 9, valor: 53775.85 },
    { mes: 10, valor: 53775.85 },
    { mes: 11, valor: 53775.85 },
    { mes: 12, valor: 53775.85 },
  ],
  PeD: [
    { mes: 1, valor: 2500 },
    { mes: 2, valor: 2500 },
    { mes: 3, valor: 2500 },
    { mes: 4, valor: 2500 },
    { mes: 5, valor: 2500 },
    { mes: 6, valor: 2500 },
    { mes: 7, valor: 2500 },
    { mes: 8, valor: 2500 },
    { mes: 9, valor: 2500 },
    { mes: 10, valor: 2500 },
    { mes: 11, valor: 2500 },
    { mes: 12, valor: 2500 },
  ],
  TempMarketing: [
    { mes: 1, valor: 1506 },
    { mes: 2, valor: 1506 },
    { mes: 3, valor: 1506 },
    { mes: 4, valor: 1506 },
    { mes: 5, valor: 1506 },
    { mes: 6, valor: 1506 },
  ],
  TemporarioAdm: [
    { mes: 1, valor: 4500 },
    { mes: 2, valor: 4500 },
    { mes: 3, valor: 4500 },
    { mes: 4, valor: 4500 },
    { mes: 5, valor: 4500 },
    { mes: 6, valor: 4500 },
    { mes: 7, valor: 4500 },
  ],
};

export default function ServicosContratados(ano, mes) {
  // Valor Designer

  const Designer = Utils.SomaArray(
    variaveis.Designer.filter(d => d.mes === mes).map(d => d.valor)
  );

  // Valor Comex
  const Comex = Utils.SomaArray(
    variaveis.Comex.filter(c => c.mes === mes).map(c => c.valor)
  );

  // Valor CEO
  const CEO = Utils.SomaArray(
    variaveis.CEO.filter(c => c.mes === mes).map(c => c.valor)
  );
  // Valor P&D
  const PeD = Utils.SomaArray(
    variaveis.PeD.filter(p => p.mes === mes).map(p => p.valor)
  );
  // Valor TI
  const TempMarketing = Utils.SomaArray(
    variaveis.TempMarketing.filter(t => t.mes === mes).map(t => t.valor)
  );
  // Valor Temporário Adm
  const TemporarioAdm = Utils.SomaArray(
    variaveis.TemporarioAdm.filter(t => t.mes === mes).map(t => t.valor)
  );

  return {
    value: {
      Total: Designer + Comex + CEO + PeD + TempMarketing + TemporarioAdm,
      Descricao: {
        Designer,
        Comex,
        CEO,
        PeD,
        TempMarketing,
        TemporarioAdm,
      },
      politicas,
      variaveis,
    },
  };
}
