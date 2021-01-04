import { Cargos } from '../../../VariaveisEPoliticas/variaveis/qlGeral';

export const variaveis = {
  valoresRemuneracao: [
    {
      cargo: Cargos.Vendedor,
      precoMedio: 750,
      volume1: 315,
      volume2: 450,
      volume3: 675,
      coberturaNumerica: 150,
      coberturaQualificada: 150,
      adicional: 750,
    },
    {
      cargo: Cargos.ExecutivoDeContas,
      precoMedio: 875,
      volume1: 367.5,
      volume2: 525,
      volume3: 787.5,
      coberturaNumerica: 175,
      coberturaQualificada: 175,
      adicional: 875,
    },
    {
      cargo: Cargos.SupervisorDeVendas,
      precoMedio: 1000,
      volume1: 420,
      volume2: 600,
      volume3: 900,
      coberturaNumerica: 200,
      coberturaQualificada: 200,
      adicional: 1000,
    },
    {
      cargo: Cargos.SupervisorDeGrandesContas,
      precoMedio: 1150,
      volume1: 483,
      volume2: 690,
      volume3: 1035,
      coberturaNumerica: 230,
      coberturaQualificada: 230,
      adicional: 1150,
    },
  ],
  // FALTA Magalhães definir atingimento de meta
  atingimentosMeta: [
    {
      mes: 1,
      cargo: Cargos.Vendedor,
      preco: true,
      volume: 2,
      coberturaNum: false,
      coberturaQual: true,
    },
  ],
};
export const politicas = {
  percentualFuncaoGratificada: 0.2,
};
