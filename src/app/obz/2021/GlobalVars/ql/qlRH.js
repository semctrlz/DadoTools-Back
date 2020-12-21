import QLGeral from './qlGeral';

const setorRh = ['RH'];

export default function qlRH(ano, mes) {
  const qlMesAtual = QLGeral(ano, mes);

  const qlAtualizado = qlMesAtual.value.filter(f => {
    return !f.comercial && setorRh.includes(f.setor);
  });

  return {
    value: {
      qlTotal: qlAtualizado,
    },
    vars: { name: 'Cargos RH', value: setorRh },
  };
}
