import Utils from '../../../../../../utils/utils';
import QlAdm from '../../../GlobalVars/ql/qlAdm';

export const NomeConta = 'MATERIAIS DE ESCRITORIO E EXPEDIENTE';
export const ContaContabil = '3.1.1.1.04.02.001.100';
// TODO estimar valores faltantes
const politicas = {};
const variaveis = {
  PercentualQlTrabalhoLocal: 0.2,
  ValoresInsumosMaquinaCafe: [
    {
      mes: 1,
      ValorCafe: 44,
      ValorChocolate: 26.8,
      ValorAgua: 1.7,
    },
  ],
  ConsumoMedioFuncionarioCafe: {
    ConsumoCafe: 0.05,
    ConsumoChocolate: 0.05,
    ConsumoAgua: 0.1,
  },

  ValorCafeSalaDado: [
    {
      mes: 1,
      Agua500: 1.3,
      Cafe: 20,
      Acucar: 2,
    },
  ],
  ConsumoCafeSalaDado: {
    ConsumoAgua: 35, // Garrafa
    ConsumoCafe: 2, // Kg
    ConsumoAcucar: 2, // Por kg
  },
  ValorTintaImpressora: [
    // Faltou
    {
      mes: 1,
      ValorTinta: 40,
      ValorRecargaToner: 40,
    },
  ],
  ConsumoTintaImpressora: {
    // Faltou
    ConsumoTinta: 2,
    RecargasTonner: 2,
  },
  ValorFolhaPapel: [
    // Faltou
    {
      mes: 1,
      ValorResma: 15,
    },
  ],
  ConsumoFolhasPapel: [
    // Faltou
    {
      mes: 1,
      ConsumoResma: 6,
    },
  ],
  ValorMesMateriaisDiversos: [
    // Faltou
    {
      mes: 1,
      valor: 200,
    },
  ],
};

export default function MaterialEscritorioExpediente(ano, mes) {
  const qlAdm = QlAdm(ano, mes).value.qlTotal;

  //  Valor insumos máquina de café
  let custoCafeMaquina = 0;
  let custoChocolateMaquina = 0;
  let custoAguaMaquina = 0;

  // Calcula o custo mais recente da lista de valores
  variaveis.ValoresInsumosMaquinaCafe.forEach(i => {
    if (i.mes <= mes) {
      custoCafeMaquina = i.ValorCafe;
      custoChocolateMaquina = i.ValorChocolate;
      custoAguaMaquina = i.ValorAgua;
    }
  });

  const quantTrabalhoLocal = qlAdm.length * variaveis.PercentualQlTrabalhoLocal;

  const valorTotalConsumoCafeMaquina =
    custoCafeMaquina *
    variaveis.ConsumoMedioFuncionarioCafe.ConsumoCafe *
    quantTrabalhoLocal;
  const valorTotalConsumoChocolateMaquina =
    custoChocolateMaquina *
    variaveis.ConsumoMedioFuncionarioCafe.ConsumoChocolate *
    quantTrabalhoLocal;
  const valorTotalConsumoAguaMaquina =
    custoAguaMaquina *
    variaveis.ConsumoMedioFuncionarioCafe.ConsumoAgua *
    quantTrabalhoLocal;

  // Café sala Dado
  let custoCafeSalaDado = 0;
  let custoAguaSalaDado = 0;
  let custoAcucarSalaDado = 0;

  // Calcula o custo mais recente da lista de valores
  variaveis.ValorCafeSalaDado.forEach(i => {
    if (i.mes <= mes) {
      custoCafeSalaDado = i.Cafe;
      custoAguaSalaDado = i.Agua500;
      custoAcucarSalaDado = i.Acucar;
    }
  });

  const valorTotalCafeSalaDado =
    custoCafeSalaDado * variaveis.ConsumoCafeSalaDado.ConsumoCafe;
  const valorTotalAguaSalaDado =
    custoAguaSalaDado * variaveis.ConsumoCafeSalaDado.ConsumoAgua;
  const valorTotalAcucarSalaDado =
    custoAcucarSalaDado * variaveis.ConsumoCafeSalaDado.ConsumoAcucar;

  let custoTintaImpressora = 0;
  let custoTonner = 0;

  // Calcula o custo mais recente da lista de valores
  variaveis.ValorTintaImpressora.forEach(i => {
    if (i.mes <= mes) {
      custoTintaImpressora = i.ValorTinta;
      custoTonner = i.ValorRecargaToner;
    }
  });

  const valorTotalTintaimpressora =
    custoTintaImpressora * variaveis.ConsumoTintaImpressora.ConsumoTinta;
  const valorTotalTonner =
    custoTonner * variaveis.ConsumoTintaImpressora.RecargasTonner;

  let custoPapel = 0;

  // Calcula o custo mais recente da lista de valores
  variaveis.ValorFolhaPapel.forEach(i => {
    if (i.mes <= mes) {
      custoPapel = i.ValorResma;
    }
  });

  let consumoPapel = 0;
  variaveis.ConsumoFolhasPapel.forEach(i => {
    if (i.mes <= mes) {
      consumoPapel = i.ConsumoResma;
    }
  });

  const valorTotalPapel = custoPapel * consumoPapel;

  const consumosDiversos = Utils.SomaArray(
    variaveis.ValorMesMateriaisDiversos.filter(m => {
      return m.mes === mes;
    }).map(m => {
      return m.valor;
    })
  );
  const Descricao = {
    Cafe: {
      CafeMaquina: {
        Total:
          valorTotalConsumoCafeMaquina +
          valorTotalConsumoChocolateMaquina +
          valorTotalConsumoAguaMaquina,
        Cafe: valorTotalConsumoCafeMaquina,
        Chocolate: valorTotalConsumoChocolateMaquina,
        Agua: valorTotalConsumoAguaMaquina,
      },
      SalaDado: {
        Total:
          valorTotalCafeSalaDado +
          valorTotalAcucarSalaDado +
          valorTotalAguaSalaDado,
        Cafe: valorTotalCafeSalaDado,
        Acucar: valorTotalAcucarSalaDado,
        Agua: valorTotalAguaSalaDado,
      },
    },
    Impressoras: {
      Total: valorTotalTintaimpressora + valorTotalTonner + valorTotalPapel,
      TintaImpressora: valorTotalTintaimpressora,
      Tonner: valorTotalTonner,
      Papel: valorTotalPapel,
    },
    MateriaisDiversos: consumosDiversos,
  };

  return {
    value: {
      Total:
        Descricao.Cafe.CafeMaquina.Total +
        Descricao.Cafe.SalaDado.Total +
        Descricao.Impressoras.Total +
        Descricao.MateriaisDiversos,
      Descricao,
      politicas,
      variaveis,
    },
  };
}
