import QlComercial from '../../../GlobalVars/ql/qlComercial';

export const NomeConta = 'SALARIOS - COMERCIAL';
export const ContaContabil = '3.1.1.1.06.01.002.001';

export default function Salarios(ano, mes) {
  const QlMes = QlComercial(ano, mes);

  // Pegar todo o QL sem estagiários e Jovem aprendizes
  const qlEfetivos = QlMes.value.QLEfetivos;

  // Pegar o ql de Jovens aprendizes
  const qlTotal = QlMes.value.JovemAprendiz.concat(qlEfetivos);
  const resumo = qlTotal.map(f => {
    return {
      matricula: f.matricula,
      cargo: f.nomeCargo,
      salarioBase: f.salarioBase,
      quinquenio: f.quinquenios,
      gratificacoes: f.gratificacoes,
      salarioVariavel: f.salarioVariavel,
      salario: f.salario,
      adicionalNoturno: f.adicionalNoturno,
    };
  });

  // Totalizar
  let totalSalario = 0;
  // Considerado 11/12 de salário visto que o salário no mês de férias entra na conta férias.

  resumo.forEach(element => {
    totalSalario += (element.salario / 12) * 11;
  });

  return {
    value: {
      Total: totalSalario,
      Salarios: resumo,
    },
  };
}
