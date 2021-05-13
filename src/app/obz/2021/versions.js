export const versoes = {
  VersaoOficial: 'VersaoOficial', // Versão validada
  VersaoAlterada27MM: 'VersaoAlterada27MM', // VErsão mantendo o volume e alterando preços
  VersaoAlterada25MM: 'VersaoAlterada25MM', // Versão com 25MM e 4 QL a menos
  VersaoInicial25MM: 'VersaoInicial25MM', // Versão com 25MM e 4 QL a menos
  VersaoAlternativa25MM_Cenario1: 'VersaoAlternativa25MM_Cenario1', // Versão com 25MM e 4 QL a menos
  VersaoAlternativa25MM_Cenario1_alt_1: 'VersaoAlternativa25MM_Cenario1_alt_1', // Versão com 25MM e 4 QL a menos
  VersaoAlternativa21MM_CenarioExtra: 'VersaoAlternativa21MM_CenarioExtra', // Versão com 25MM e 4 QL a menos
  VersaoAlternativa25MM_CenarioLisiane: 'VersaoAlternativa25MM_CenarioLisiane', // Versão com 25MM e 4 QL a menos
  Cenario25MMNovoPortfolio: 'Cenario25MMNovoPortfolio', // Versão com 25MM e 4 QL a menos
  Cenario25MMNovoPortfolioCenario1: 'Cenario25MMNovoPortfolioCenario1',
  Cenario25MMNovoPortfolioCenario2: 'Cenario25MMNovoPortfolioCenario2',
  Cenario22MMNovoPortfolioCenario3: 'Cenario22MMNovoPortfolioCenario3',
  Cenario4: 'Cenario4',
  Cenario5: 'Cenario5',
  Cenario6: 'Cenario6',
  Cenario7_1: 'Cenario7_1',
  Cenario7_2: 'Cenario7_2',
  Cenario7_3: 'Cenario7_3',
  Cenario7_4: 'Cenario7_4',
  Cenario7_5: 'Cenario7_5',
};

export const ConfigVersions = {
  VersaoOficial: {
    Versao: versoes.VersaoOficial,
    MercadoInterno: versoes.VersaoOficial,
    Exportacoes: versoes.VersaoOficial,
  },
  VersaoAlterada27MM: {
    Versao: versoes.VersaoAlterada27MM,
    MercadoInterno: versoes.VersaoAlterada27MM,
    Exportacoes: versoes.VersaoAlterada27MM,
  },
  VersaoAlterada25MM: {
    Versao: versoes.VersaoAlterada25MM,
    MercadoInterno: versoes.VersaoAlterada25MM,
    Exportacoes: versoes.VersaoAlterada25MM,
  },
  VersaoInicial25MM: {
    Versao: versoes.VersaoInicial25MM,
    MercadoInterno: versoes.VersaoInicial25MM,
    Exportacoes: versoes.VersaoInicial25MM,
  },
  VersaoAlternativa25MM_Cenario1: {
    Versao: versoes.VersaoAlternativa25MM_Cenario1,
    MercadoInterno: versoes.VersaoAlternativa25MM_Cenario1,
    Exportacoes: versoes.VersaoAlternativa25MM_Cenario1,
  },
  VersaoAlternativa25MM_Cenario1_alt_1: {
    Versao: versoes.VersaoAlternativa25MM_Cenario1_alt_1,
    MercadoInterno: versoes.VersaoAlternativa25MM_Cenario1_alt_1,
    Exportacoes: versoes.VersaoAlternativa25MM_Cenario1_alt_1,
  },
  VersaoAlternativa21MM_CenarioExtra: {
    Versao: versoes.VersaoAlternativa21MM_CenarioExtra,
    MercadoInterno: versoes.VersaoAlternativa21MM_CenarioExtra,
    Exportacoes: versoes.VersaoAlternativa21MM_CenarioExtra,
  },
  VersaoAlternativa25MM_CenarioLisiane: {
    Versao: versoes.VersaoAlternativa25MM_CenarioLisiane,
    MercadoInterno: versoes.VersaoAlternativa25MM_CenarioLisiane,
    Exportacoes: versoes.VersaoAlternativa25MM_CenarioLisiane,
  },
  Cenario25MMNovoPortfolio: {
    Versao: versoes.VersaoAlternativa25MM_CenarioLisiane,
    MercadoInterno: versoes.Cenario25MMNovoPortfolio,
    Exportacoes: versoes.VersaoAlternativa25MM_CenarioLisiane,
  },

  Cenario25MMNovoPortfolioCenario1: {
    Versao: versoes.Cenario25MMNovoPortfolioCenario1,
    MercadoInterno: versoes.Cenario25MMNovoPortfolioCenario1,
    Exportacoes: versoes.VersaoAlternativa25MM_CenarioLisiane,
  },

  Cenario25MMNovoPortfolioCenario2: {
    Versao: versoes.Cenario25MMNovoPortfolioCenario2,
    MercadoInterno: versoes.Cenario25MMNovoPortfolioCenario2,
    Exportacoes: versoes.VersaoAlternativa25MM_CenarioLisiane,
  },

  Cenario22MMNovoPortfolioCenario3: {
    Versao: versoes.Cenario22MMNovoPortfolioCenario3,
    MercadoInterno: versoes.Cenario22MMNovoPortfolioCenario3,
    Exportacoes: versoes.VersaoAlternativa21MM_CenarioExtra,
  },

  Cenario4: {
    Versao: versoes.Cenario22MMNovoPortfolioCenario3,
    MercadoInterno: versoes.Cenario4,
    Exportacoes: versoes.VersaoAlternativa21MM_CenarioExtra,
  },

  Cenario5: {
    Versao: versoes.Cenario22MMNovoPortfolioCenario3,
    MercadoInterno: versoes.Cenario5,
    Exportacoes: versoes.VersaoAlternativa21MM_CenarioExtra,
  },

  Cenario6: {
    Versao: versoes.Cenario22MMNovoPortfolioCenario3,
    MercadoInterno: versoes.Cenario6,
    Exportacoes: versoes.Cenario6,
  },

  Cenario7_1: {
    Versao: versoes.Cenario22MMNovoPortfolioCenario3,
    MercadoInterno: versoes.Cenario7_1,
    Exportacoes: versoes.Cenario6,
  },

  Cenario7_2: {
    Versao: versoes.Cenario22MMNovoPortfolioCenario3,
    MercadoInterno: versoes.Cenario7_2,
    Exportacoes: versoes.Cenario6,
  },

  Cenario7_3: {
    Versao: versoes.Cenario22MMNovoPortfolioCenario3,
    MercadoInterno: versoes.Cenario7_3,
    Exportacoes: versoes.Cenario6,
  },
  Cenario7_4: {
    Versao: versoes.Cenario22MMNovoPortfolioCenario3,
    MercadoInterno: versoes.Cenario7_4,
    Exportacoes: versoes.Cenario6,
  },
  Cenario7_5: {
    Versao: versoes.Cenario22MMNovoPortfolioCenario3,
    MercadoInterno: versoes.Cenario7_5,
    Exportacoes: versoes.Cenario6,
  },
};

export const versao = ConfigVersions.Cenario7_5;
