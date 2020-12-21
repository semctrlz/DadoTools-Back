import QlGeral, { Cargos } from '../../../GlobalVars/ql/qlGeral';
import Notebooks from '../../../GlobalVars/TI/notebooks';
import Celulares from '../../../GlobalVars/TI/celulares';

export const NomeConta = 'MATERIAIS DE INFORMATICA';
export const ContaContabil = '3.1.1.1.04.02.002.003';
export const politicas = {
  TaxaSubstituicaoPerifericos: 0.015,
};

export const variaveis = {
  ValorMouse: [
    { mes: 1, valor: 63.75 }, // Cotação FGTec
  ],
  ValorTeclado: [{ mes: 1, valor: 41 }],
  ValorMonitor: [{ mes: 1, valor: 449 }],
  ValorHeadset: [
    { mes: 1, valor: 123.25 }, // https://www.fgtec.com.br/fone-de-ouvido-headset/fone-de-ouvido-philips-preto-serie-200-com-microfone-p3-tauh201bk-00/4647
  ],
  ValorCabos: [{ mes: 1, valor: 50 }],
  ValorSSD: [{ mes: 1, valor: 271 }],
  ValorCarregadorNotebook: [{ mes: 1, valor: 219 }],
  ValorCapinha: [{ mes: 1, valor: 40 }],
  ValorPelicula: [{ mes: 1, valor: 40 }],
  ValorCarregadorCelular: [{ mes: 1, valor: 100 }],
};

export default function MateriaisInformatica(ano, mes) {
  const qlMesAtual = QlGeral(ano, mes).value.filter(ql => {
    return (
      ql.nomeCargo !== Cargos.Vendedor &&
      ql.nomeCargo !== Cargos.ExecutivoDeVendas
    );
  });
  const quantNotebooks = Notebooks(ano, mes).value.Total;
  const quantDesktops = qlMesAtual.length - quantNotebooks;
  const quantCelulares = Celulares(ano, mes).value.Total;

  // valor atualizado perifericos
  let valorMouse = 0;
  variaveis.ValorMouse.forEach(v => {
    if (v.mes <= mes) valorMouse = v.valor;
  });
  let valorTeclado = 0;
  variaveis.ValorTeclado.forEach(v => {
    if (v.mes <= mes) valorTeclado = v.valor;
  });
  let valorMonitor = 0;
  variaveis.ValorMonitor.forEach(v => {
    if (v.mes <= mes) valorMonitor = v.valor;
  });
  let valorHeadset = 0;
  variaveis.ValorHeadset.forEach(v => {
    if (v.mes <= mes) valorHeadset = v.valor;
  });
  let ValorCabos = 0;
  variaveis.ValorCabos.forEach(v => {
    if (v.mes <= mes) ValorCabos = v.valor;
  });
  let ValorSSD = 0;
  variaveis.ValorSSD.forEach(v => {
    if (v.mes <= mes) ValorSSD = v.valor;
  });
  let ValorCarregadorNotebook = 0;
  variaveis.ValorCarregadorNotebook.forEach(v => {
    if (v.mes <= mes) ValorCarregadorNotebook = v.valor;
  });
  let ValorPelicula = 0;
  variaveis.ValorPelicula.forEach(v => {
    if (v.mes <= mes) ValorPelicula = v.valor;
  });
  let ValorCapinha = 0;
  variaveis.ValorCapinha.forEach(v => {
    if (v.mes <= mes) ValorCapinha = v.valor;
  });
  let ValorCarregadorCelular = 0;
  variaveis.ValorCarregadorCelular.forEach(v => {
    if (v.mes <= mes) ValorCarregadorCelular = v.valor;
  });

  const valorPerifericosDesktop =
    valorMouse +
    valorTeclado +
    valorMonitor +
    valorHeadset +
    ValorCabos +
    ValorSSD;

  const valorPerifericosNotebook =
    valorMouse +
    valorTeclado +
    ValorCarregadorNotebook +
    valorHeadset +
    ValorSSD;

  const valorPerifericosCelular =
    ValorCapinha + ValorPelicula + ValorCarregadorCelular;

  const totalReposicaoPerifericosDesktop =
    valorPerifericosDesktop *
    quantDesktops *
    politicas.TaxaSubstituicaoPerifericos;
  const totalReposicaoPerifericosNotebooks =
    valorPerifericosNotebook *
    quantNotebooks *
    politicas.TaxaSubstituicaoPerifericos;
  const totalReposicaoPerifericosCelular =
    valorPerifericosCelular *
    quantCelulares *
    politicas.TaxaSubstituicaoPerifericos;

  return {
    value: {
      Total:
        totalReposicaoPerifericosDesktop +
        totalReposicaoPerifericosNotebooks +
        totalReposicaoPerifericosCelular,
      ReposicaoPerifericosDesktop: totalReposicaoPerifericosDesktop,
      ReposicaoPerifericosNotebook: totalReposicaoPerifericosDesktop,
      ReposicaoPerifericoCelular: totalReposicaoPerifericosCelular,
      politicas,
      variaveis,
    },
  };
}
