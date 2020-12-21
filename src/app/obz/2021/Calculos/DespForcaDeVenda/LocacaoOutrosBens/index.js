import VeiculosComercial from '../../../GlobalVars/locacoes/veiculosComercial';

export const NomeConta = 'LOCACAO DE OUTROS BENS - DESP. VENDAS';
export const ContaContabil = '3.1.1.1.06.01.001.050';
// FALTOU Carol preencher alguns valores
const politicas = {
  // Faltou preencher
  VerbaMensalManutencaoGEralVeiculo: 0,
};
const variaveis = {
  MensalidadeVeiculos: 1150,
  MemsalidadeRastreadores: 49,
  QuantCilindrosCO2: 15,
  ValorMensalLocacaoCilindro: 30,
  ValorReparos: {
    Vidros: 550,
    Pneus: 299,
  },
  EstimativaReparosMensais: {
    // Faltou preencher
    Vidros: 0,
    Pneus: 0,
  },
};

export default function LocacaoOutrosBens(ano, mes) {
  const VeiculosMes = VeiculosComercial(ano, mes).value.TotalCarros;

  const totalMensalidadeVeiculos = VeiculosMes * variaveis.MensalidadeVeiculos;
  const totalMensalidadeRastreadores =
    VeiculosMes * variaveis.MemsalidadeRastreadores;
  const totalCilindrosCO2 =
    variaveis.QuantCilindrosCO2 * variaveis.ValorMensalLocacaoCilindro;

  const totalReparoVidros =
    VeiculosMes *
    variaveis.ValorReparos.Vidros *
    variaveis.EstimativaReparosMensais.Vidros;
  const totalReparoPneus =
    VeiculosMes *
    variaveis.ValorReparos.Pneus *
    variaveis.EstimativaReparosMensais.Pneus;

  const totalManutencaoGeral =
    VeiculosMes * politicas.VerbaMensalManutencaoGEralVeiculo;

  const Veiculos = {
    Total:
      totalMensalidadeVeiculos +
      totalMensalidadeRastreadores +
      totalReparoVidros +
      totalReparoPneus +
      totalManutencaoGeral,
    Locacao: totalMensalidadeVeiculos,
    Rastreadores: totalMensalidadeRastreadores,
    Reparos: {
      Total: totalReparoVidros + totalReparoPneus + totalManutencaoGeral,
      ReparoVidros: totalReparoVidros,
      ReparoPneus: totalReparoPneus,
      ManutencaoGeral: totalManutencaoGeral,
    },
  };

  return {
    value: {
      Total: Veiculos.Total + totalCilindrosCO2,
      Veiculos,
      CilindrosCO2: totalCilindrosCO2,
    },
  };
}
