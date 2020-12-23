/* eslint-disable no-restricted-syntax */
/* eslint-disable no-undef */
/* eslint-disable no-shadow */

import path from 'path';
import { format } from 'date-fns';
import fs from 'fs';
import Cenarios from '../../../models/SimuladorCenarios';

const xl = require('excel4node');

const percentual0cTabela = {
  font: {
    color: '#111111',
    size: 11,
  },
  numberFormat: '0.0%',
  border: {
    left: {
      style: 'thin',
      color: '#000000',
    },
    right: {
      style: 'thin',
      color: '#000000',
    },
    top: {
      style: 'thin',
      color: '#000000',
    },
    bottom: {
      style: 'thin',
      color: '#000000',
    },
  },
};

const percentual1cTabela = {
  font: {
    color: '#111111',
    size: 11,
  },
  numberFormat: '0.0%',
  border: {
    left: {
      style: 'thin',
      color: '#000000',
    },
    right: {
      style: 'thin',
      color: '#000000',
    },
    top: {
      style: 'thin',
      color: '#000000',
    },
    bottom: {
      style: 'thin',
      color: '#000000',
    },
  },
};

const estiloVolumeTabela = {
  font: {
    color: '#111111',
    size: 11,
  },
  numberFormat: '#,##0',
  border: {
    left: {
      style: 'thin',
      color: '#000000',
    },
    right: {
      style: 'thin',
      color: '#000000',
    },
    top: {
      style: 'thin',
      color: '#000000',
    },
    bottom: {
      style: 'thin',
      color: '#000000',
    },
  },
};

const dinheiroTabela = {
  font: {
    color: '#111111',
    size: 11,
  },
  numberFormat: '#,##0.00; (#,##0.00); -',
  border: {
    left: {
      style: 'thin',
      color: '#000000',
    },
    right: {
      style: 'thin',
      color: '#000000',
    },
    top: {
      style: 'thin',
      color: '#000000',
    },
    bottom: {
      style: 'thin',
      color: '#000000',
    },
  },
};

const estiloCabecalhosTabelaColuna = {
  font: {
    color: '#111111',
    size: 12,
    bold: true,
  },
  fill: {
    type: 'pattern',
    patternType: 'solid',
    bgColor: '#cccccc',
    fgColor: '#cccccc',
  },
  alignment: {
    horizontal: 'center',
  },
  border: {
    left: {
      style: 'thin',
      color: '#000000',
    },
    right: {
      style: 'thin',
      color: '#000000',
    },
    top: {
      style: 'thin',
      color: '#000000',
    },
    bottom: {
      style: 'thin',
      color: '#000000',
    },
  },
};

const estiloCabecalhosTabelaLinha = {
  font: {
    color: '#111111',
    size: 12,
    bold: true,
  },
  fill: {
    type: 'pattern',
    patternType: 'solid',
    bgColor: '#cccccc',
    fgColor: '#cccccc',
  },
  alignment: {
    horizontal: 'left',
  },
  border: {
    left: {
      style: 'thin',
      color: '#000000',
    },
    right: {
      style: 'thin',
      color: '#000000',
    },
    top: {
      style: 'thin',
      color: '#000000',
    },
    bottom: {
      style: 'thin',
      color: '#000000',
    },
  },
};

const estiloTituloTabelaLinha = {
  font: {
    color: '#ffffff',
    size: 12,
    bold: true,
  },
  fill: {
    type: 'pattern',
    patternType: 'solid',
    bgColor: '#222222',
    fgColor: '#222222',
  },
  alignment: {
    horizontal: 'center',
  },
  border: {
    left: {
      style: 'thin',
      color: '#000000',
    },
    right: {
      style: 'thin',
      color: '#000000',
    },
    top: {
      style: 'thin',
      color: '#000000',
    },
    bottom: {
      style: 'thin',
      color: '#000000',
    },
  },
};

export default async function ExportaCenario(id) {
  // caso o mes esteja 0, rodar todos os meses
  const wb = new xl.Workbook();
  const ws = wb.addWorksheet('CENARIO');
  const ws_r = wb.addWorksheet('RESUMO');

  const EPercentual0CTabela = wb.createStyle(percentual0cTabela);
  const EPercentual1CTabela = wb.createStyle(percentual1cTabela);
  const EVolumeTabela = wb.createStyle(estiloVolumeTabela);
  const EDinheiroTabela = wb.createStyle(dinheiroTabela);
  const ECabecalhoColunaTabela = wb.createStyle(estiloCabecalhosTabelaColuna);
  const ECabecalhoLinhaTabela = wb.createStyle(estiloCabecalhosTabelaLinha);
  const ETituloTabela = wb.createStyle(estiloTituloTabelaLinha);

  const cenario = await Cenarios.findOne({ where: { id } });

  const { nome: nomeCenario, json_obj } = cenario;
  ws.cell(1, 1).string('Nome cenário:').style(ETituloTabela);
  ws.cell(1, 2).string(nomeCenario).style(ECabecalhoLinhaTabela);
  ws.cell(2, 1).string('Data exportação:').style(ETituloTabela);
  ws.cell(2, 2)
    .string(format(new Date(), 'dd/MM/yyyy'))
    .style(ECabecalhoLinhaTabela);

  let linhaI = 4;

  json_obj.forEach((prod, index) => {
    const { nome: nomeProd } = prod;
    ws.cell(linhaI, 1).string('CÓDIGO').style(ETituloTabela);
    ws.cell(linhaI, 2).string(nomeProd).style(ETituloTabela);
    ws.cell(linhaI, 3).string('RS').style(ETituloTabela);
    ws.cell(linhaI, 4).string('SC').style(ETituloTabela);
    ws.cell(linhaI, 5).string('PR').style(ETituloTabela);
    const [dadosRS] = prod.estados.filter(e => e.uf === 'RS');
    const [dadosSC] = prod.estados.filter(e => e.uf === 'SC');
    const [dadosPR] = prod.estados.filter(e => e.uf === 'PR');

    const codProd = prod.cod;

    linhaI++;
    // #region Volume
    ws.cell(linhaI, 1).string(codProd).style(ECabecalhoLinhaTabela);
    ws.cell(linhaI, 2).string('Volume').style(ECabecalhoLinhaTabela);
    ws.cell(linhaI, 3)
      .number(Number(String(dadosRS.volume).split('.').join('')))
      .style(EVolumeTabela);
    ws.cell(linhaI, 4)
      .number(Number(String(dadosSC.volume).split('.').join('')))
      .style(EVolumeTabela);
    ws.cell(linhaI, 5)
      .number(Number(String(dadosPR.volume).split('.').join('')))
      .style(EVolumeTabela);
    // #endregion

    linhaI++;
    // #region Preço Médio
    ws.cell(linhaI, 1).string(codProd).style(ECabecalhoLinhaTabela);
    ws.cell(linhaI, 2).string('Preço (SKU)').style(ECabecalhoLinhaTabela);
    ws.cell(linhaI, 3)
      .number(Number(String(dadosRS.precoMed).split(',').join('.')) || 0)
      .style(EDinheiroTabela);
    ws.cell(linhaI, 4)
      .number(Number(String(dadosSC.precoMed).split(',').join('.')) || 0)
      .style(EDinheiroTabela);
    ws.cell(linhaI, 5)
      .number(Number(String(dadosPR.precoMed).split(',').join('.')) || 0)
      .style(EDinheiroTabela);
    // #endregion

    linhaI++;
    // #region Pauta
    ws.cell(linhaI, 1).string(codProd).style(ECabecalhoLinhaTabela);
    ws.cell(linhaI, 2).string('Pauta').style(ECabecalhoLinhaTabela);
    ws.cell(linhaI, 3)
      .number(dadosRS.pauta || 0)
      .style(EDinheiroTabela);
    ws.cell(linhaI, 4)
      .number(dadosSC.pauta || 0)
      .style(EDinheiroTabela);
    ws.cell(linhaI, 5)
      .number(dadosPR.pauta || 0)
      .style(EDinheiroTabela);
    // #endregion

    linhaI++;
    // #region % Atacado
    ws.cell(linhaI, 1).string(codProd).style(ECabecalhoLinhaTabela);
    ws.cell(linhaI, 2).string('% Atacado').style(ECabecalhoLinhaTabela);
    ws.cell(linhaI, 3)
      .number(dadosRS.atacadoP / 100 || 0)
      .style(EPercentual0CTabela);
    ws.cell(linhaI, 4)
      .number(dadosSC.atacadoP / 100 || 0)
      .style(EPercentual0CTabela);
    ws.cell(linhaI, 5)
      .number(dadosPR.atacadoP / 100 || 0)
      .style(EPercentual0CTabela);
    // #endregion

    linhaI++;
    // #region % Frete Direto
    ws.cell(linhaI, 1).string(codProd).style(ECabecalhoLinhaTabela);
    ws.cell(linhaI, 2).string('% Frete direto').style(ECabecalhoLinhaTabela);
    ws.cell(linhaI, 3)
      .number((100 - dadosRS.distribuicaoP) / 100 || 0)
      .style(EPercentual0CTabela);
    ws.cell(linhaI, 4)
      .number((100 - dadosSC.distribuicaoP) / 100 || 0)
      .style(EPercentual0CTabela);
    ws.cell(linhaI, 5)
      .number((100 - dadosPR.distribuicaoP) / 100 || 0)
      .style(EPercentual0CTabela);
    // #endregion

    linhaI++;
    // #region Receita Bruta
    const receitaBrutaRS =
      ((Number(String(dadosRS.precoMed).split(',').join('.')) || 0) /
        prod.volumeUnitario) *
      Number(String(dadosRS.volume).split('.').join(''));
    const receitaBrutaSC =
      ((Number(String(dadosSC.precoMed).split(',').join('.')) || 0) /
        prod.volumeUnitario) *
      Number(String(dadosSC.volume).split('.').join(''));
    const receitaBrutaPR =
      ((Number(String(dadosPR.precoMed).split(',').join('.')) || 0) /
        prod.volumeUnitario) *
      Number(String(dadosPR.volume).split('.').join(''));
    ws.cell(linhaI, 1).string(codProd).style(ECabecalhoLinhaTabela);
    ws.cell(linhaI, 2).string('Receita Bruta').style(ECabecalhoLinhaTabela);
    ws.cell(linhaI, 3)
      .number(receitaBrutaRS || 0)
      .style(EDinheiroTabela);
    ws.cell(linhaI, 4)
      .number(receitaBrutaSC || 0)
      .style(EDinheiroTabela);
    ws.cell(linhaI, 5)
      .number(receitaBrutaPR || 0)
      .style(EDinheiroTabela);
    // #endregion

    linhaI++;
    // #region ST
    ws.cell(linhaI, 1).string(codProd).style(ECabecalhoLinhaTabela);
    ws.cell(linhaI, 2).string('ST').style(ECabecalhoLinhaTabela);
    ws.cell(linhaI, 3)
      .number(
        dadosRS.impostos.valorTotal !== undefined
          ? dadosRS.impostos.valorTotal.icmsSt
          : 0
      )
      .style(EDinheiroTabela);
    ws.cell(linhaI, 4)
      .number(
        dadosSC.impostos.valorTotal !== undefined
          ? dadosSC.impostos.valorTotal.icmsSt
          : 0
      )
      .style(EDinheiroTabela);
    ws.cell(linhaI, 5)
      .number(
        dadosPR.impostos.valorTotal !== undefined
          ? dadosPR.impostos.valorTotal.icmsSt
          : 0
      )
      .style(EDinheiroTabela);
    // #endregion

    linhaI++;
    // #region FCP
    ws.cell(linhaI, 1).string(codProd).style(ECabecalhoLinhaTabela);
    ws.cell(linhaI, 2).string('ST-FCP').style(ECabecalhoLinhaTabela);
    ws.cell(linhaI, 3)
      .number(
        dadosRS.impostos.valorTotal !== undefined
          ? dadosRS.impostos.valorTotal.icmsStFCP
          : 0
      )
      .style(EDinheiroTabela);
    ws.cell(linhaI, 4)
      .number(
        dadosSC.impostos.valorTotal !== undefined
          ? dadosSC.impostos.valorTotal.icmsStFCP
          : 0
      )
      .style(EDinheiroTabela);
    ws.cell(linhaI, 5)
      .number(
        dadosPR.impostos.valorTotal !== undefined
          ? dadosPR.impostos.valorTotal.icmsStFCP
          : 0
      )
      .style(EDinheiroTabela);
    // #endregion

    linhaI++;
    // #region IPI
    ws.cell(linhaI, 1).string(codProd).style(ECabecalhoLinhaTabela);
    ws.cell(linhaI, 2).string('IPI').style(ECabecalhoLinhaTabela);
    ws.cell(linhaI, 3)
      .number(
        dadosRS.impostos.valorTotal !== undefined
          ? dadosRS.impostos.valorTotal.ipi
          : 0
      )
      .style(EDinheiroTabela);
    ws.cell(linhaI, 4)
      .number(
        dadosSC.impostos.valorTotal !== undefined
          ? dadosSC.impostos.valorTotal.ipi
          : 0
      )
      .style(EDinheiroTabela);
    ws.cell(linhaI, 5)
      .number(
        dadosPR.impostos.valorTotal !== undefined
          ? dadosPR.impostos.valorTotal.ipi
          : 0
      )
      .style(EDinheiroTabela);
    // #endregion

    linhaI++;
    // #region ICMS
    ws.cell(linhaI, 1).string(codProd).style(ECabecalhoLinhaTabela);
    ws.cell(linhaI, 2).string('ICMS').style(ECabecalhoLinhaTabela);
    ws.cell(linhaI, 3)
      .number(
        dadosRS.impostos.valorTotal !== undefined
          ? dadosRS.impostos.valorTotal.icms
          : 0
      )
      .style(EDinheiroTabela);
    ws.cell(linhaI, 4)
      .number(
        dadosSC.impostos.valorTotal !== undefined
          ? dadosSC.impostos.valorTotal.icms
          : 0
      )
      .style(EDinheiroTabela);
    ws.cell(linhaI, 5)
      .number(
        dadosPR.impostos.valorTotal !== undefined
          ? dadosPR.impostos.valorTotal.icms
          : 0
      )
      .style(EDinheiroTabela);
    // #endregion

    linhaI++;
    // #region PIS
    ws.cell(linhaI, 1).string(codProd).style(ECabecalhoLinhaTabela);
    ws.cell(linhaI, 2).string('PIS').style(ECabecalhoLinhaTabela);
    ws.cell(linhaI, 3)
      .number(
        dadosRS.impostos.valorTotal !== undefined
          ? dadosRS.impostos.valorTotal.pis
          : 0
      )
      .style(EDinheiroTabela);
    ws.cell(linhaI, 4)
      .number(
        dadosSC.impostos.valorTotal !== undefined
          ? dadosSC.impostos.valorTotal.pis
          : 0
      )
      .style(EDinheiroTabela);
    ws.cell(linhaI, 5)
      .number(
        dadosPR.impostos.valorTotal !== undefined
          ? dadosPR.impostos.valorTotal.pis
          : 0
      )
      .style(EDinheiroTabela);
    // #endregion

    linhaI++;
    // #region PIS
    ws.cell(linhaI, 1).string(codProd).style(ECabecalhoLinhaTabela);
    ws.cell(linhaI, 2).string('COFINS').style(ECabecalhoLinhaTabela);
    ws.cell(linhaI, 3)
      .number(
        dadosRS.impostos.valorTotal !== undefined
          ? dadosRS.impostos.valorTotal.cofins
          : 0
      )
      .style(EDinheiroTabela);
    ws.cell(linhaI, 4)
      .number(
        dadosSC.impostos.valorTotal !== undefined
          ? dadosSC.impostos.valorTotal.cofins
          : 0
      )
      .style(EDinheiroTabela);
    ws.cell(linhaI, 5)
      .number(
        dadosPR.impostos.valorTotal !== undefined
          ? dadosPR.impostos.valorTotal.cofins
          : 0
      )
      .style(EDinheiroTabela);
    // #endregion

    linhaI++;
    // #region Receita Liquida
    ws.cell(linhaI, 1).string(codProd).style(ECabecalhoLinhaTabela);
    ws.cell(linhaI, 2).string('Receita Líquida').style(ECabecalhoLinhaTabela);
    ws.cell(linhaI, 3)
      .formula(`C${linhaI - 7} - SUM(C${linhaI - 6} : C${linhaI - 1}) `)
      .style(EDinheiroTabela);
    ws.cell(linhaI, 4)
      .formula(`D${linhaI - 7} - SUM(D${linhaI - 6} : D${linhaI - 1}) `)
      .style(EDinheiroTabela);
    ws.cell(linhaI, 5)
      .formula(`E${linhaI - 7} - SUM(E${linhaI - 6} : E${linhaI - 1}) `)
      .style(EDinheiroTabela);
    // #endregion

    linhaI++;
    // #region cpv
    ws.cell(linhaI, 1).string(codProd).style(ECabecalhoLinhaTabela);
    ws.cell(linhaI, 2).string('CPV').style(ECabecalhoLinhaTabela);
    ws.cell(linhaI, 3)
      .number(dadosRS.custoTotal || 0)
      .style(EDinheiroTabela);
    ws.cell(linhaI, 4)
      .number(dadosSC.custoTotal || 0)
      .style(EDinheiroTabela);
    ws.cell(linhaI, 5)
      .number(dadosPR.custoTotal || 0)
      .style(EDinheiroTabela);
    // #endregion

    linhaI++;
    // #region Descontos Concedidos
    ws.cell(linhaI, 1).string(codProd).style(ECabecalhoLinhaTabela);
    ws.cell(linhaI, 2)
      .string('Descontos concedidos')
      .style(ECabecalhoLinhaTabela);
    ws.cell(linhaI, 3)
      .number(dadosRS.descConced || 0)
      .style(EDinheiroTabela);
    ws.cell(linhaI, 4)
      .number(dadosSC.descConced || 0)
      .style(EDinheiroTabela);
    ws.cell(linhaI, 5)
      .number(dadosPR.descConced || 0)
      .style(EDinheiroTabela);
    // #endregion

    linhaI++;
    // #region Marketing
    ws.cell(linhaI, 1).string(codProd).style(ECabecalhoLinhaTabela);
    ws.cell(linhaI, 2).string('Marketing').style(ECabecalhoLinhaTabela);
    ws.cell(linhaI, 3)
      .number(dadosRS.marketing || 0)
      .style(EDinheiroTabela);
    ws.cell(linhaI, 4)
      .number(dadosSC.marketing || 0)
      .style(EDinheiroTabela);
    ws.cell(linhaI, 5)
      .number(dadosPR.marketing || 0)
      .style(EDinheiroTabela);
    // #endregion

    linhaI++;
    // #region Frete
    ws.cell(linhaI, 1).string(codProd).style(ECabecalhoLinhaTabela);
    ws.cell(linhaI, 2).string('Frete').style(ECabecalhoLinhaTabela);
    ws.cell(linhaI, 3)
      .number(dadosRS.totalFrete || 0)
      .style(EDinheiroTabela);
    ws.cell(linhaI, 4)
      .number(dadosSC.totalFrete || 0)
      .style(EDinheiroTabela);
    ws.cell(linhaI, 5)
      .number(dadosPR.totalFrete || 0)
      .style(EDinheiroTabela);
    // #endregion

    linhaI++;
    // #region Margem $
    ws.cell(linhaI, 1).string(codProd).style(ECabecalhoLinhaTabela);
    ws.cell(linhaI, 2).string('Margem $').style(ECabecalhoLinhaTabela);
    ws.cell(linhaI, 3)
      .formula(`C${linhaI - 5} - SUM(C${linhaI - 4} : C${linhaI - 1}) `)
      .style(EDinheiroTabela);
    ws.cell(linhaI, 4)
      .formula(`D${linhaI - 5} - SUM(D${linhaI - 4} : D${linhaI - 1}) `)
      .style(EDinheiroTabela);
    ws.cell(linhaI, 5)
      .formula(`E${linhaI - 5} - SUM(E${linhaI - 4} : E${linhaI - 1}) `)
      .style(EDinheiroTabela);
    // #endregion

    linhaI++;
    // #region Margem %
    ws.cell(linhaI, 1).string(codProd).style(ECabecalhoLinhaTabela);
    ws.cell(linhaI, 2).string('Margem %').style(ECabecalhoLinhaTabela);
    ws.cell(linhaI, 3)
      .formula(`C${linhaI - 1} / C${linhaI - 6}`)
      .style(EPercentual1CTabela);
    ws.cell(linhaI, 4)
      .formula(`D${linhaI - 1} / D${linhaI - 6}`)
      .style(EPercentual1CTabela);
    ws.cell(linhaI, 5)
      .formula(`E${linhaI - 1} / E${linhaI - 6}`)
      .style(EPercentual1CTabela);
    // #endregion
    linhaI += 2;

    const linhaInicialResumo = index * 6 + 1;
    const distEntreItens = 21;
    const linhaVolumeInicial = 5;
    const linhaMargemValorInicial = 22;
    const linhaReceitaLiquidaInicial = 17;

    // #region Titulo
    ws_r
      .cell(linhaInicialResumo, 1, linhaInicialResumo, 5, true)
      .string(nomeProd)
      .style(ETituloTabela);
    ws_r
      .cell(linhaInicialResumo + 1, 1)
      .string('')
      .style(ECabecalhoColunaTabela);
    ws_r
      .cell(linhaInicialResumo + 1, 2)
      .string('RS')
      .style(ECabecalhoColunaTabela);
    ws_r
      .cell(linhaInicialResumo + 1, 3)
      .string('SC')
      .style(ECabecalhoColunaTabela);
    ws_r
      .cell(linhaInicialResumo + 1, 4)
      .string('PR')
      .style(ECabecalhoColunaTabela);
    ws_r
      .cell(linhaInicialResumo + 1, 5)
      .string('TOTAL')
      .style(ECabecalhoColunaTabela);
    // #endregion

    // #region Volume
    ws_r
      .cell(linhaInicialResumo + 2, 1)
      .string('VOLUME')
      .style(ECabecalhoLinhaTabela);
    ws_r
      .cell(linhaInicialResumo + 2, 2)
      .formula(`CENARIO!C${linhaVolumeInicial + distEntreItens * index}`)
      .style(EVolumeTabela);
    ws_r
      .cell(linhaInicialResumo + 2, 3)
      .formula(`CENARIO!D${linhaVolumeInicial + distEntreItens * index}`)
      .style(EVolumeTabela);
    ws_r
      .cell(linhaInicialResumo + 2, 4)
      .formula(`CENARIO!E${linhaVolumeInicial + distEntreItens * index}`)
      .style(EVolumeTabela);
    ws_r
      .cell(linhaInicialResumo + 2, 5)
      .formula(`SUM(B${linhaInicialResumo + 2}:D${linhaInicialResumo + 2})`)
      .style(EVolumeTabela);

    // #endregion

    // #region Margem $
    ws_r
      .cell(linhaInicialResumo + 3, 1)
      .string('MARGEM $')
      .style(ECabecalhoLinhaTabela);
    ws_r
      .cell(linhaInicialResumo + 3, 2)
      .formula(`CENARIO!C${linhaMargemValorInicial + distEntreItens * index}`)
      .style(EDinheiroTabela);
    ws_r
      .cell(linhaInicialResumo + 3, 3)
      .formula(`CENARIO!D${linhaMargemValorInicial + distEntreItens * index}`)
      .style(EDinheiroTabela);
    ws_r
      .cell(linhaInicialResumo + 3, 4)
      .formula(`CENARIO!E${linhaMargemValorInicial + distEntreItens * index}`)
      .style(EDinheiroTabela);
    ws_r
      .cell(linhaInicialResumo + 3, 5)
      .formula(`SUM(B${linhaInicialResumo + 3}:D${linhaInicialResumo + 3})`)
      .style(EDinheiroTabela);
    // #endregion

    // #region Margem %
    ws_r
      .cell(linhaInicialResumo + 4, 1)
      .string('MARGEM %')
      .style(ECabecalhoLinhaTabela);

    ws_r
      .cell(linhaInicialResumo + 4, 2)
      .formula(
        `CENARIO!C${
          linhaMargemValorInicial + distEntreItens * index
        }/CENARIO!C${linhaReceitaLiquidaInicial + distEntreItens * index}`
      )
      .style(EPercentual1CTabela);
    ws_r
      .cell(linhaInicialResumo + 4, 3)
      .formula(
        `CENARIO!D${
          linhaMargemValorInicial + distEntreItens * index
        }/CENARIO!D${linhaReceitaLiquidaInicial + distEntreItens * index}`
      )
      .style(EPercentual1CTabela);
    ws_r
      .cell(linhaInicialResumo + 4, 4)
      .formula(
        `CENARIO!E${
          linhaMargemValorInicial + distEntreItens * index
        }/CENARIO!E${linhaReceitaLiquidaInicial + distEntreItens * index}`
      )
      .style(EPercentual1CTabela);
    ws_r
      .cell(linhaInicialResumo + 4, 5)
      .formula(
        `SUM(CENARIO!C${
          linhaMargemValorInicial + distEntreItens * index
        }:CENARIO!E${linhaMargemValorInicial + distEntreItens * index})/
        SUM(CENARIO!C${linhaReceitaLiquidaInicial + distEntreItens * index}:
          CENARIO!E${linhaReceitaLiquidaInicial + distEntreItens * index})
        `
      )
      .style(EPercentual1CTabela);
    // #endregion
  });

  // Cria o arquivo
  const caminho = path.resolve(
    __dirname,
    '..',
    '..',
    '..',
    '..',
    '..',
    'temp',
    'uploads',
    'files',
    'cenarios'
  );

  fs.readdir(caminho, (err, files) => {
    if (err) throw err;
    for (const file of files) {
      fs.unlink(path.join(caminho, file), err => {
        if (err) throw err;
      });
    }
  });

  const agora = new Date();
  const nome = `${agora.getTime()}_Cenario.xlsx`;

  wb.write(path.join(caminho, nome));

  return `${process.env.SITE}/files/cenarios/${nome}`;
}
