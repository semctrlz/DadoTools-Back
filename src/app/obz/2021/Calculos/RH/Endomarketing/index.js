import QlAdm from '../../../GlobalVars/ql/qlAdm';
import QlComercial from '../../../GlobalVars/ql/qlComercial';
import Qlgeral from '../../../GlobalVars/ql/qlGeral';
import Areas from '../../../GlobalVars/ql/areas';
import QlRH from '../../../GlobalVars/ql/qlRH';
import Utils from '../../../../../../utils/utils';

export const donoConta = 'Gabriele';
export const dataValidacao = '22/12/2020';

export const NomeConta = 'ENDOMARKETING';
export const ContaContabil = '3.1.1.1.03.01.020.010';
const politicas = {
  ReunioesPresenciais: [
    {
      mes: 1,
      presencial: false,
    },
    {
      mes: 2,
      presencial: false,
    },
    {
      mes: 3,
      presencial: false,
    },
    {
      mes: 4,
      presencial: false,
    },
    {
      mes: 5,
      presencial: false,
    },
    {
      mes: 6,
      presencial: false,
    },
    {
      mes: 7,
      presencial: true,
    },
    {
      mes: 8,
      presencial: false,
    },
    {
      mes: 9,
      presencial: false,
    },
    {
      mes: 10,
      presencial: false,
    },
    {
      mes: 11,
      presencial: false,
    },
    {
      mes: 12,
      presencial: true,
    },
  ],
};
const variaveis = {
  CoffeeReuniaoGeral: [{ item: 'coffee', valor: 19.8 }],
  AluguelSalaReuniaoGeral: 1200,
  MesesReuniaoGeral: [7],
  CoffeeReuniaoNatal: [{ item: 'coffee', valor: 25 }],
  AluguelSalaReuniaoNatal: 1200,
  MesesReuniaoNatal: [12],
  PresenteReuniaoNatal: [
    {
      item: 'Presente',
      valor: 150,
    },
    {
      item: 'Impressões',
      valor: 1.5,
    },
    {
      item: 'Brinde cerveja',
      valor: 18,
    },
  ],
  PercentualDeIndicadosContratados: 0.6,
  Brindes: {
    mesCompraTempoCasa: [1],
    quantidadeExtraTempoDeCasa: 10,
    TempoDeCasa: [
      { item: 'Chaveiro ', valor: 15.0 },
      { item: 'Bottom ', valor: 2.5 },
      { item: 'Impressões ', valor: 6.2 },
    ],
    Aniversariantes: [
      { item: 'Fardo de Cerveja ', valor: 18.0 },
      { item: 'Impressões ', valor: 2.0 },
    ],
    AiversarioDadoBier: [{ item: 'Brinde ', valor: 20.0 }],
    DiaDaMulher: [{ item: 'Brinde ', valor: 25.0 }],
    Pascoa: [
      { item: 'Brinde ', valor: 20.0 },
      { item: 'Impressões ', valor: 1.5 },
    ],
    QuantidadeExtraDiaMaes: 1,
    DiaDasMaes: [
      { item: 'Brinde', valor: 30.0 },
      { item: 'Impressões ', valor: 1.5 },
    ],
    DiaDaCerveja: [{ item: 'Brinde ', valor: 18.0 }],
    DiaDosPais: [
      { item: 'Brinde ', valor: 30.0 },
      { item: 'Impressões', valor: 1.5 },
    ],
    CheckCompetencias: [{ item: 'Brinde ', valor: 20.0 }],
    OutubroRosa: [{ item: 'Brinde ', valor: 20.0 }],
    TopSerHumano: [{ item: 'Brinde ', valor: 20.0 }],
    GPTW: [
      { item: 'Brinde 1', valor: 15.0, mes: 7 },
      { item: 'Brinde 2', valor: 15.0, mes: 11 },
    ],
    Indicacoes: [{ item: 'Brinde', valor: 20.0 }],
    BoasVindas: [
      { item: 'Impressão Folder  ADP', valor: 6.2 },
      { item: 'Código de Ética:', valor: 14.0 },
      { item: 'Código do Colaborador', valor: 14.0 },
      { item: 'Impressão Folder Benefício', valor: 6.2 },
      { item: 'Caneca', valor: 16.0 },
      { item: 'Caderno', valor: 15.0 },
    ],
    Jubilados: [
      { item: 'Baldes', valor: 620, mesCompra: 1 },
      { item: 'FardosCerveja', valor: 72, mesCompra: 12 },
    ],
    NovembroAzul: [{ item: 'Brinde', valor: 20.0 }],
  },
  EncontroLideres: {
    valorIngresso: 200,
    mes: 12,
  },
  TopSerHumano: {
    valorIngresso: 350,
    mes: 9,
  },
  GPTW: {
    valorIngresso: 350,
    mes: 10,
    pecas: [{ item: 'Peça 1', valor: 150, quantidade: 4 }],
  },
};

export default function Endomarketing(ano, mes) {
  const QlGeralMensal = Qlgeral(ano, mes).value;
  const QLFinalAno = Qlgeral(ano, 12).value;

  const QLAdmMesAtual = QlAdm(ano, mes).value;
  const QLComMesAtual = QlComercial(ano, mes).value;
  const QlRHMesAtual = QlRH(ano, mes).value.qlTotal;
  const QlAreaMesAtual = Areas(ano, mes).value;

  // Pegar o QL de gerências
  const QlGerencial = QLAdmMesAtual.GerentesI.concat(
    QLAdmMesAtual.GerentesII,
    QLComMesAtual.GerentesI,
    QLComMesAtual.GerentesII
  );
  const QlSupervisores = QLAdmMesAtual.Supervisores.concat(
    QLComMesAtual.Supervisores
  );

  const presenciais = politicas.ReunioesPresenciais.filter(rp => {
    return rp.mes === mes;
  });

  const reuniaoPresencial =
    presenciais.length > 0 ? presenciais[0].presencial : true;

  // Determina o valor da sala das reuniões geral e de natal de acordo com a
  // política de reuniões virtuais ou presenciais

  const valorSalaReuniaoGeral = reuniaoPresencial
    ? variaveis.AluguelSalaReuniaoGeral
    : 0;
  const valorSalaReuniaoNatal = reuniaoPresencial
    ? variaveis.AluguelSalaReuniaoNatal
    : 0;

  // Reunião Geral
  let totalReuniaoGeral = 0;
  if (variaveis.MesesReuniaoGeral.includes(mes)) {
    const valorCoffeeRunaoGeral = Utils.SomaArray(
      variaveis.CoffeeReuniaoGeral.map(rg => {
        return rg.valor;
      })
    );

    totalReuniaoGeral =
      QlGeralMensal.length * valorCoffeeRunaoGeral + valorSalaReuniaoGeral;
  }

  // Encontro de lideres
  // Encontro anual com todos os Geerentes e supervisores
  let ValorEncontroLideres = 0;
  if (variaveis.EncontroLideres.mes === mes) {
    ValorEncontroLideres =
      (QlGerencial.length + QlSupervisores.length) *
      variaveis.EncontroLideres.valorIngresso;
  }

  // Reunião Natal
  let totalReuniaoNatal = 0;
  if (variaveis.MesesReuniaoNatal.includes(mes)) {
    const valorCoffeeRunaoNatal = Utils.SomaArray(
      variaveis.CoffeeReuniaoNatal.map(rg => {
        return rg.valor;
      })
    );

    const valorPresenteReuniaoNatal = Utils.SomaArray(
      variaveis.PresenteReuniaoNatal.map(rn => {
        return rn.valor;
      })
    );

    totalReuniaoNatal =
      QLFinalAno.length * valorCoffeeRunaoNatal +
      valorSalaReuniaoNatal +
      valorPresenteReuniaoNatal * QLFinalAno.length;
  }

  // Brindes

  // Tempo de casa
  let totalBrindeTempoCasa = 0;
  let valorBrindeTempoCasa = 0;

  // Considerados no OBZ os valores quando forem comprados os brindes
  if (variaveis.Brindes.mesCompraTempoCasa.includes(mes)) {
    valorBrindeTempoCasa = Utils.SomaArray(
      variaveis.Brindes.TempoDeCasa.map(b => {
        return b.valor;
      })
    );

    // Aqui dividimos o valor total dos brindes a serem comprados pelas datas das compras

    totalBrindeTempoCasa =
      ((QLFinalAno.filter(ql => ql.admissao.getFullYear() < 2021).length +
        variaveis.Brindes.quantidadeExtraTempoDeCasa) *
        valorBrindeTempoCasa) /
      variaveis.Brindes.mesCompraTempoCasa.length;
  }

  // Aniversariantes
  const valorBrindeAniversario = Utils.SomaArray(
    variaveis.Brindes.Aniversariantes.map(b => {
      return b.valor;
    })
  );

  // Considerado o ql final de Dezembro e considerando que todos farão
  // aniversário uma vez no ano. Dividimos o valor total dos brindes por 12
  const totalBrindeAniversariantes =
    (QLFinalAno.length * valorBrindeAniversario) / 12;

  // Aniversário Dado Bier
  let totalBrindeAniversarioDadoBier = 0;
  if (mes === 3) {
    const valorBrindeAniversarioDadoBier = Utils.SomaArray(
      variaveis.Brindes.AiversarioDadoBier.map(b => {
        return b.valor;
      })
    );
    totalBrindeAniversarioDadoBier =
      QlGeralMensal.length * valorBrindeAniversarioDadoBier;
  }

  // brinde dia da mulher
  let totalBrindeDiaDaMulher = 0;
  if (mes === 3) {
    const valorBrindeDiaDaMulher = Utils.SomaArray(
      variaveis.Brindes.DiaDaMulher.map(b => {
        return b.valor;
      })
    );
    totalBrindeDiaDaMulher =
      QlGeralMensal.filter(ql => {
        return ql.sexo === 'F';
      }).length * valorBrindeDiaDaMulher;
  }

  // brinde páscoa
  let totalBrindePascoa = 0;
  if (mes === 3) {
    const valorBrindePascoa = Utils.SomaArray(
      variaveis.Brindes.Pascoa.map(b => {
        return b.valor;
      })
    );
    totalBrindePascoa = QlGeralMensal.length * valorBrindePascoa;
  }

  // brinde dia das mães
  let totalBrindeDiaDasMaes = 0;
  if (mes === 5) {
    const valorBrindeDiaDasMaes = Utils.SomaArray(
      variaveis.Brindes.DiaDasMaes.map(b => {
        return b.valor;
      })
    );
    totalBrindeDiaDasMaes =
      (QlGeralMensal.filter(ql => {
        return ql.sexo === 'F' && ql.qtdFilhos > 0;
      }).length +
        variaveis.Brindes.QuantidadeExtraDiaMaes) *
      valorBrindeDiaDasMaes;
  }

  // brinde dia dos pais
  let totalBrindeDiaDosPais = 0;
  if (mes === 8) {
    const valorBrindeDiaDasMaes = Utils.SomaArray(
      variaveis.Brindes.DiaDasMaes.map(b => {
        return b.valor;
      })
    );
    totalBrindeDiaDosPais =
      QlGeralMensal.filter(ql => {
        return ql.sexo === 'M' && ql.qtdFilhos > 0;
      }).length * valorBrindeDiaDasMaes;
  }

  // brinde dia da cerveja
  let totalBrindeDiaDaCerveja = 0;
  if (mes === 8) {
    const valorBrindeDiaDaCerveja = Utils.SomaArray(
      variaveis.Brindes.DiaDaCerveja.map(b => {
        return b.valor;
      })
    );
    totalBrindeDiaDaCerveja = QlGeralMensal.length * valorBrindeDiaDaCerveja;
  }

  // brinde check de competencias
  let totalBrindeCheckCompetencias = 0;
  if (mes === 9) {
    const valorBrindeCheckCompetencias = Utils.SomaArray(
      variaveis.Brindes.CheckCompetencias.map(b => {
        return b.valor;
      })
    );

    // Considerados somente QL com 6meses ou mais de empresa
    totalBrindeCheckCompetencias =
      QlGeralMensal.filter(ql => {
        return Utils.DaysDif(ql.admissao, Utils.Mes(ano, mes) / 30 >= 6);
      }).length * valorBrindeCheckCompetencias;
  }

  // brinde Outubro rosa
  let totalBrindeOutubroRosa = 0;
  if (mes === 10) {
    const valorBrindeOutubroRosa = Utils.SomaArray(
      variaveis.Brindes.OutubroRosa.map(b => {
        return b.valor;
      })
    );
    totalBrindeOutubroRosa =
      QlGeralMensal.filter(ql => {
        return ql.sexo === 'F';
      }).length * valorBrindeOutubroRosa;
  }

  // brinde novembro azul
  let totalBrindeNovembroAzul = 0;
  if (mes === 11) {
    const valorBrindeNovembroAzul = Utils.SomaArray(
      variaveis.Brindes.NovembroAzul.map(b => {
        return b.valor;
      })
    );
    totalBrindeNovembroAzul =
      QlGeralMensal.filter(ql => {
        return ql.sexo === 'M';
      }).length * valorBrindeNovembroAzul;
  }

  // brinde Jubilados
  let totalBrindeJubilados = 0;
  // o valor das compras de brindes para jubilados setá em datas específicas
  variaveis.Brindes.Jubilados.forEach(b => {
    if (b.mesCompra === mes) {
      totalBrindeJubilados += b.valor;
    }
  });

  // brinde Boas vindas
  let totalBrindeBoasVindas = 0;
  const valorBrindeBoasVindas = Utils.SomaArray(
    variaveis.Brindes.BoasVindas.map(b => {
      return b.valor;
    })
  );
  totalBrindeBoasVindas =
    QlGeralMensal.filter(ql => {
      return ql.admissao.getTime() === Utils.Mes(ano, mes).getTime();
    }).length * valorBrindeBoasVindas;

  // brinde indicações

  let totalBrindeIndicacoes = 0;
  const valorBrindeIndicacoes = Utils.SomaArray(
    variaveis.Brindes.Indicacoes.map(b => {
      return b.valor;
    })
  );

  // Conasiderado todos os funcionários que entraram no ano.
  // multiplicado o numero de funcionarios contratados com o percentual de
  // indicados contratados e dividido esse valor por 12 para diluir no ano

  totalBrindeIndicacoes =
    (QLFinalAno.filter(ql => {
      return ql.admissao.getFullYear() === Utils.Mes(ano, mes).getFullYear();
    }).length *
      variaveis.PercentualDeIndicadosContratados *
      valorBrindeIndicacoes) /
    12;

  // Top ser humano
  let totalBrindeTopSerHumano = 0;
  let totalIngressosTopSerHumano = 0;
  if (variaveis.TopSerHumano.mes === mes) {
    const valorBrindeTopSerHumano = Utils.SomaArray(
      variaveis.Brindes.TopSerHumano.map(b => {
        return b.valor;
      })
    );

    totalBrindeTopSerHumano = valorBrindeTopSerHumano * QlGeralMensal.length;
    totalIngressosTopSerHumano =
      variaveis.TopSerHumano.valorIngresso *
      (QlGerencial.length + QlRHMesAtual.length + 2);
    // Considerado para o Top SerHumano todos os gerentes, funcionários do RG e um supervisor do RS e um de SC (Conforme Gabriele)
  }

  // GPTW
  let totalBrindeGPTW = 0;
  let totalIngressosGPTW = 0;
  let totalPeçasGPTW = 0;

  const valorBrindeGPTW = Utils.SomaArray(
    variaveis.Brindes.GPTW.filter(m => m.mes === mes).map(b => {
      return b.valor;
    })
  );

  totalBrindeGPTW = valorBrindeGPTW * QlGeralMensal.length;

  if (variaveis.GPTW.mes === mes) {
    const valorPecasGPTW = Utils.SomaArray(
      variaveis.GPTW.pecas.map(b => {
        return b.valor * b.quantidade;
      })
    );

    totalIngressosGPTW =
      variaveis.GPTW.valorIngresso *
      (QlGerencial.length + QlRHMesAtual.length + QlAreaMesAtual.length);

    totalPeçasGPTW = valorPecasGPTW;
  }

  const Resumo = {
    ReuniaoGeral: totalReuniaoGeral,
    ReuniaoNatal: totalReuniaoNatal,
    EncontroLideres: ValorEncontroLideres,
    Brindes: {
      Total:
        totalBrindeTempoCasa +
        totalBrindeAniversariantes +
        totalBrindeAniversarioDadoBier +
        totalBrindeDiaDaMulher +
        totalBrindePascoa +
        totalBrindeDiaDasMaes +
        totalBrindeDiaDosPais +
        totalBrindeDiaDaCerveja +
        totalBrindeCheckCompetencias +
        totalBrindeOutubroRosa +
        totalBrindeNovembroAzul +
        totalBrindeJubilados +
        totalBrindeBoasVindas +
        totalBrindeIndicacoes,
      TempoDeCasa: totalBrindeTempoCasa,
      Aniversariantes: totalBrindeAniversariantes,
      AniversarioDadoBier: totalBrindeAniversarioDadoBier,
      DiaDaMulher: totalBrindeDiaDaMulher,
      Pascoa: totalBrindePascoa,
      DiaDasMaes: totalBrindeDiaDasMaes,
      DiaDosPais: totalBrindeDiaDosPais,
      DiaDaCerveja: totalBrindeDiaDaCerveja,
      CheckCompetencias: totalBrindeCheckCompetencias,
      OutubroRosa: totalBrindeOutubroRosa,
      NovembroAzul: totalBrindeNovembroAzul,
      Jubilados: totalBrindeJubilados,
      BoasVindas: totalBrindeBoasVindas,
      Indicacoes: totalBrindeIndicacoes,
    },
    TopSerhumano: {
      Total: totalBrindeTopSerHumano + totalIngressosTopSerHumano,
      Brindes: totalBrindeTopSerHumano,
      Ingressos: totalIngressosTopSerHumano,
    },
    GPTW: {
      Total: totalBrindeGPTW + totalIngressosGPTW + totalPeçasGPTW,
      Brindes: totalBrindeGPTW,
      Ingressos: totalIngressosGPTW,
      Peças: totalPeçasGPTW,
    },
  };

  return {
    value: {
      Total:
        Resumo.Brindes.Total +
        Resumo.EncontroLideres +
        Resumo.ReuniaoGeral +
        Resumo.ReuniaoNatal +
        Resumo.TopSerhumano.Total +
        Resumo.GPTW.Total,
      Resumo,
      politicas,
      variaveis,
    },
  };
}
