import path from 'path';
import OBZ2021 from '..';

const xl = require('excel4node');

const estiloCabecalhosColuna = {
  font: {
    color: '#111111',
    size: 12,
    bold: true,
  },
  alignment: {
    horizontal: 'center',
  },
};
const estiloCabecalhosLinha = {
  font: {
    color: '#111111',
    size: 12,
    bold: true,
  },
  alignment: {
    horizontal: 'left',
  },
};
const estiloValores = {
  font: {
    color: '#111111',
    size: 11,
  },
  numberFormat: '#,##0.00; (#,##0.00); -',
};

function getMes(mes) {
  switch (mes) {
    case 1:
      return 'JAN';
    case 2:
      return 'FEV';
    case 3:
      return 'MAR';
    case 4:
      return 'ABR';
    case 5:
      return 'MAI';
    case 6:
      return 'JUN';
    case 7:
      return 'JUL';
    case 8:
      return 'AGO';
    case 9:
      return 'SET';
    case 10:
      return 'OUT';
    case 11:
      return 'NOV';
    case 12:
      return 'DEZ';
    default:
      return '';
  }
}

export default async function ExportaExcel(mes = 0) {
  // caso o mes esteja 0, rodar todos os meses
  const wb = new xl.Workbook();
  const ws = wb.addWorksheet('OBZ 2021');
  const cabecalhoColuna = wb.createStyle(estiloCabecalhosColuna);
  const cabecalhoLinha = wb.createStyle(estiloCabecalhosLinha);
  const valores = wb.createStyle(estiloValores);

  const obzz = await OBZ2021.OBZ2021_Sintetico(mes);
  const obz = obzz.Mes;

  // eslint-disable-next-line no-shadow
  obz.forEach((mes, i) => {
    if (i === 0) {
      // Desenha os cabeçalhos
      ws.cell(1, 1).string('Pacote').style(cabecalhoColuna);
      ws.cell(1, 2).string('Conta').style(cabecalhoColuna);
      ws.cell(1, 3).string('Conta contábil').style(cabecalhoColuna);
    }
    ws.cell(1, 4 + i)
      .string(getMes(mes.Mes))
      .style(cabecalhoColuna);

    const linhaInicialRH = 2;
    const { RH } = mes.OBZ.Fixos;

    RH.forEach((element, j) => {
      if (i === 0) {
        ws.cell(linhaInicialRH + j, 1)
          .string('RH')
          .style(cabecalhoLinha);
        ws.cell(linhaInicialRH + j, 2)
          .string(element.NomeConta)
          .style(cabecalhoLinha);
        ws.cell(linhaInicialRH + j, 3)
          .string(element.ContaContabil)
          .style(cabecalhoLinha);
      }
      ws.cell(linhaInicialRH + j, 4 + i)
        .number(element.Valor)
        .style(valores);
    });

    const linhaInicialTerceiros = linhaInicialRH + RH.length;
    const { Terceiros } = mes.OBZ.Fixos;

    Terceiros.forEach((element, j) => {
      if (i === 0) {
        ws.cell(linhaInicialTerceiros + j, 1)
          .string('Terceiros')
          .style(cabecalhoLinha);
        ws.cell(linhaInicialTerceiros + j, 2)
          .string(element.NomeConta)
          .style(cabecalhoLinha);
        ws.cell(linhaInicialTerceiros + j, 3)
          .string(element.ContaContabil)
          .style(cabecalhoLinha);
      }

      ws.cell(linhaInicialTerceiros + j, 4 + i)
        .number(element.Valor)
        .style(valores);
    });

    const linhaInicialDGO = linhaInicialTerceiros + Terceiros.length;
    const { DGO } = mes.OBZ.Fixos;
    DGO.forEach((element, j) => {
      if (i === 0) {
        ws.cell(linhaInicialDGO + j, 1)
          .string('DGO')
          .style(cabecalhoLinha);
        ws.cell(linhaInicialDGO + j, 2)
          .string(element.NomeConta)
          .style(cabecalhoLinha);
        ws.cell(linhaInicialDGO + j, 3)
          .string(element.ContaContabil)
          .style(cabecalhoLinha);
      }
      ws.cell(linhaInicialDGO + j, 4 + i)
        .number(element.Valor)
        .style(valores);
    });

    const linhaInicialTributos = linhaInicialDGO + DGO.length;
    const { Tributos } = mes.OBZ.Fixos;

    Tributos.forEach((element, j) => {
      if (i === 0) {
        ws.cell(linhaInicialTributos + j, 1)
          .string('Tributos')
          .style(cabecalhoLinha);
        ws.cell(linhaInicialTributos + j, 2)
          .string(element.NomeConta)
          .style(cabecalhoLinha);
        ws.cell(linhaInicialTributos + j, 3)
          .string(element.ContaContabil)
          .style(cabecalhoLinha);
      }
      ws.cell(linhaInicialTributos + j, 4 + i)
        .number(element.Valor)
        .style(valores);
    });

    const linhaInicialFinanceiro = linhaInicialTributos + Tributos.length;
    const { Financeiro } = mes.OBZ.Fixos;

    Financeiro.forEach((element, j) => {
      if (i === 0) {
        ws.cell(linhaInicialFinanceiro + j, 1)
          .string('Financeiro')
          .style(cabecalhoLinha);
        ws.cell(linhaInicialFinanceiro + j, 2)
          .string(element.NomeConta)
          .style(cabecalhoLinha);
        ws.cell(linhaInicialFinanceiro + j, 3)
          .string(element.ContaContabil)
          .style(cabecalhoLinha);
      }
      ws.cell(linhaInicialFinanceiro + j, 4 + i)
        .number(element.Valor)
        .style(valores);
    });
    const linhaInicialTI = linhaInicialFinanceiro + Financeiro.length;
    const { TI } = mes.OBZ.Fixos;
    TI.forEach((element, j) => {
      if (i === 0) {
        ws.cell(linhaInicialTI + j, 1)
          .string('TI')
          .style(cabecalhoLinha);
        ws.cell(linhaInicialTI + j, 2)
          .string(element.NomeConta)
          .style(cabecalhoLinha);
        ws.cell(linhaInicialTI + j, 3)
          .string(element.ContaContabil)
          .style(cabecalhoLinha);
      }
      ws.cell(linhaInicialTI + j, 4 + i)
        .number(element.Valor)
        .style(valores);
    });
    const linhaInicialSeguros = linhaInicialTI + TI.length;
    const { Seguros } = mes.OBZ.Fixos;

    Seguros.forEach((element, j) => {
      if (i === 0) {
        ws.cell(linhaInicialSeguros + j, 1)
          .string('Seguros')
          .style(cabecalhoLinha);
        ws.cell(linhaInicialSeguros + j, 2)
          .string(element.NomeConta)
          .style(cabecalhoLinha);
        ws.cell(linhaInicialSeguros + j, 3)
          .string(element.ContaContabil)
          .style(cabecalhoLinha);
      }
      ws.cell(linhaInicialSeguros + j, 4 + i)
        .number(element.Valor)
        .style(valores);
    });
    const linhaInicialDespForcaVendas = linhaInicialSeguros + Seguros.length;
    const { DespForcaVendas } = mes.OBZ.Fixos;
    DespForcaVendas.forEach((element, j) => {
      if (i === 0) {
        ws.cell(linhaInicialDespForcaVendas + j, 1)
          .string('Despesas com força de vendas')
          .style(cabecalhoLinha);
        ws.cell(linhaInicialDespForcaVendas + j, 2)
          .string(element.NomeConta)
          .style(cabecalhoLinha);
        ws.cell(linhaInicialDespForcaVendas + j, 3)
          .string(element.ContaContabil)
          .style(cabecalhoLinha);
      }
      ws.cell(linhaInicialDespForcaVendas + j, 4 + i)
        .number(element.Valor)
        .style(valores);
    });
    const linhaInicialOcupacao =
      linhaInicialDespForcaVendas + DespForcaVendas.length;
    const { Ocupacao } = mes.OBZ.Fixos;
    Ocupacao.forEach((element, j) => {
      if (i === 0) {
        ws.cell(linhaInicialOcupacao + j, 1)
          .string('Ocupação')
          .style(cabecalhoLinha);
        ws.cell(linhaInicialOcupacao + j, 2)
          .string(element.NomeConta)
          .style(cabecalhoLinha);
        ws.cell(linhaInicialOcupacao + j, 3)
          .string(element.ContaContabil)
          .style(cabecalhoLinha);
      }
      ws.cell(linhaInicialOcupacao + j, 4 + i)
        .number(element.Valor)
        .style(valores);
    });
  });

  const ws_r = wb.addWorksheet('OBZ 2021 RECEITAS MERC INT');

  obz.forEach((mesR, i) => {
    if (i === 0) {
      // Desenha os cabeçalhos
      ws_r.cell(1, 1).string('Pacote').style(cabecalhoColuna);
      ws_r.cell(1, 2).string('Conta').style(cabecalhoColuna);
      ws_r.cell(1, 3).string('Conta contábil').style(cabecalhoColuna);
    }
    ws_r
      .cell(1, 4 + i)
      .string(getMes(mesR.Mes))
      .style(cabecalhoColuna);

    const linhaInicialReceita = 2;
    const { Receitas } = mesR.OBZ.Fixos;
    Receitas.MercadoInterno.forEach((element, j) => {
      if (i === 0) {
        ws_r
          .cell(linhaInicialReceita + j, 1)
          .string('RECEITAS')
          .style(cabecalhoLinha);
        ws_r
          .cell(linhaInicialReceita + j, 2)
          .string(element.NomeConta)
          .style(cabecalhoLinha);
        ws_r
          .cell(linhaInicialReceita + j, 3)
          .string(element.Conta)
          .style(cabecalhoLinha);
      }
      ws_r
        .cell(linhaInicialReceita + j, 4 + i)
        .number(element.Valor)
        .style(valores);
    });
  });

  const ws_e = wb.addWorksheet('OBZ 2021 RECEITAS EXPORT');

  obz.forEach((mesE, i) => {
    if (i === 0) {
      // Desenha os cabeçalhos
      ws_e.cell(1, 1).string('Pacote').style(cabecalhoColuna);
      ws_e.cell(1, 2).string('Conta').style(cabecalhoColuna);
      ws_e.cell(1, 3).string('Conta contábil').style(cabecalhoColuna);
    }
    ws_e
      .cell(1, 4 + i)
      .string(getMes(mesE.Mes))
      .style(cabecalhoColuna);

    const linhaInicialReceita = 2;
    const { Receitas } = mesE.OBZ.Fixos;
    Receitas.Exportacoes.forEach((element, j) => {
      if (i === 0) {
        ws_e
          .cell(linhaInicialReceita + j, 1)
          .string('RECEITAS')
          .style(cabecalhoLinha);
        ws_e
          .cell(linhaInicialReceita + j, 2)
          .string(element.NomeConta)
          .style(cabecalhoLinha);
        ws_e
          .cell(linhaInicialReceita + j, 3)
          .string(element.Conta)
          .style(cabecalhoLinha);
      }
      ws_e
        .cell(linhaInicialReceita + j, 4 + i)
        .number(element.Valor)
        .style(valores);
    });
  });

  const agora = new Date();
  const nome = `${agora.getTime()}_OBZ2021.xlsx`;
  // Cria o arquivo
  wb.write(
    path.resolve(
      __dirname,
      '..',
      '..',
      '..',
      '..',
      '..',
      'temp',
      'uploads',
      'files',
      'obz',
      nome
    )
  );

  return `${process.env.SITE}/files/obz/${nome}`;
}
