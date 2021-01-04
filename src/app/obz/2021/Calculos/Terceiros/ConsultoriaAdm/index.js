import Utils from '../../../../../../utils/utils';

export const NomeConta = 'SERVICOS DE CONSULTORIA ADMINISTRATIVA';
export const ContaContabil = '3.1.1.1.05.01.010.010';
const politicas = {};
const variaveis = {
  valores: [
    { mes: 1, empresa: 'Tânia', valor: 7000 },
    { mes: 2, empresa: 'Tânia', valor: 7000 },
    { mes: 3, empresa: 'Tânia', valor: 7000 },
    { mes: 4, empresa: 'Tânia', valor: 7000 },
    { mes: 5, empresa: 'Tânia', valor: 7000 },
    { mes: 6, empresa: 'Tânia', valor: 7000 },
    { mes: 7, empresa: 'Tânia', valor: 7000 },
    { mes: 8, empresa: 'Tânia', valor: 7000 },
    { mes: 9, empresa: 'Tânia', valor: 7000 },
    { mes: 10, empresa: 'Tânia', valor: 7000 },
    { mes: 11, empresa: 'Tânia', valor: 7000 },
    { mes: 12, empresa: 'Tânia', valor: 7000 },
    { mes: 1, empresa: 'Fernanda', valor: 7000 },
    { mes: 2, empresa: 'Fernanda', valor: 7000 },
    { mes: 3, empresa: 'Fernanda', valor: 7000 },
    { mes: 4, empresa: 'Fernanda', valor: 7000 },
    { mes: 5, empresa: 'Fernanda', valor: 7000 },
    { mes: 6, empresa: 'Fernanda', valor: 7000 },
    { mes: 7, empresa: 'Fernanda', valor: 7000 },
    { mes: 8, empresa: 'Fernanda', valor: 7000 },
    { mes: 9, empresa: 'Fernanda', valor: 7000 },
    { mes: 10, empresa: 'Fernanda', valor: 7000 },
    { mes: 11, empresa: 'Fernanda', valor: 7000 },
    { mes: 12, empresa: 'Fernanda', valor: 7000 },
    { mes: 6, empresa: 'Auditoria Interna', valor: 50000 },
    { mes: 1, empresa: 'Mapeamento de processos', valor: 3000 },
    { mes: 2, empresa: 'Mapeamento de processos', valor: 3000 },
    { mes: 3, empresa: 'Mapeamento de processos', valor: 3000 },
    { mes: 4, empresa: 'Mapeamento de processos', valor: 3000 },
    { mes: 5, empresa: 'Mapeamento de processos', valor: 3000 },
    { mes: 6, empresa: 'Mapeamento de processos', valor: 3000 },
    { mes: 7, empresa: 'Mapeamento de processos', valor: 3000 },
    { mes: 8, empresa: 'Mapeamento de processos', valor: 3000 },
    { mes: 9, empresa: 'Mapeamento de processos', valor: 3000 },
    { mes: 10, empresa: 'Mapeamento de processos', valor: 3000 },
    { mes: 11, empresa: 'Mapeamento de processos', valor: 3000 },
    { mes: 12, empresa: 'Mapeamento de processos', valor: 3000 },
  ],
};

export default function ConsultoriaAdm(ano, mes) {
  const valorTotal = Utils.SomaArray(
    variaveis.valores.filter(v => v.mes === mes).map(v => v.valor)
  );
  return {
    value: {
      Total: valorTotal,
      politicas,
      variaveis,
    },
  };
}
