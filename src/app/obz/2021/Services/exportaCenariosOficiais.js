/* eslint-disable no-unused-vars */
/* eslint-disable no-await-in-loop */
/* eslint-disable no-restricted-syntax */
/* eslint-disable no-undef */
/* eslint-disable no-shadow */

import path from 'path';
import { format } from 'date-fns';
import fs from 'fs';
import Cenarios from '../../../models/SimuladorCenarios';
import { cenarioConsiderado } from '../Calculos/Receitas/MercadoInterno';

const xl = require('excel4node');

const percentual0cTabela = {
  font: {
    color: '#111111',
    size: 11,
  },
  numberFormat: '0%',
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
const estiloTituloTabelaLinhaVerde = {
  font: {
    color: '#ffffff',
    size: 12,
    bold: true,
  },
  fill: {
    type: 'pattern',
    patternType: 'solid',
    bgColor: '#548235',
    fgColor: '#548235',
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

function getCol(numero) {
  const letras = [
    'A',
    'B',
    'C',
    'D',
    'E',
    'F',
    'G',
    'H',
    'I',
    'J',
    'K',
    'L',
    'M',
    'N',
    'O',
    'P',
    'Q',
    'R',
    'S',
    'T',
    'U',
    'V',
    'W',
    'X',
    'Y',
    'Z',
  ];

  if (Math.ceil(numero / letras.length - 1) > letras.length) {
    return '';
  }

  const letra1 =
    numero > letras.length
      ? letras[Math.ceil(numero / letras.length - 1) - 1]
      : '';

  const letra2 =
    numero <= letras.length
      ? letras[numero - 1]
      : letras[
          numero - Math.ceil(numero / letras.length - 1) * letras.length - 1
        ];
  return letra1.concat(letra2);
}
// Rowindex = 1, rowOffsets = 20, 3, 10
function LinhasSoma(rowIndex, rowOffsets, colIndex, lenght) {
  const initialRow = 23;

  let formula = 'SUM(';
  let first = true;
  for (let i = 0; i < lenght; i++) {
    if (!first) {
      formula += ',';
    }
    formula += `${getCol(colIndex)}${
      initialRow + (rowIndex - 1) + rowOffsets * i + i * 1
    }`;
    // C${linhaI - 6} : C${linhaI - 1})
    first = false;
  }
  formula += ')';

  return formula;
}

function ColunaSoma(linha, colunaInicial, offset, lenght, sequence = false) {
  let formula = 'SUM(';
  let first = true;

  if (sequence) {
    const inicial = `${getCol(colunaInicial)}${linha}`;
    const final = `${getCol(colunaInicial + offset * lenght - 1)}${linha}`;
    return `SUM(${inicial}:${final})`;
  }

  for (
    let i = colunaInicial;
    i < colunaInicial + offset * lenght;
    i += offset
  ) {
    if (!first) {
      formula += ',';
    }
    formula += `${getCol(i)}${linha}`;
    first = false;
  }
  formula += ')';

  return formula;
}

function LinhasMedia(rowIndex, rowOffsets, colIndex, lenght) {
  const initialRow = 23;

  let formula = 'AVERAGE(';

  for (let i = 0; i < lenght; i++) {
    if (i > 0) {
      formula += ',';
    }
    formula += `${getCol(colIndex)}${
      initialRow + (rowIndex - 1) + rowOffsets * i + i * 1
    }`;

    // C${linhaI - 6} : C${linhaI - 1})
  }
  formula += ')';

  return formula;
}

export default async function ExportaCenario() {
  // caso o mes esteja 0, rodar todos os meses
  const wb = new xl.Workbook();
  const ws = wb.addWorksheet('CENARIOS');

  const EPercentual0CTabela = wb.createStyle(percentual0cTabela);
  const EPercentual1CTabela = wb.createStyle(percentual1cTabela);
  const EVolumeTabela = wb.createStyle(estiloVolumeTabela);
  const EDinheiroTabela = wb.createStyle(dinheiroTabela);
  const ECabecalhoColunaTabela = wb.createStyle(estiloCabecalhosTabelaColuna);
  const ECabecalhoLinhaTabela = wb.createStyle(estiloCabecalhosTabelaLinha);
  const ETituloTabela = wb.createStyle(estiloTituloTabelaLinha);
  const ETituloTabelaTotal = wb.createStyle(estiloTituloTabelaLinhaVerde);

  const cenarios = [];

  for (const [, cenario] of cenarioConsiderado.entries()) {
    const cenarioMes = await Cenarios.findOne({
      where: { id: cenario.cenario },
    });
    const { nome, json_obj } = cenarioMes;
    cenarios.push({ nome, json_obj, mes: cenario.mes });
  }

  const colunaInicial = 3;
  const colunaOffset = 4;
  const linhainicial = 2;
  let rowOffset = 1;

  // Colocar a data de exportação do cenário
  ws.cell(1, 2)
    .string(format(new Date(), 'dd/MM/yyyy'))
    .style(ECabecalhoLinhaTabela);
  let quantProd = 0;
  cenarios.forEach((c, index) => {
    ws.cell(
      1,
      colunaInicial + index * colunaOffset,
      1,
      colunaInicial + index * colunaOffset + (colunaOffset - 1),
      true
    )
      .string(getMes(c.mes))
      .style(ETituloTabelaTotal);
    const nomeProd = 'TOTAL';
    // Colocados os titulos
    if (index === 0) {
      rowOffset = 1;
      ws.cell(linhainicial, 1).string('CÓDIGO').style(ETituloTabelaTotal);
      ws.cell(linhainicial, 2).string(nomeProd).style(ETituloTabelaTotal);
      ws.cell(linhainicial + rowOffset, 1)
        .string(nomeProd)
        .style(ECabecalhoLinhaTabela);
      ws.cell(linhainicial + rowOffset, 2)
        .string('Volume')
        .style(ECabecalhoLinhaTabela);

      rowOffset++;

      ws.cell(linhainicial + rowOffset, 1)
        .string(nomeProd)
        .style(ECabecalhoLinhaTabela);
      ws.cell(linhainicial + rowOffset, 2)
        .string('Preço (Litro)')
        .style(ECabecalhoLinhaTabela);

      rowOffset++;

      ws.cell(linhainicial + rowOffset, 1)
        .string(nomeProd)
        .style(ECabecalhoLinhaTabela);
      ws.cell(linhainicial + rowOffset, 2)
        .string('% Atacado')
        .style(ECabecalhoLinhaTabela);

      rowOffset++;

      ws.cell(linhainicial + rowOffset, 1)
        .string(nomeProd)
        .style(ECabecalhoLinhaTabela);
      ws.cell(linhainicial + rowOffset, 2)
        .string('% Frete direto')
        .style(ECabecalhoLinhaTabela);

      rowOffset++;

      ws.cell(linhainicial + rowOffset, 1)
        .string(nomeProd)
        .style(ECabecalhoLinhaTabela);
      ws.cell(linhainicial + rowOffset, 2)
        .string('Receita Bruta')
        .style(ECabecalhoLinhaTabela);

      rowOffset++;

      ws.cell(linhainicial + rowOffset, 1)
        .string(nomeProd)
        .style(ECabecalhoLinhaTabela);
      ws.cell(linhainicial + rowOffset, 2)
        .string('ST')
        .style(ECabecalhoLinhaTabela);

      rowOffset++;

      ws.cell(linhainicial + rowOffset, 1)
        .string(nomeProd)
        .style(ECabecalhoLinhaTabela);
      ws.cell(linhainicial + rowOffset, 2)
        .string('ST-FCP')
        .style(ECabecalhoLinhaTabela);

      rowOffset++;

      ws.cell(linhainicial + rowOffset, 1)
        .string(nomeProd)
        .style(ECabecalhoLinhaTabela);
      ws.cell(linhainicial + rowOffset, 2)
        .string('IPI')
        .style(ECabecalhoLinhaTabela);

      rowOffset++;

      ws.cell(linhainicial + rowOffset, 1)
        .string(nomeProd)
        .style(ECabecalhoLinhaTabela);
      ws.cell(linhainicial + rowOffset, 2)
        .string('ICMS')
        .style(ECabecalhoLinhaTabela);

      rowOffset++;

      ws.cell(linhainicial + rowOffset, 1)
        .string(nomeProd)
        .style(ECabecalhoLinhaTabela);
      ws.cell(linhainicial + rowOffset, 2)
        .string('PIS')
        .style(ECabecalhoLinhaTabela);

      rowOffset++;

      ws.cell(linhainicial + rowOffset, 1)
        .string(nomeProd)
        .style(ECabecalhoLinhaTabela);
      ws.cell(linhainicial + rowOffset, 2)
        .string('COFINS')
        .style(ECabecalhoLinhaTabela);

      rowOffset++;

      ws.cell(linhainicial + rowOffset, 1)
        .string(nomeProd)
        .style(ECabecalhoLinhaTabela);
      ws.cell(linhainicial + rowOffset, 2)
        .string('Receita Líquida')
        .style(ECabecalhoLinhaTabela);

      rowOffset++;

      ws.cell(linhainicial + rowOffset, 1)
        .string(nomeProd)
        .style(ECabecalhoLinhaTabela);
      ws.cell(linhainicial + rowOffset, 2)
        .string('CPV')
        .style(ECabecalhoLinhaTabela);

      rowOffset++;

      ws.cell(linhainicial + rowOffset, 1)
        .string(nomeProd)
        .style(ECabecalhoLinhaTabela);
      ws.cell(linhainicial + rowOffset, 2)
        .string('Descontos concedidos')
        .style(ECabecalhoLinhaTabela);

      rowOffset++;

      ws.cell(linhainicial + rowOffset, 1)
        .string(nomeProd)
        .style(ECabecalhoLinhaTabela);
      ws.cell(linhainicial + rowOffset, 2)
        .string('Marketing')
        .style(ECabecalhoLinhaTabela);

      rowOffset++;

      ws.cell(linhainicial + rowOffset, 1)
        .string(nomeProd)
        .style(ECabecalhoLinhaTabela);
      ws.cell(linhainicial + rowOffset, 2)
        .string('Frete')
        .style(ECabecalhoLinhaTabela);

      rowOffset++;

      ws.cell(linhainicial + rowOffset, 1)
        .string(nomeProd)
        .style(ECabecalhoLinhaTabela);
      ws.cell(linhainicial + rowOffset, 2)
        .string('Margem $')
        .style(ECabecalhoLinhaTabela);

      rowOffset++;

      ws.cell(linhainicial + rowOffset, 1)
        .string(nomeProd)
        .style(ECabecalhoLinhaTabela);
      ws.cell(linhainicial + rowOffset, 2)
        .string('Margem %')
        .style(ECabecalhoLinhaTabela);
    }

    ws.cell(linhainicial, colunaInicial + index * colunaOffset)
      .string('RS')
      .style(ETituloTabelaTotal);
    ws.cell(linhainicial, 1 + colunaInicial + index * colunaOffset)
      .string('SC')
      .style(ETituloTabelaTotal);
    ws.cell(linhainicial, 2 + colunaInicial + index * colunaOffset)
      .string('PR')
      .style(ETituloTabelaTotal);
    ws.cell(linhainicial, 3 + colunaInicial + index * colunaOffset)
      .string('TOTAL')
      .style(ETituloTabelaTotal);

    // Colocados as fórmulas para os totais

    quantProd = c.json_obj.length;

    let referenceOffset = rowOffset;

    // #region Totais
    // Totais estados
    for (let i = 0; i < 3; i++) {
      rowOffset = 1;
      referenceOffset = rowOffset;

      // VOLUME
      let formula = LinhasSoma(
        referenceOffset,
        20,
        colunaInicial + index * colunaOffset + i,
        quantProd
      );
      ws.cell(
        linhainicial + rowOffset,
        colunaInicial + index * colunaOffset + i
      )
        .formula(formula)
        .style(EVolumeTabela);

      rowOffset++;
      referenceOffset++;

      // pRECO mEDIO
      formula = `${getCol(colunaInicial + index * colunaOffset + i)}7/${getCol(
        colunaInicial + index * colunaOffset + i
      )}3`;
      ws.cell(
        linhainicial + rowOffset,
        colunaInicial + index * colunaOffset + i
      )
        .formula(formula)
        .style(EDinheiroTabela);

      rowOffset++;
      referenceOffset++;
      referenceOffset++;

      // ATACADO/VAREJO
      formula = LinhasMedia(
        referenceOffset,
        20,
        colunaInicial + index * colunaOffset + i,
        quantProd
      );
      ws.cell(
        linhainicial + rowOffset,
        colunaInicial + index * colunaOffset + i
      )
        .formula(formula)
        .style(EPercentual0CTabela);

      // Fretes diretos
      rowOffset++;
      referenceOffset++;
      formula = LinhasMedia(
        referenceOffset,
        20,
        colunaInicial + index * colunaOffset + i,
        quantProd
      );

      ws.cell(
        linhainicial + rowOffset,
        colunaInicial + index * colunaOffset + i
      )
        .formula(formula)
        .style(EPercentual0CTabela);

      // Receita Bruta
      rowOffset++;
      referenceOffset++;
      formula = LinhasSoma(
        referenceOffset,
        20,
        colunaInicial + index * colunaOffset + i,
        quantProd
      );

      ws.cell(
        linhainicial + rowOffset,
        colunaInicial + index * colunaOffset + i
      )
        .formula(formula)
        .style(EDinheiroTabela);

      // ST
      rowOffset++;
      referenceOffset++;
      formula = LinhasSoma(
        referenceOffset,
        20,
        colunaInicial + index * colunaOffset + i,
        quantProd
      );

      ws.cell(
        linhainicial + rowOffset,
        colunaInicial + index * colunaOffset + i
      )
        .formula(formula)
        .style(EDinheiroTabela);

      // FCP
      rowOffset++;
      referenceOffset++;
      formula = LinhasSoma(
        referenceOffset,
        20,
        colunaInicial + index * colunaOffset + i,
        quantProd
      );

      ws.cell(
        linhainicial + rowOffset,
        colunaInicial + index * colunaOffset + i
      )
        .formula(formula)
        .style(EDinheiroTabela);

      // IPI
      rowOffset++;
      referenceOffset++;
      formula = LinhasSoma(
        referenceOffset,
        20,
        colunaInicial + index * colunaOffset + i,
        quantProd
      );

      ws.cell(
        linhainicial + rowOffset,
        colunaInicial + index * colunaOffset + i
      )
        .formula(formula)
        .style(EDinheiroTabela);

      // ICMS
      rowOffset++;
      referenceOffset++;
      formula = LinhasSoma(
        referenceOffset,
        20,
        colunaInicial + index * colunaOffset + i,
        quantProd
      );

      ws.cell(
        linhainicial + rowOffset,
        colunaInicial + index * colunaOffset + i
      )
        .formula(formula)
        .style(EDinheiroTabela);

      // PIS
      rowOffset++;
      referenceOffset++;
      formula = LinhasSoma(
        referenceOffset,
        20,
        colunaInicial + index * colunaOffset + i,
        quantProd
      );

      ws.cell(
        linhainicial + rowOffset,
        colunaInicial + index * colunaOffset + i
      )
        .formula(formula)
        .style(EDinheiroTabela);

      // COFINS
      rowOffset++;
      referenceOffset++;
      formula = LinhasSoma(
        referenceOffset,
        20,
        colunaInicial + index * colunaOffset + i,
        quantProd
      );

      ws.cell(
        linhainicial + rowOffset,
        colunaInicial + index * colunaOffset + i
      )
        .formula(formula)
        .style(EDinheiroTabela);

      // Receita liquida
      rowOffset++;
      referenceOffset++;
      formula = `${getCol(colunaInicial + index * colunaOffset + i)}${
        linhainicial + rowOffset - 7
      }-SUM(${getCol(colunaInicial + index * colunaOffset + i)}${
        linhainicial + rowOffset - 6
      }:${getCol(colunaInicial + index * colunaOffset + i)}${
        linhainicial + rowOffset - 1
      })`;

      ws.cell(
        linhainicial + rowOffset,
        colunaInicial + index * colunaOffset + i
      )
        .formula(formula)
        .style(EDinheiroTabela);

      // CPV
      rowOffset++;
      referenceOffset++;
      formula = LinhasSoma(
        referenceOffset,
        20,
        colunaInicial + index * colunaOffset + i,
        quantProd
      );

      ws.cell(
        linhainicial + rowOffset,
        colunaInicial + index * colunaOffset + i
      )
        .formula(formula)
        .style(EDinheiroTabela);

      // Descontos concedidos
      rowOffset++;
      referenceOffset++;
      formula = LinhasSoma(
        referenceOffset,
        20,
        colunaInicial + index * colunaOffset + i,
        quantProd
      );

      ws.cell(
        linhainicial + rowOffset,
        colunaInicial + index * colunaOffset + i
      )
        .formula(formula)
        .style(EDinheiroTabela);

      // Marketing
      rowOffset++;
      referenceOffset++;
      formula = LinhasSoma(
        referenceOffset,
        20,
        colunaInicial + index * colunaOffset + i,
        quantProd
      );

      ws.cell(
        linhainicial + rowOffset,
        colunaInicial + index * colunaOffset + i
      )
        .formula(formula)
        .style(EDinheiroTabela);

      // frete
      rowOffset++;
      referenceOffset++;
      formula = LinhasSoma(
        referenceOffset,
        20,
        colunaInicial + index * colunaOffset + i,
        quantProd
      );

      ws.cell(
        linhainicial + rowOffset,
        colunaInicial + index * colunaOffset + i
      )
        .formula(formula)
        .style(EDinheiroTabela);

      // Margem R$
      rowOffset++;
      referenceOffset++;
      formula = `${getCol(colunaInicial + index * colunaOffset + i)}${
        linhainicial + rowOffset - 5
      }-SUM(${getCol(colunaInicial + index * colunaOffset + i)}${
        linhainicial + rowOffset - 4
      }:${getCol(colunaInicial + index * colunaOffset + i)}${
        linhainicial + rowOffset - 1
      })`;

      ws.cell(
        linhainicial + rowOffset,
        colunaInicial + index * colunaOffset + i
      )
        .formula(formula)
        .style(EDinheiroTabela);

      // Margem %
      rowOffset++;
      referenceOffset++;
      formula = `${getCol(colunaInicial + index * colunaOffset + i)}${
        linhainicial + rowOffset - 1
      }/${getCol(colunaInicial + index * colunaOffset + i)}${
        linhainicial + rowOffset - 6
      }`;

      ws.cell(
        linhainicial + rowOffset,
        colunaInicial + index * colunaOffset + i
      )
        .formula(formula)
        .style(EPercentual1CTabela);
    }

    // Total Geral
    rowOffset = 1;
    // VOLUME
    let formula = `SUM(${getCol(colunaInicial + index * colunaOffset)}${
      linhainicial + rowOffset
    }:${getCol(2 + colunaInicial + index * colunaOffset)}${
      linhainicial + rowOffset
    })`;

    ws.cell(linhainicial + rowOffset, colunaInicial + index * colunaOffset + 3)
      .formula(formula)
      .style(EVolumeTabela);

    rowOffset++;
    referenceOffset++;

    // pRECO mEDIO
    formula = `${getCol(colunaInicial + index * colunaOffset + 3)}7/${getCol(
      colunaInicial + index * colunaOffset + 3
    )}3`;
    ws.cell(linhainicial + rowOffset, colunaInicial + index * colunaOffset + 3)
      .formula(formula)
      .style(EDinheiroTabela);

    rowOffset++;
    referenceOffset++;
    referenceOffset++;

    // ATACADO/VAREJO
    ws.cell(linhainicial + rowOffset, colunaInicial + index * colunaOffset + 3)
      .number(0)
      .style(EDinheiroTabela);

    // Fretes diretos
    rowOffset++;
    referenceOffset++;

    ws.cell(linhainicial + rowOffset, colunaInicial + index * colunaOffset + 3)
      .number(0)
      .style(EDinheiroTabela);

    // Receita Bruta
    rowOffset++;
    referenceOffset++;

    formula = `SUM(${getCol(colunaInicial + index * colunaOffset)}${
      linhainicial + rowOffset
    }:${getCol(2 + colunaInicial + index * colunaOffset)}${
      linhainicial + rowOffset
    })`;

    ws.cell(linhainicial + rowOffset, colunaInicial + index * colunaOffset + 3)
      .formula(formula)
      .style(EDinheiroTabela);

    // ST
    rowOffset++;
    referenceOffset++;
    formula = `SUM(${getCol(colunaInicial + index * colunaOffset)}${
      linhainicial + rowOffset
    }:${getCol(2 + colunaInicial + index * colunaOffset)}${
      linhainicial + rowOffset
    })`;
    ws.cell(linhainicial + rowOffset, colunaInicial + index * colunaOffset + 3)
      .formula(formula)
      .style(EDinheiroTabela);

    // FCP
    rowOffset++;
    referenceOffset++;
    formula = `SUM(${getCol(colunaInicial + index * colunaOffset)}${
      linhainicial + rowOffset
    }:${getCol(2 + colunaInicial + index * colunaOffset)}${
      linhainicial + rowOffset
    })`;
    ws.cell(linhainicial + rowOffset, colunaInicial + index * colunaOffset + 3)
      .formula(formula)
      .style(EDinheiroTabela);

    // IPI
    rowOffset++;
    referenceOffset++;
    formula = `SUM(${getCol(colunaInicial + index * colunaOffset)}${
      linhainicial + rowOffset
    }:${getCol(2 + colunaInicial + index * colunaOffset)}${
      linhainicial + rowOffset
    })`;
    ws.cell(linhainicial + rowOffset, colunaInicial + index * colunaOffset + 3)
      .formula(formula)
      .style(EDinheiroTabela);

    // ICMS
    rowOffset++;
    referenceOffset++;
    formula = `SUM(${getCol(colunaInicial + index * colunaOffset)}${
      linhainicial + rowOffset
    }:${getCol(2 + colunaInicial + index * colunaOffset)}${
      linhainicial + rowOffset
    })`;
    ws.cell(linhainicial + rowOffset, colunaInicial + index * colunaOffset + 3)
      .formula(formula)
      .style(EDinheiroTabela);

    // PIS
    rowOffset++;
    referenceOffset++;
    formula = `SUM(${getCol(colunaInicial + index * colunaOffset)}${
      linhainicial + rowOffset
    }:${getCol(2 + colunaInicial + index * colunaOffset)}${
      linhainicial + rowOffset
    })`;
    ws.cell(linhainicial + rowOffset, colunaInicial + index * colunaOffset + 3)
      .formula(formula)
      .style(EDinheiroTabela);

    // COFINS
    rowOffset++;
    referenceOffset++;
    formula = `SUM(${getCol(colunaInicial + index * colunaOffset)}${
      linhainicial + rowOffset
    }:${getCol(2 + colunaInicial + index * colunaOffset)}${
      linhainicial + rowOffset
    })`;
    ws.cell(linhainicial + rowOffset, colunaInicial + index * colunaOffset + 3)
      .formula(formula)
      .style(EDinheiroTabela);

    // Receita liquida
    rowOffset++;
    referenceOffset++;
    formula = `${getCol(colunaInicial + index * colunaOffset + 3)}${
      linhainicial + rowOffset - 7
    }-SUM(${getCol(colunaInicial + index * colunaOffset + 3)}${
      linhainicial + rowOffset - 6
    }:${getCol(colunaInicial + index * colunaOffset + 3)}${
      linhainicial + rowOffset - 1
    })`;

    ws.cell(linhainicial + rowOffset, colunaInicial + index * colunaOffset + 3)
      .formula(formula)
      .style(EDinheiroTabela);

    // CPV
    rowOffset++;
    referenceOffset++;
    formula = `SUM(${getCol(colunaInicial + index * colunaOffset)}${
      linhainicial + rowOffset
    }:${getCol(2 + colunaInicial + index * colunaOffset)}${
      linhainicial + rowOffset
    })`;

    ws.cell(linhainicial + rowOffset, colunaInicial + index * colunaOffset + 3)
      .formula(formula)
      .style(EDinheiroTabela);

    // Descontos concedidos
    rowOffset++;
    referenceOffset++;
    formula = `SUM(${getCol(colunaInicial + index * colunaOffset)}${
      linhainicial + rowOffset
    }:${getCol(2 + colunaInicial + index * colunaOffset)}${
      linhainicial + rowOffset
    })`;
    ws.cell(linhainicial + rowOffset, colunaInicial + index * colunaOffset + 3)
      .formula(formula)
      .style(EDinheiroTabela);

    // Marketing
    rowOffset++;
    referenceOffset++;
    formula = `SUM(${getCol(colunaInicial + index * colunaOffset)}${
      linhainicial + rowOffset
    }:${getCol(2 + colunaInicial + index * colunaOffset)}${
      linhainicial + rowOffset
    })`;
    ws.cell(linhainicial + rowOffset, colunaInicial + index * colunaOffset + 3)
      .formula(formula)
      .style(EDinheiroTabela);

    // frete
    rowOffset++;
    referenceOffset++;
    formula = `SUM(${getCol(colunaInicial + index * colunaOffset)}${
      linhainicial + rowOffset
    }:${getCol(2 + colunaInicial + index * colunaOffset)}${
      linhainicial + rowOffset
    })`;
    ws.cell(linhainicial + rowOffset, colunaInicial + index * colunaOffset + 3)
      .formula(formula)
      .style(EDinheiroTabela);

    // Margem R$
    rowOffset++;
    referenceOffset++;
    formula = `${getCol(colunaInicial + index * colunaOffset + 3)}${
      linhainicial + rowOffset - 5
    }-SUM(${getCol(colunaInicial + index * colunaOffset + 3)}${
      linhainicial + rowOffset - 4
    }:${getCol(colunaInicial + index * colunaOffset + 3)}${
      linhainicial + rowOffset - 1
    })`;

    ws.cell(linhainicial + rowOffset, colunaInicial + index * colunaOffset + 3)
      .formula(formula)
      .style(EDinheiroTabela);

    // Margem %
    rowOffset++;
    referenceOffset++;
    formula = `${getCol(colunaInicial + index * colunaOffset + 3)}${
      linhainicial + rowOffset - 1
    }/${getCol(colunaInicial + index * colunaOffset + 3)}${
      linhainicial + rowOffset - 6
    }`;

    ws.cell(linhainicial + rowOffset, colunaInicial + index * colunaOffset + 3)
      .formula(formula)
      .style(EPercentual1CTabela);
    // #endregion

    c.json_obj.forEach((obj, i) => {
      rowOffset = 20 + i * 21;

      // #region Titulo

      ws.cell(linhainicial + rowOffset, 1)
        .string('CODIGO')
        .style(ETituloTabela);
      ws.cell(linhainicial + rowOffset, 2)
        .string(obj.nome)
        .style(ETituloTabela);

      rowOffset++;
      ws.cell(linhainicial + rowOffset, 1)
        .string(obj.cod)
        .style(ECabecalhoLinhaTabela);
      ws.cell(linhainicial + rowOffset, 2)
        .string('Volume')
        .style(ECabecalhoLinhaTabela);

      rowOffset++;

      ws.cell(linhainicial + rowOffset, 1)
        .string(obj.cod)
        .style(ECabecalhoLinhaTabela);
      ws.cell(linhainicial + rowOffset, 2)
        .string('Preço (SKU)')
        .style(ECabecalhoLinhaTabela);

      rowOffset++;

      ws.cell(linhainicial + rowOffset, 1)
        .string(obj.cod)
        .style(ECabecalhoLinhaTabela);
      ws.cell(linhainicial + rowOffset, 2)
        .string('Pauta')
        .style(ECabecalhoLinhaTabela);

      rowOffset++;

      ws.cell(linhainicial + rowOffset, 1)
        .string(obj.cod)
        .style(ECabecalhoLinhaTabela);
      ws.cell(linhainicial + rowOffset, 2)
        .string('% Atacado')
        .style(ECabecalhoLinhaTabela);

      rowOffset++;

      ws.cell(linhainicial + rowOffset, 1)
        .string(obj.cod)
        .style(ECabecalhoLinhaTabela);
      ws.cell(linhainicial + rowOffset, 2)
        .string('% Frete direto')
        .style(ECabecalhoLinhaTabela);

      rowOffset++;

      ws.cell(linhainicial + rowOffset, 1)
        .string(obj.cod)
        .style(ECabecalhoLinhaTabela);
      ws.cell(linhainicial + rowOffset, 2)
        .string('Receita Bruta')
        .style(ECabecalhoLinhaTabela);

      rowOffset++;

      ws.cell(linhainicial + rowOffset, 1)
        .string(obj.cod)
        .style(ECabecalhoLinhaTabela);
      ws.cell(linhainicial + rowOffset, 2)
        .string('ST')
        .style(ECabecalhoLinhaTabela);

      rowOffset++;

      ws.cell(linhainicial + rowOffset, 1)
        .string(obj.cod)
        .style(ECabecalhoLinhaTabela);
      ws.cell(linhainicial + rowOffset, 2)
        .string('ST-FCP')
        .style(ECabecalhoLinhaTabela);

      rowOffset++;

      ws.cell(linhainicial + rowOffset, 1)
        .string(obj.cod)
        .style(ECabecalhoLinhaTabela);
      ws.cell(linhainicial + rowOffset, 2)
        .string('IPI')
        .style(ECabecalhoLinhaTabela);

      rowOffset++;

      ws.cell(linhainicial + rowOffset, 1)
        .string(obj.cod)
        .style(ECabecalhoLinhaTabela);
      ws.cell(linhainicial + rowOffset, 2)
        .string('ICMS')
        .style(ECabecalhoLinhaTabela);

      rowOffset++;

      ws.cell(linhainicial + rowOffset, 1)
        .string(obj.cod)
        .style(ECabecalhoLinhaTabela);
      ws.cell(linhainicial + rowOffset, 2)
        .string('PIS')
        .style(ECabecalhoLinhaTabela);

      rowOffset++;

      ws.cell(linhainicial + rowOffset, 1)
        .string(obj.cod)
        .style(ECabecalhoLinhaTabela);
      ws.cell(linhainicial + rowOffset, 2)
        .string('COFINS')
        .style(ECabecalhoLinhaTabela);

      rowOffset++;

      ws.cell(linhainicial + rowOffset, 1)
        .string(obj.cod)
        .style(ECabecalhoLinhaTabela);
      ws.cell(linhainicial + rowOffset, 2)
        .string('Receita Líquida')
        .style(ECabecalhoLinhaTabela);

      rowOffset++;

      ws.cell(linhainicial + rowOffset, 1)
        .string(obj.cod)
        .style(ECabecalhoLinhaTabela);
      ws.cell(linhainicial + rowOffset, 2)
        .string('CPV')
        .style(ECabecalhoLinhaTabela);

      rowOffset++;

      ws.cell(linhainicial + rowOffset, 1)
        .string(obj.cod)
        .style(ECabecalhoLinhaTabela);
      ws.cell(linhainicial + rowOffset, 2)
        .string('Descontos concedidos')
        .style(ECabecalhoLinhaTabela);

      rowOffset++;

      ws.cell(linhainicial + rowOffset, 1)
        .string(obj.cod)
        .style(ECabecalhoLinhaTabela);
      ws.cell(linhainicial + rowOffset, 2)
        .string('Marketing')
        .style(ECabecalhoLinhaTabela);

      rowOffset++;

      ws.cell(linhainicial + rowOffset, 1)
        .string(obj.cod)
        .style(ECabecalhoLinhaTabela);
      ws.cell(linhainicial + rowOffset, 2)
        .string('Frete')
        .style(ECabecalhoLinhaTabela);

      rowOffset++;

      ws.cell(linhainicial + rowOffset, 1)
        .string(obj.cod)
        .style(ECabecalhoLinhaTabela);
      ws.cell(linhainicial + rowOffset, 2)
        .string('Margem $')
        .style(ECabecalhoLinhaTabela);

      rowOffset++;

      ws.cell(linhainicial + rowOffset, 1)
        .string(obj.cod)
        .style(ECabecalhoLinhaTabela);
      ws.cell(linhainicial + rowOffset, 2)
        .string('Margem %')
        .style(ECabecalhoLinhaTabela);
      // #endregion
      const volumeUnit = obj.volumeUnitario;
      obj.estados.forEach((est, index_est) => {
        rowOffset = 20 + i * 21;
        const coluna = 3 + index_est + index * colunaOffset;

        ws.cell(linhainicial + rowOffset, coluna)
          .string(est.uf)
          .style(ETituloTabela);

        rowOffset++;
        ws.cell(linhainicial + rowOffset, coluna)
          .number(Number(String(est.volume).split('.').join('')) || 0)
          .style(EVolumeTabela);

        rowOffset++;
        ws.cell(linhainicial + rowOffset, coluna)
          .number(Number(String(est.precoMed).split(',').join('.')) || 0)
          .style(EDinheiroTabela);

        rowOffset++;
        ws.cell(linhainicial + rowOffset, coluna)
          .number(est.pauta || 0)
          .style(EDinheiroTabela);

        rowOffset++;
        ws.cell(linhainicial + rowOffset, coluna)
          .number(est.atacadoP / 100 || 0)
          .style(EPercentual0CTabela);

        rowOffset++;
        ws.cell(linhainicial + rowOffset, coluna)
          .number(1 - est.distribuicaoP / 100 || 0)
          .style(EPercentual0CTabela);

        rowOffset++;
        ws.cell(linhainicial + rowOffset, coluna)
          .number(
            ((Number(String(est.precoMed).split(',').join('.')) || 0) /
              volumeUnit) *
              Number(String(est.volume).split('.').join('')) || 0
          )
          .style(EDinheiroTabela);

        rowOffset++;
        ws.cell(linhainicial + rowOffset, coluna)
          .number(
            est.impostos.valorTotal ? est.impostos.valorTotal.icmsSt || 0 : 0
          )
          .style(EDinheiroTabela);

        rowOffset++;
        ws.cell(linhainicial + rowOffset, coluna)
          .number(
            est.impostos.valorTotal ? est.impostos.valorTotal.icmsStFCP || 0 : 0
          )
          .style(EDinheiroTabela);

        rowOffset++;
        ws.cell(linhainicial + rowOffset, coluna)
          .number(
            est.impostos.valorTotal ? est.impostos.valorTotal.ipi || 0 : 0
          )
          .style(EDinheiroTabela);

        rowOffset++;
        ws.cell(linhainicial + rowOffset, coluna)
          .number(
            est.impostos.valorTotal ? est.impostos.valorTotal.icms || 0 : 0
          )
          .style(EDinheiroTabela);

        rowOffset++;
        ws.cell(linhainicial + rowOffset, coluna)
          .number(
            est.impostos.valorTotal ? est.impostos.valorTotal.pis || 0 : 0
          )
          .style(EDinheiroTabela);

        rowOffset++;
        ws.cell(linhainicial + rowOffset, coluna)
          .number(
            est.impostos.valorTotal ? est.impostos.valorTotal.cofins || 0 : 0
          )
          .style(EDinheiroTabela);

        rowOffset++;
        ws.cell(linhainicial + rowOffset, coluna)
          .formula(
            `${getCol(coluna)}${linhainicial + rowOffset - 7}-SUM(${getCol(
              coluna
            )}${linhainicial + rowOffset - 6}:${getCol(coluna)}${
              linhainicial + rowOffset - 1
            })`
          )
          .style(EDinheiroTabela);

        rowOffset++;
        ws.cell(linhainicial + rowOffset, coluna)
          .number(est.custoTotal || 0)
          .style(EDinheiroTabela);

        rowOffset++;
        ws.cell(linhainicial + rowOffset, coluna)
          .number(est.descConced || 0)
          .style(EDinheiroTabela);

        rowOffset++;
        ws.cell(linhainicial + rowOffset, coluna)
          .number(est.marketing || 0)
          .style(EDinheiroTabela);

        rowOffset++;
        ws.cell(linhainicial + rowOffset, coluna)
          .number(est.totalFrete || 0)
          .style(EDinheiroTabela);

        rowOffset++;
        ws.cell(linhainicial + rowOffset, coluna)
          .formula(
            `${getCol(coluna)}${linhainicial + rowOffset - 5}-SUM(${getCol(
              coluna
            )}${linhainicial + rowOffset - 4}:${getCol(coluna)}${
              linhainicial + rowOffset - 1
            })`
          )
          .style(EDinheiroTabela);

        rowOffset++;
        ws.cell(linhainicial + rowOffset, coluna)
          .formula(
            `${getCol(coluna)}${linhainicial + rowOffset - 1}/${getCol(
              coluna
            )}${linhainicial + rowOffset - 6}`
          )
          .style(EPercentual1CTabela);
      });

      rowOffset = 20 + i * 21;
      const coluna = 6 + index * colunaOffset;
      // Totais produtos
      ws.cell(linhainicial + rowOffset, coluna)
        .string('TOTAL')
        .style(ETituloTabela);

      rowOffset++;
      ws.cell(linhainicial + rowOffset, coluna)
        .formula(
          `SUM(${getCol(coluna - 3)}${linhainicial + rowOffset}:${getCol(
            coluna - 1
          )}${linhainicial + rowOffset})`
        )
        .style(EDinheiroTabela);

      rowOffset++;
      ws.cell(linhainicial + rowOffset, coluna)
        .formula(
          `${getCol(coluna)}${linhainicial + rowOffset + 4} / ${getCol(
            coluna
          )}${linhainicial + rowOffset - 1} * ${volumeUnit}`
        )
        .style(EDinheiroTabela);

      rowOffset++;
      ws.cell(linhainicial + rowOffset, coluna)
        .number(0)
        .style(EDinheiroTabela);

      rowOffset++;
      ws.cell(linhainicial + rowOffset, coluna)
        .formula(
          `(${getCol(coluna - 3)}${linhainicial + rowOffset - 3} / ${getCol(
            coluna
          )}${linhainicial + rowOffset - 3} * ${getCol(coluna - 3)}${
            linhainicial + rowOffset
          })+(${getCol(coluna - 2)}${linhainicial + rowOffset - 3} / ${getCol(
            coluna
          )}${linhainicial + rowOffset - 3} * ${getCol(coluna - 2)}${
            linhainicial + rowOffset
          })+(${getCol(coluna - 1)}${linhainicial + rowOffset - 3} / ${getCol(
            coluna
          )}${linhainicial + rowOffset - 3} * ${getCol(coluna - 1)}${
            linhainicial + rowOffset
          })`
        )
        .style(EPercentual0CTabela);

      rowOffset++;
      ws.cell(linhainicial + rowOffset, coluna)
        .formula(
          `(${getCol(coluna - 3)}${linhainicial + rowOffset - 4} / ${getCol(
            coluna
          )}${linhainicial + rowOffset - 4} * ${getCol(coluna - 3)}${
            linhainicial + rowOffset
          })+(${getCol(coluna - 2)}${linhainicial + rowOffset - 4} / ${getCol(
            coluna
          )}${linhainicial + rowOffset - 4} * ${getCol(coluna - 2)}${
            linhainicial + rowOffset
          })+(${getCol(coluna - 1)}${linhainicial + rowOffset - 4} / ${getCol(
            coluna
          )}${linhainicial + rowOffset - 4} * ${getCol(coluna - 1)}${
            linhainicial + rowOffset
          })`
        )
        .style(EPercentual0CTabela);

      rowOffset++;
      ws.cell(linhainicial + rowOffset, coluna)
        .formula(
          `SUM(${getCol(coluna - 3)}${linhainicial + rowOffset}:${getCol(
            coluna - 1
          )}${linhainicial + rowOffset})`
        )
        .style(EDinheiroTabela);

      rowOffset++;
      ws.cell(linhainicial + rowOffset, coluna)
        .formula(
          `SUM(${getCol(coluna - 3)}${linhainicial + rowOffset}:${getCol(
            coluna - 1
          )}${linhainicial + rowOffset})`
        )
        .style(EDinheiroTabela);

      rowOffset++;
      ws.cell(linhainicial + rowOffset, coluna)
        .formula(
          `SUM(${getCol(coluna - 3)}${linhainicial + rowOffset}:${getCol(
            coluna - 1
          )}${linhainicial + rowOffset})`
        )
        .style(EDinheiroTabela);

      rowOffset++;
      ws.cell(linhainicial + rowOffset, coluna)
        .formula(
          `SUM(${getCol(coluna - 3)}${linhainicial + rowOffset}:${getCol(
            coluna - 1
          )}${linhainicial + rowOffset})`
        )
        .style(EDinheiroTabela);

      rowOffset++;
      ws.cell(linhainicial + rowOffset, coluna)
        .formula(
          `SUM(${getCol(coluna - 3)}${linhainicial + rowOffset}:${getCol(
            coluna - 1
          )}${linhainicial + rowOffset})`
        )
        .style(EDinheiroTabela);

      rowOffset++;
      ws.cell(linhainicial + rowOffset, coluna)
        .formula(
          `SUM(${getCol(coluna - 3)}${linhainicial + rowOffset}:${getCol(
            coluna - 1
          )}${linhainicial + rowOffset})`
        )
        .style(EDinheiroTabela);

      rowOffset++;
      ws.cell(linhainicial + rowOffset, coluna)
        .formula(
          `SUM(${getCol(coluna - 3)}${linhainicial + rowOffset}:${getCol(
            coluna - 1
          )}${linhainicial + rowOffset})`
        )
        .style(EDinheiroTabela);

      rowOffset++;
      ws.cell(linhainicial + rowOffset, coluna)
        .formula(
          `${getCol(coluna)}${linhainicial + rowOffset - 7} - SUM(${getCol(
            coluna
          )}${linhainicial + rowOffset - 6}:${getCol(coluna)}${
            linhainicial + rowOffset - 1
          })`
        )
        .style(EDinheiroTabela);

      rowOffset++;
      ws.cell(linhainicial + rowOffset, coluna)
        .formula(
          `SUM(${getCol(coluna - 3)}${linhainicial + rowOffset}:${getCol(
            coluna - 1
          )}${linhainicial + rowOffset})`
        )
        .style(EDinheiroTabela);

      rowOffset++;
      ws.cell(linhainicial + rowOffset, coluna)
        .formula(
          `SUM(${getCol(coluna - 3)}${linhainicial + rowOffset}:${getCol(
            coluna - 1
          )}${linhainicial + rowOffset})`
        )
        .style(EDinheiroTabela);

      rowOffset++;
      ws.cell(linhainicial + rowOffset, coluna)
        .formula(
          `SUM(${getCol(coluna - 3)}${linhainicial + rowOffset}:${getCol(
            coluna - 1
          )}${linhainicial + rowOffset})`
        )
        .style(EDinheiroTabela);

      rowOffset++;
      ws.cell(linhainicial + rowOffset, coluna)
        .formula(
          `SUM(${getCol(coluna - 3)}${linhainicial + rowOffset}:${getCol(
            coluna - 1
          )}${linhainicial + rowOffset})`
        )
        .style(EDinheiroTabela);

      rowOffset++;
      ws.cell(linhainicial + rowOffset, coluna)
        .formula(
          `${getCol(coluna)}${linhainicial + rowOffset - 5} - SUM(${getCol(
            coluna
          )}${linhainicial + rowOffset - 4}:${getCol(coluna)}${
            linhainicial + rowOffset - 1
          })`
        )
        .style(EDinheiroTabela);

      rowOffset++;
      ws.cell(linhainicial + rowOffset, coluna)
        .formula(
          `${getCol(coluna)}${linhainicial + rowOffset - 1} /${getCol(coluna)}${
            linhainicial + rowOffset - 6
          }`
        )
        .style(EPercentual1CTabela);
    });
  });

  // Criar os totais
  const colunaInicialTotais = 3 + 4 * 12;
  const totalProdutos = cenarios[0].json_obj.length;

  // Totais gerais
  let referenceOffset = 0;

  ws.cell(1, colunaInicialTotais, 1, colunaInicialTotais + 3, true)
    .string('TOTAL ANO')
    .style(ETituloTabelaTotal);

  ws.cell(2, colunaInicialTotais).string('RS').style(ETituloTabelaTotal);
  ws.cell(2, colunaInicialTotais + 1)
    .string('SC')
    .style(ETituloTabelaTotal);
  ws.cell(2, colunaInicialTotais + 2)
    .string('PR')
    .style(ETituloTabelaTotal);
  ws.cell(2, colunaInicialTotais + 3)
    .string('TOTAL')
    .style(ETituloTabelaTotal);

  for (let i = 0; i < 3; i++) {
    rowOffset = 1;
    referenceOffset = rowOffset;

    // VOLUME
    let formula = LinhasSoma(
      referenceOffset,
      20,
      colunaInicialTotais + i,
      totalProdutos
    );
    ws.cell(linhainicial + rowOffset, colunaInicialTotais + i)
      .formula(formula)
      .style(EVolumeTabela);

    rowOffset++;
    referenceOffset++;

    // pRECO mEDIO
    formula = `${getCol(colunaInicialTotais + i)}7/${getCol(
      colunaInicialTotais + i
    )}3`;
    ws.cell(linhainicial + rowOffset, colunaInicialTotais + i)
      .formula(formula)
      .style(EDinheiroTabela);

    rowOffset++;
    referenceOffset++;
    referenceOffset++;

    // ATACADO/VAREJO
    formula = LinhasMedia(
      referenceOffset,
      20,
      colunaInicialTotais + i,
      totalProdutos
    );
    ws.cell(linhainicial + rowOffset, colunaInicialTotais + i)
      .formula(formula)
      .style(EPercentual1CTabela);

    // Fretes diretos
    rowOffset++;
    referenceOffset++;
    formula = LinhasMedia(
      referenceOffset,
      20,
      colunaInicialTotais + i,
      totalProdutos
    );

    ws.cell(linhainicial + rowOffset, colunaInicialTotais + i)
      .formula(formula)
      .style(EPercentual1CTabela);

    // Receita Bruta
    rowOffset++;
    referenceOffset++;
    formula = LinhasSoma(
      referenceOffset,
      20,
      colunaInicialTotais + i,
      totalProdutos
    );

    ws.cell(linhainicial + rowOffset, colunaInicialTotais + i)
      .formula(formula)
      .style(EDinheiroTabela);

    // ST
    rowOffset++;
    referenceOffset++;
    formula = LinhasSoma(
      referenceOffset,
      20,
      colunaInicialTotais + i,
      totalProdutos
    );

    ws.cell(linhainicial + rowOffset, colunaInicialTotais + i)
      .formula(formula)
      .style(EDinheiroTabela);

    // FCP
    rowOffset++;
    referenceOffset++;
    formula = LinhasSoma(
      referenceOffset,
      20,
      colunaInicialTotais + i,
      totalProdutos
    );

    ws.cell(linhainicial + rowOffset, colunaInicialTotais + i)
      .formula(formula)
      .style(EDinheiroTabela);

    // IPI
    rowOffset++;
    referenceOffset++;
    formula = LinhasSoma(
      referenceOffset,
      20,
      colunaInicialTotais + i,
      totalProdutos
    );

    ws.cell(linhainicial + rowOffset, colunaInicialTotais + i)
      .formula(formula)
      .style(EDinheiroTabela);

    // ICMS
    rowOffset++;
    referenceOffset++;
    formula = LinhasSoma(
      referenceOffset,
      20,
      colunaInicialTotais + i,
      totalProdutos
    );

    ws.cell(linhainicial + rowOffset, colunaInicialTotais + i)
      .formula(formula)
      .style(EDinheiroTabela);

    // PIS
    rowOffset++;
    referenceOffset++;
    formula = LinhasSoma(
      referenceOffset,
      20,
      colunaInicialTotais + i,
      totalProdutos
    );

    ws.cell(linhainicial + rowOffset, colunaInicialTotais + i)
      .formula(formula)
      .style(EDinheiroTabela);

    // COFINS
    rowOffset++;
    referenceOffset++;
    formula = LinhasSoma(
      referenceOffset,
      20,
      colunaInicialTotais + i,
      totalProdutos
    );

    ws.cell(linhainicial + rowOffset, colunaInicialTotais + i)
      .formula(formula)
      .style(EDinheiroTabela);

    // Receita liquida
    rowOffset++;
    referenceOffset++;
    formula = `${getCol(colunaInicialTotais + i)}${
      linhainicial + rowOffset - 7
    }-SUM(${getCol(colunaInicialTotais + i)}${
      linhainicial + rowOffset - 6
    }:${getCol(colunaInicialTotais + i)}${linhainicial + rowOffset - 1})`;

    ws.cell(linhainicial + rowOffset, colunaInicialTotais + i)
      .formula(formula)
      .style(EDinheiroTabela);

    // CPV
    rowOffset++;
    referenceOffset++;
    formula = LinhasSoma(
      referenceOffset,
      20,
      colunaInicialTotais + i,
      totalProdutos
    );

    ws.cell(linhainicial + rowOffset, colunaInicialTotais + i)
      .formula(formula)
      .style(EDinheiroTabela);

    // Descontos concedidos
    rowOffset++;
    referenceOffset++;
    formula = LinhasSoma(
      referenceOffset,
      20,
      colunaInicialTotais + i,
      totalProdutos
    );

    ws.cell(linhainicial + rowOffset, colunaInicialTotais + i)
      .formula(formula)
      .style(EDinheiroTabela);

    // Marketing
    rowOffset++;
    referenceOffset++;
    formula = LinhasSoma(
      referenceOffset,
      20,
      colunaInicialTotais + i,
      totalProdutos
    );

    ws.cell(linhainicial + rowOffset, colunaInicialTotais + i)
      .formula(formula)
      .style(EDinheiroTabela);

    // frete
    rowOffset++;
    referenceOffset++;
    formula = LinhasSoma(
      referenceOffset,
      20,
      colunaInicialTotais + i,
      totalProdutos
    );

    ws.cell(linhainicial + rowOffset, colunaInicialTotais + i)
      .formula(formula)
      .style(EDinheiroTabela);

    // Margem R$
    rowOffset++;
    referenceOffset++;
    formula = `${getCol(colunaInicialTotais + i)}${
      linhainicial + rowOffset - 5
    }-SUM(${getCol(colunaInicialTotais + i)}${
      linhainicial + rowOffset - 4
    }:${getCol(colunaInicialTotais + i)}${linhainicial + rowOffset - 1})`;

    ws.cell(linhainicial + rowOffset, colunaInicialTotais + i)
      .formula(formula)
      .style(EDinheiroTabela);

    // Margem %
    rowOffset++;
    referenceOffset++;
    formula = `${getCol(colunaInicialTotais + i)}${
      linhainicial + rowOffset - 1
    }/${getCol(colunaInicialTotais + i)}${linhainicial + rowOffset - 6}`;

    ws.cell(linhainicial + rowOffset, colunaInicialTotais + i)
      .formula(formula)
      .style(EPercentual1CTabela);
  }

  // Total Geral
  rowOffset = 1;
  // VOLUME
  let formula = `SUM(${getCol(colunaInicialTotais)}${
    linhainicial + rowOffset
  }:${getCol(2 + colunaInicialTotais)}${linhainicial + rowOffset})`;

  ws.cell(linhainicial + rowOffset, colunaInicialTotais + 3)
    .formula(formula)
    .style(EVolumeTabela);

  rowOffset++;
  referenceOffset++;

  // pRECO mEDIO
  formula = `${getCol(colunaInicialTotais + 3)}7/${getCol(
    colunaInicialTotais + 3
  )}3`;
  ws.cell(linhainicial + rowOffset, colunaInicialTotais + 3)
    .formula(formula)
    .style(EDinheiroTabela);

  rowOffset++;
  referenceOffset++;
  referenceOffset++;

  // ATACADO/VAREJO
  ws.cell(linhainicial + rowOffset, colunaInicialTotais + 3)
    .formula(
      `(${getCol(colunaInicialTotais)}${linhainicial + rowOffset - 2}/${getCol(
        colunaInicialTotais + 3
      )}${linhainicial + rowOffset - 2} * ${getCol(colunaInicialTotais)}${
        linhainicial + rowOffset
      })+
      (${getCol(colunaInicialTotais + 1)}${
        linhainicial + rowOffset - 2
      }/${getCol(colunaInicialTotais + 3)}${
        linhainicial + rowOffset - 2
      } * ${getCol(colunaInicialTotais + 1)}${linhainicial + rowOffset})+
      (${getCol(colunaInicialTotais + 2)}${
        linhainicial + rowOffset - 2
      }/${getCol(colunaInicialTotais + 3)}${
        linhainicial + rowOffset - 2
      } * ${getCol(colunaInicialTotais + 2)}${linhainicial + rowOffset})`
    )
    .style(EPercentual0CTabela);

  // Fretes diretos
  rowOffset++;
  referenceOffset++;

  ws.cell(linhainicial + rowOffset, colunaInicialTotais + 3)
    .formula(
      `(${getCol(colunaInicialTotais)}${linhainicial + rowOffset - 3}/${getCol(
        colunaInicialTotais + 3
      )}${linhainicial + rowOffset - 3} * ${getCol(colunaInicialTotais)}${
        linhainicial + rowOffset
      })+
    (${getCol(colunaInicialTotais + 1)}${linhainicial + rowOffset - 3}/${getCol(
        colunaInicialTotais + 3
      )}${linhainicial + rowOffset - 3} * ${getCol(colunaInicialTotais + 1)}${
        linhainicial + rowOffset
      })+
    (${getCol(colunaInicialTotais + 2)}${linhainicial + rowOffset - 3}/${getCol(
        colunaInicialTotais + 3
      )}${linhainicial + rowOffset - 3} * ${getCol(colunaInicialTotais + 2)}${
        linhainicial + rowOffset
      })`
    )
    .style(EPercentual0CTabela);

  // Receita Bruta
  rowOffset++;
  referenceOffset++;

  formula = `SUM(${getCol(colunaInicialTotais)}${
    linhainicial + rowOffset
  }:${getCol(2 + colunaInicialTotais)}${linhainicial + rowOffset})`;

  ws.cell(linhainicial + rowOffset, colunaInicialTotais + 3)
    .formula(formula)
    .style(EDinheiroTabela);

  // ST
  rowOffset++;
  referenceOffset++;
  formula = `SUM(${getCol(colunaInicialTotais)}${
    linhainicial + rowOffset
  }:${getCol(2 + colunaInicialTotais)}${linhainicial + rowOffset})`;
  ws.cell(linhainicial + rowOffset, colunaInicialTotais + 3)
    .formula(formula)
    .style(EDinheiroTabela);

  // FCP
  rowOffset++;
  referenceOffset++;
  formula = `SUM(${getCol(colunaInicialTotais)}${
    linhainicial + rowOffset
  }:${getCol(2 + colunaInicialTotais)}${linhainicial + rowOffset})`;
  ws.cell(linhainicial + rowOffset, colunaInicialTotais + 3)
    .formula(formula)
    .style(EDinheiroTabela);

  // IPI
  rowOffset++;
  referenceOffset++;
  formula = `SUM(${getCol(colunaInicialTotais)}${
    linhainicial + rowOffset
  }:${getCol(2 + colunaInicialTotais)}${linhainicial + rowOffset})`;
  ws.cell(linhainicial + rowOffset, colunaInicialTotais + 3)
    .formula(formula)
    .style(EDinheiroTabela);

  // ICMS
  rowOffset++;
  referenceOffset++;
  formula = `SUM(${getCol(colunaInicialTotais)}${
    linhainicial + rowOffset
  }:${getCol(2 + colunaInicialTotais)}${linhainicial + rowOffset})`;
  ws.cell(linhainicial + rowOffset, colunaInicialTotais + 3)
    .formula(formula)
    .style(EDinheiroTabela);

  // PIS
  rowOffset++;
  referenceOffset++;
  formula = `SUM(${getCol(colunaInicialTotais)}${
    linhainicial + rowOffset
  }:${getCol(2 + colunaInicialTotais)}${linhainicial + rowOffset})`;
  ws.cell(linhainicial + rowOffset, colunaInicialTotais + 3)
    .formula(formula)
    .style(EDinheiroTabela);

  // COFINS
  rowOffset++;
  referenceOffset++;
  formula = `SUM(${getCol(colunaInicialTotais)}${
    linhainicial + rowOffset
  }:${getCol(2 + colunaInicialTotais)}${linhainicial + rowOffset})`;
  ws.cell(linhainicial + rowOffset, colunaInicialTotais + 3)
    .formula(formula)
    .style(EDinheiroTabela);

  // Receita liquida
  rowOffset++;
  referenceOffset++;
  formula = `${getCol(colunaInicialTotais + 3)}${
    linhainicial + rowOffset - 7
  }-SUM(${getCol(colunaInicialTotais + 3)}${
    linhainicial + rowOffset - 6
  }:${getCol(colunaInicialTotais + 3)}${linhainicial + rowOffset - 1})`;

  ws.cell(linhainicial + rowOffset, colunaInicialTotais + 3)
    .formula(formula)
    .style(EDinheiroTabela);

  // CPV
  rowOffset++;
  referenceOffset++;
  formula = `SUM(${getCol(colunaInicialTotais)}${
    linhainicial + rowOffset
  }:${getCol(2 + colunaInicialTotais)}${linhainicial + rowOffset})`;

  ws.cell(linhainicial + rowOffset, colunaInicialTotais + 3)
    .formula(formula)
    .style(EDinheiroTabela);

  // Descontos concedidos
  rowOffset++;
  referenceOffset++;
  formula = `SUM(${getCol(colunaInicialTotais)}${
    linhainicial + rowOffset
  }:${getCol(2 + colunaInicialTotais)}${linhainicial + rowOffset})`;
  ws.cell(linhainicial + rowOffset, colunaInicialTotais + 3)
    .formula(formula)
    .style(EDinheiroTabela);

  // Marketing
  rowOffset++;
  referenceOffset++;
  formula = `SUM(${getCol(colunaInicialTotais)}${
    linhainicial + rowOffset
  }:${getCol(2 + colunaInicialTotais)}${linhainicial + rowOffset})`;
  ws.cell(linhainicial + rowOffset, colunaInicialTotais + 3)
    .formula(formula)
    .style(EDinheiroTabela);

  // frete
  rowOffset++;
  referenceOffset++;
  formula = `SUM(${getCol(colunaInicialTotais)}${
    linhainicial + rowOffset
  }:${getCol(2 + colunaInicialTotais)}${linhainicial + rowOffset})`;
  ws.cell(linhainicial + rowOffset, colunaInicialTotais + 3)
    .formula(formula)
    .style(EDinheiroTabela);

  // Margem R$
  rowOffset++;
  referenceOffset++;
  formula = `${getCol(colunaInicialTotais + 3)}${
    linhainicial + rowOffset - 5
  }-SUM(${getCol(colunaInicialTotais + 3)}${
    linhainicial + rowOffset - 4
  }:${getCol(colunaInicialTotais + 3)}${linhainicial + rowOffset - 1})`;

  ws.cell(linhainicial + rowOffset, colunaInicialTotais + 3)
    .formula(formula)
    .style(EDinheiroTabela);

  // Margem %
  rowOffset++;
  referenceOffset++;
  formula = `${getCol(colunaInicialTotais + 3)}${
    linhainicial + rowOffset - 1
  }/${getCol(colunaInicialTotais + 3)}${linhainicial + rowOffset - 6}`;

  ws.cell(linhainicial + rowOffset, colunaInicialTotais + 3)
    .formula(formula)
    .style(EPercentual1CTabela);

  // tOTAL GERAL PRODUTOS

  const prodOffset = 21;

  for (let indexP = 0; indexP < totalProdutos; indexP++) {
    const volumeProd = cenarios[0].json_obj[indexP].volumeUnitario || 0;
    rowOffset = 20;
    let linhaInicialProduto = linhainicial + rowOffset + prodOffset * indexP;
    ws.cell(linhaInicialProduto, colunaInicialTotais)
      .string('RS')
      .style(ETituloTabelaTotal);
    ws.cell(linhaInicialProduto, colunaInicialTotais + 1)
      .string('SC')
      .style(ETituloTabelaTotal);
    ws.cell(linhaInicialProduto, colunaInicialTotais + 2)
      .string('PR')
      .style(ETituloTabelaTotal);
    ws.cell(linhaInicialProduto, colunaInicialTotais + 3)
      .string('TOTAL')
      .style(ETituloTabelaTotal);

    linhaInicialProduto++;

    // VOLUME
    ws.cell(linhaInicialProduto, colunaInicialTotais)
      .formula(ColunaSoma(linhaInicialProduto, 3, 4, 12))
      .style(EVolumeTabela);
    ws.cell(linhaInicialProduto, colunaInicialTotais + 1)
      .formula(ColunaSoma(linhaInicialProduto, 4, 4, 12))
      .style(EVolumeTabela);
    ws.cell(linhaInicialProduto, colunaInicialTotais + 2)
      .formula(ColunaSoma(linhaInicialProduto, 5, 4, 12))
      .style(EVolumeTabela);
    ws.cell(linhaInicialProduto, colunaInicialTotais + 3)
      .formula(ColunaSoma(linhaInicialProduto, colunaInicialTotais, 1, 3, true))
      .style(EVolumeTabela);

    linhaInicialProduto++;
    // PREÇO MÉDIO
    ws.cell(linhaInicialProduto, colunaInicialTotais)
      .formula(
        `${getCol(colunaInicialTotais)}${linhaInicialProduto + 4} / ${getCol(
          colunaInicialTotais
        )}${linhaInicialProduto - 1} * ${volumeProd}`
      )
      .style(EDinheiroTabela);
    ws.cell(linhaInicialProduto, colunaInicialTotais + 1)
      .formula(
        `${getCol(colunaInicialTotais + 1)}${
          linhaInicialProduto + 4
        } / ${getCol(colunaInicialTotais + 1)}${
          linhaInicialProduto - 1
        } * ${volumeProd}`
      )
      .style(EDinheiroTabela);
    ws.cell(linhaInicialProduto, colunaInicialTotais + 2)
      .formula(
        `${getCol(colunaInicialTotais + 2)}${
          linhaInicialProduto + 4
        } / ${getCol(colunaInicialTotais + 2)}${
          linhaInicialProduto - 1
        } * ${volumeProd}`
      )
      .style(EDinheiroTabela);
    ws.cell(linhaInicialProduto, colunaInicialTotais + 3)
      .formula(
        `${getCol(colunaInicialTotais + 3)}${
          linhaInicialProduto + 4
        } / ${getCol(colunaInicialTotais + 3)}${
          linhaInicialProduto - 1
        } * ${volumeProd}`
      )
      .style(EDinheiroTabela);

    linhaInicialProduto++;

    // pauta
    ws.cell(linhaInicialProduto, colunaInicialTotais)
      .number(0)
      .style(EDinheiroTabela);
    ws.cell(linhaInicialProduto, colunaInicialTotais + 1)
      .number(0)
      .style(EDinheiroTabela);
    ws.cell(linhaInicialProduto, colunaInicialTotais + 2)
      .number(0)
      .style(EDinheiroTabela);
    ws.cell(linhaInicialProduto, colunaInicialTotais + 3)
      .number(0)
      .style(EDinheiroTabela);

    linhaInicialProduto++;
    // Atacado
    ws.cell(linhaInicialProduto, colunaInicialTotais)
      .number(0)
      .style(EPercentual0CTabela);
    ws.cell(linhaInicialProduto, colunaInicialTotais + 1)
      .number(0)
      .style(EPercentual0CTabela);
    ws.cell(linhaInicialProduto, colunaInicialTotais + 2)
      .number(0)
      .style(EPercentual0CTabela);
    ws.cell(linhaInicialProduto, colunaInicialTotais + 3)
      .number(0)
      .style(EPercentual0CTabela);

    linhaInicialProduto++;
    // Fretes %
    ws.cell(linhaInicialProduto, colunaInicialTotais)
      .number(0)
      .style(EPercentual0CTabela);
    ws.cell(linhaInicialProduto, colunaInicialTotais + 1)
      .number(0)
      .style(EPercentual0CTabela);
    ws.cell(linhaInicialProduto, colunaInicialTotais + 2)
      .number(0)
      .style(EPercentual0CTabela);
    ws.cell(linhaInicialProduto, colunaInicialTotais + 3)
      .number(0)
      .style(EPercentual0CTabela);

    // Receita Bruta
    linhaInicialProduto++;
    ws.cell(linhaInicialProduto, colunaInicialTotais)
      .formula(ColunaSoma(linhaInicialProduto, 3, 4, 12))
      .style(EDinheiroTabela);
    ws.cell(linhaInicialProduto, colunaInicialTotais + 1)
      .formula(ColunaSoma(linhaInicialProduto, 4, 4, 12))
      .style(EDinheiroTabela);
    ws.cell(linhaInicialProduto, colunaInicialTotais + 2)
      .formula(ColunaSoma(linhaInicialProduto, 5, 4, 12))
      .style(EDinheiroTabela);
    ws.cell(linhaInicialProduto, colunaInicialTotais + 3)
      .formula(ColunaSoma(linhaInicialProduto, colunaInicialTotais, 1, 3, true))
      .style(EDinheiroTabela);

    // ST
    linhaInicialProduto++;
    ws.cell(linhaInicialProduto, colunaInicialTotais)
      .formula(ColunaSoma(linhaInicialProduto, 3, 4, 12))
      .style(EDinheiroTabela);
    ws.cell(linhaInicialProduto, colunaInicialTotais + 1)
      .formula(ColunaSoma(linhaInicialProduto, 4, 4, 12))
      .style(EDinheiroTabela);
    ws.cell(linhaInicialProduto, colunaInicialTotais + 2)
      .formula(ColunaSoma(linhaInicialProduto, 5, 4, 12))
      .style(EDinheiroTabela);
    ws.cell(linhaInicialProduto, colunaInicialTotais + 3)
      .formula(ColunaSoma(linhaInicialProduto, colunaInicialTotais, 1, 3, true))
      .style(EDinheiroTabela);

    // FCP
    linhaInicialProduto++;
    ws.cell(linhaInicialProduto, colunaInicialTotais)
      .formula(ColunaSoma(linhaInicialProduto, 3, 4, 12))
      .style(EDinheiroTabela);
    ws.cell(linhaInicialProduto, colunaInicialTotais + 1)
      .formula(ColunaSoma(linhaInicialProduto, 4, 4, 12))
      .style(EDinheiroTabela);
    ws.cell(linhaInicialProduto, colunaInicialTotais + 2)
      .formula(ColunaSoma(linhaInicialProduto, 5, 4, 12))
      .style(EDinheiroTabela);
    ws.cell(linhaInicialProduto, colunaInicialTotais + 3)
      .formula(ColunaSoma(linhaInicialProduto, colunaInicialTotais, 1, 3, true))
      .style(EDinheiroTabela);

    // IPI
    linhaInicialProduto++;
    ws.cell(linhaInicialProduto, colunaInicialTotais)
      .formula(ColunaSoma(linhaInicialProduto, 3, 4, 12))
      .style(EDinheiroTabela);
    ws.cell(linhaInicialProduto, colunaInicialTotais + 1)
      .formula(ColunaSoma(linhaInicialProduto, 4, 4, 12))
      .style(EDinheiroTabela);
    ws.cell(linhaInicialProduto, colunaInicialTotais + 2)
      .formula(ColunaSoma(linhaInicialProduto, 5, 4, 12))
      .style(EDinheiroTabela);
    ws.cell(linhaInicialProduto, colunaInicialTotais + 3)
      .formula(ColunaSoma(linhaInicialProduto, colunaInicialTotais, 1, 3, true))
      .style(EDinheiroTabela);

    // ICMS
    linhaInicialProduto++;
    ws.cell(linhaInicialProduto, colunaInicialTotais)
      .formula(ColunaSoma(linhaInicialProduto, 3, 4, 12))
      .style(EDinheiroTabela);
    ws.cell(linhaInicialProduto, colunaInicialTotais + 1)
      .formula(ColunaSoma(linhaInicialProduto, 4, 4, 12))
      .style(EDinheiroTabela);
    ws.cell(linhaInicialProduto, colunaInicialTotais + 2)
      .formula(ColunaSoma(linhaInicialProduto, 5, 4, 12))
      .style(EDinheiroTabela);
    ws.cell(linhaInicialProduto, colunaInicialTotais + 3)
      .formula(ColunaSoma(linhaInicialProduto, colunaInicialTotais, 1, 3, true))
      .style(EDinheiroTabela);

    // PIS
    linhaInicialProduto++;
    ws.cell(linhaInicialProduto, colunaInicialTotais)
      .formula(ColunaSoma(linhaInicialProduto, 3, 4, 12))
      .style(EDinheiroTabela);
    ws.cell(linhaInicialProduto, colunaInicialTotais + 1)
      .formula(ColunaSoma(linhaInicialProduto, 4, 4, 12))
      .style(EDinheiroTabela);
    ws.cell(linhaInicialProduto, colunaInicialTotais + 2)
      .formula(ColunaSoma(linhaInicialProduto, 5, 4, 12))
      .style(EDinheiroTabela);
    ws.cell(linhaInicialProduto, colunaInicialTotais + 3)
      .formula(ColunaSoma(linhaInicialProduto, colunaInicialTotais, 1, 3, true))
      .style(EDinheiroTabela);

    // COFINS
    linhaInicialProduto++;
    ws.cell(linhaInicialProduto, colunaInicialTotais)
      .formula(ColunaSoma(linhaInicialProduto, 3, 4, 12))
      .style(EDinheiroTabela);
    ws.cell(linhaInicialProduto, colunaInicialTotais + 1)
      .formula(ColunaSoma(linhaInicialProduto, 4, 4, 12))
      .style(EDinheiroTabela);
    ws.cell(linhaInicialProduto, colunaInicialTotais + 2)
      .formula(ColunaSoma(linhaInicialProduto, 5, 4, 12))
      .style(EDinheiroTabela);
    ws.cell(linhaInicialProduto, colunaInicialTotais + 3)
      .formula(ColunaSoma(linhaInicialProduto, colunaInicialTotais, 1, 3, true))
      .style(EDinheiroTabela);

    //  RECEITA LIQUIDA
    linhaInicialProduto++;
    ws.cell(linhaInicialProduto, colunaInicialTotais)
      .formula(
        `${getCol(colunaInicialTotais)}${
          linhaInicialProduto - 7
        } - SUM(${getCol(colunaInicialTotais)}${
          linhaInicialProduto - 6
        }:${getCol(colunaInicialTotais)}${linhaInicialProduto - 1})`
      )
      .style(EDinheiroTabela);
    ws.cell(linhaInicialProduto, colunaInicialTotais + 1)
      .formula(
        `${getCol(colunaInicialTotais + 1)}${
          linhaInicialProduto - 7
        } - SUM(${getCol(colunaInicialTotais + 1)}${
          linhaInicialProduto - 6
        }:${getCol(colunaInicialTotais + 1)}${linhaInicialProduto - 1})`
      )
      .style(EDinheiroTabela);
    ws.cell(linhaInicialProduto, colunaInicialTotais + 2)
      .formula(
        `${getCol(colunaInicialTotais + 2)}${
          linhaInicialProduto - 7
        } - SUM(${getCol(colunaInicialTotais + 2)}${
          linhaInicialProduto - 6
        }:${getCol(colunaInicialTotais + 2)}${linhaInicialProduto - 1})`
      )
      .style(EDinheiroTabela);
    ws.cell(linhaInicialProduto, colunaInicialTotais + 3)
      .formula(
        `${getCol(colunaInicialTotais + 3)}${
          linhaInicialProduto - 7
        } - SUM(${getCol(colunaInicialTotais + 3)}${
          linhaInicialProduto - 6
        }:${getCol(colunaInicialTotais + 3)}${linhaInicialProduto - 1})`
      )
      .style(EDinheiroTabela);

    // CPV
    linhaInicialProduto++;
    ws.cell(linhaInicialProduto, colunaInicialTotais)
      .formula(ColunaSoma(linhaInicialProduto, 3, 4, 12))
      .style(EDinheiroTabela);
    ws.cell(linhaInicialProduto, colunaInicialTotais + 1)
      .formula(ColunaSoma(linhaInicialProduto, 4, 4, 12))
      .style(EDinheiroTabela);
    ws.cell(linhaInicialProduto, colunaInicialTotais + 2)
      .formula(ColunaSoma(linhaInicialProduto, 5, 4, 12))
      .style(EDinheiroTabela);
    ws.cell(linhaInicialProduto, colunaInicialTotais + 3)
      .formula(ColunaSoma(linhaInicialProduto, colunaInicialTotais, 1, 3, true))
      .style(EDinheiroTabela);

    // desc conced
    linhaInicialProduto++;
    ws.cell(linhaInicialProduto, colunaInicialTotais)
      .formula(ColunaSoma(linhaInicialProduto, 3, 4, 12))
      .style(EDinheiroTabela);
    ws.cell(linhaInicialProduto, colunaInicialTotais + 1)
      .formula(ColunaSoma(linhaInicialProduto, 4, 4, 12))
      .style(EDinheiroTabela);
    ws.cell(linhaInicialProduto, colunaInicialTotais + 2)
      .formula(ColunaSoma(linhaInicialProduto, 5, 4, 12))
      .style(EDinheiroTabela);
    ws.cell(linhaInicialProduto, colunaInicialTotais + 3)
      .formula(ColunaSoma(linhaInicialProduto, colunaInicialTotais, 1, 3, true))
      .style(EDinheiroTabela);

    // Marketing
    linhaInicialProduto++;
    ws.cell(linhaInicialProduto, colunaInicialTotais)
      .formula(ColunaSoma(linhaInicialProduto, 3, 4, 12))
      .style(EDinheiroTabela);
    ws.cell(linhaInicialProduto, colunaInicialTotais + 1)
      .formula(ColunaSoma(linhaInicialProduto, 4, 4, 12))
      .style(EDinheiroTabela);
    ws.cell(linhaInicialProduto, colunaInicialTotais + 2)
      .formula(ColunaSoma(linhaInicialProduto, 5, 4, 12))
      .style(EDinheiroTabela);
    ws.cell(linhaInicialProduto, colunaInicialTotais + 3)
      .formula(ColunaSoma(linhaInicialProduto, colunaInicialTotais, 1, 3, true))
      .style(EDinheiroTabela);

    // Fretes
    linhaInicialProduto++;
    ws.cell(linhaInicialProduto, colunaInicialTotais)
      .formula(ColunaSoma(linhaInicialProduto, 3, 4, 12))
      .style(EDinheiroTabela);
    ws.cell(linhaInicialProduto, colunaInicialTotais + 1)
      .formula(ColunaSoma(linhaInicialProduto, 4, 4, 12))
      .style(EDinheiroTabela);
    ws.cell(linhaInicialProduto, colunaInicialTotais + 2)
      .formula(ColunaSoma(linhaInicialProduto, 5, 4, 12))
      .style(EDinheiroTabela);
    ws.cell(linhaInicialProduto, colunaInicialTotais + 3)
      .formula(ColunaSoma(linhaInicialProduto, colunaInicialTotais, 1, 3, true))
      .style(EDinheiroTabela);

    // Margem $
    linhaInicialProduto++;
    ws.cell(linhaInicialProduto, colunaInicialTotais)
      .formula(
        `${getCol(colunaInicialTotais)}${
          linhaInicialProduto - 5
        } - SUM(${getCol(colunaInicialTotais)}${
          linhaInicialProduto - 4
        }:${getCol(colunaInicialTotais)}${linhaInicialProduto - 1})`
      )
      .style(EDinheiroTabela);
    ws.cell(linhaInicialProduto, colunaInicialTotais + 1)
      .formula(
        `${getCol(colunaInicialTotais + 1)}${
          linhaInicialProduto - 5
        } - SUM(${getCol(colunaInicialTotais + 1)}${
          linhaInicialProduto - 4
        }:${getCol(colunaInicialTotais + 1)}${linhaInicialProduto - 1})`
      )
      .style(EDinheiroTabela);
    ws.cell(linhaInicialProduto, colunaInicialTotais + 2)
      .formula(
        `${getCol(colunaInicialTotais + 2)}${
          linhaInicialProduto - 5
        } - SUM(${getCol(colunaInicialTotais + 2)}${
          linhaInicialProduto - 4
        }:${getCol(colunaInicialTotais + 2)}${linhaInicialProduto - 1})`
      )
      .style(EDinheiroTabela);
    ws.cell(linhaInicialProduto, colunaInicialTotais + 3)
      .formula(
        `${getCol(colunaInicialTotais + 3)}${
          linhaInicialProduto - 5
        } - SUM(${getCol(colunaInicialTotais + 3)}${
          linhaInicialProduto - 4
        }:${getCol(colunaInicialTotais + 3)}${linhaInicialProduto - 1})`
      )
      .style(EDinheiroTabela);

    // Margem %
    linhaInicialProduto++;
    ws.cell(linhaInicialProduto, colunaInicialTotais)
      .formula(
        `${getCol(colunaInicialTotais)}${linhaInicialProduto - 1} / ${getCol(
          colunaInicialTotais
        )}${linhaInicialProduto - 6}`
      )
      .style(EPercentual1CTabela);
    ws.cell(linhaInicialProduto, colunaInicialTotais + 1)
      .formula(
        `${getCol(colunaInicialTotais + 1)}${
          linhaInicialProduto - 1
        } / ${getCol(colunaInicialTotais + 1)}${linhaInicialProduto - 6}`
      )
      .style(EPercentual1CTabela);
    ws.cell(linhaInicialProduto, colunaInicialTotais + 2)
      .formula(
        `${getCol(colunaInicialTotais + 2)}${
          linhaInicialProduto - 1
        } / ${getCol(colunaInicialTotais + 2)}${linhaInicialProduto - 6}`
      )
      .style(EPercentual1CTabela);
    ws.cell(linhaInicialProduto, colunaInicialTotais + 3)
      .formula(
        `${getCol(colunaInicialTotais + 3)}${
          linhaInicialProduto - 1
        } / ${getCol(colunaInicialTotais + 3)}${linhaInicialProduto - 6}`
      )
      .style(EPercentual1CTabela);
  }

  // Criar agrupamentos
  const initialCol = 3;
  const offsetColumn = 4;
  for (let i = 0; i < 13; i++) {
    ws.column(initialCol + offsetColumn * i).group(1, true);
    ws.column(1 + initialCol + offsetColumn * i).group(1, true);
    ws.column(2 + initialCol + offsetColumn * i).group(1, true);
  }

  let initialRow = 5;
  // Agrupar totais
  for (let row = 0; row < 14; row++) {
    ws.row(row + initialRow).group(1, true);
  }

  initialRow = 25;

  for (let i = 0; i < quantProd; i++) {
    const linhaInicial = initialRow + 21 * i;
    for (let row = 0; row < 15; row++) {
      ws.row(row + linhaInicial).group(1, true);
    }
  }

  // Oculta coluna dos codigos
  ws.column(1).hide();

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
