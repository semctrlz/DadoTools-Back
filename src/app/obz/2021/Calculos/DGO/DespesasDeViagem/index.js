import Utils from '../../../../../../utils/utils';

export const NomeConta = 'DESPESAS DE VIAGEM';
export const ContaContabil = '3.1.1.1.04.02.001.060';
// FALTOU Carol preencher alguns valores
const TipoTransporte = {
  CarroProprio: 'CarroProprio',
  CarroAlugado: 'CarroAlugado',
  Onibus: 'Onibus',
  Aviao: 'Aviao',
};

const Destinos = {
  SantaMaria: 'SantaMaria',
  Toledo: 'Toledo',
  SaoPaulo: 'SaoPaulo',
  RioDeJaneiro: 'RioDeJaneiro',
  SantaCatarina: 'SantaCatarina',
  Parana: 'Parana',
  Padrao: 'Padrao',
};

const politicas = {
  valorReembolsoRefeicao: 40,
  valorReembolsoCombustivelCarroAlugado: 0, // Faltou preencher
  CalculoLitroPorKmCarroProprio: 5,
  ValorDiarioUber: 0, // Faltou preencher
};
const variaveis = {
  CalendarioViagem: [
    {
      mes: 1,
      pessoa: 'Janjar',
      TipoTransporte: TipoTransporte.Aviao,
      Carona: false,
      Diarias: 4,
      ValorIngresso: 0,
      Destino: Destinos.Toledo,
      aluguelCarroExtra: true,
    },
    {
      mes: 1,
      pessoa: 'Michael',
      TipoTransporte: TipoTransporte.Aviao,
      Carona: false,
      Diarias: 4,
      ValorIngresso: 0,
      Destino: Destinos.Toledo,
      aluguelCarroExtra: false,
    },
    {
      mes: 1,
      pessoa: 'Janjar',
      TipoTransporte: TipoTransporte.Aviao,
      Carona: false,
      Diarias: 4,
      ValorIngresso: 0,
      Destino: Destinos.SaoPaulo,
      aluguelCarroExtra: true,
    },
    {
      mes: 1,
      pessoa: 'Michael',
      TipoTransporte: TipoTransporte.Aviao,
      Carona: false,
      Diarias: 4,
      ValorIngresso: 0,
      Destino: Destinos.SaoPaulo,
      aluguelCarroExtra: false,
    },
    {
      mes: 1,
      pessoa: 'Janjar',
      TipoTransporte: TipoTransporte.CarroAlugado,
      Carona: false,
      Diarias: 4,
      ValorIngresso: 0,
      Destino: Destinos.SantaMaria,
      aluguelCarroExtra: false,
    },
    {
      mes: 1,
      pessoa: 'Michael',
      TipoTransporte: TipoTransporte.CarroProprio,
      Carona: false,
      Diarias: 0,
      ValorIngresso: 0,
      Destino: Destinos.SantaMaria,
      aluguelCarroExtra: false,
    },
    {
      mes: 1,
      pessoa: 'Thiago',
      TipoTransporte: TipoTransporte.CarroProprio,
      Carona: false,
      Diarias: 4,
      ValorIngresso: 0,
      Destino: Destinos.SantaMaria,
      aluguelCarroExtra: false,
    },
    {
      mes: 1,
      pessoa: 'Igor',
      TipoTransporte: TipoTransporte.Aviao,
      Carona: false,
      Diarias: 4,
      ValorIngresso: 0,
      Destino: Destinos.Toledo,
      aluguelCarroExtra: true,
    },
    {
      mes: 1,
      pessoa: 'Michael',
      TipoTransporte: TipoTransporte.CarroAlugado,
      Carona: true,
      Diarias: 4,
      ValorIngresso: 0,
      Destino: Destinos.Toledo,
      aluguelCarroExtra: false,
    },
    {
      mes: 1,
      pessoa: 'Cristiano Pessoa',
      TipoTransporte: TipoTransporte.CarroAlugado,
      Carona: false,
      Diarias: 4,
      ValorIngresso: 0,
      Destino: Destinos.SantaMaria,
      aluguelCarroExtra: false,
    },
    {
      mes: 1,
      pessoa: 'Vagner',
      TipoTransporte: TipoTransporte.CarroAlugado,
      Carona: true,
      Diarias: 4,
      ValorIngresso: 0,
      Destino: Destinos.SantaMaria,
      aluguelCarroExtra: false,
    },
    {
      mes: 1,
      pessoa: 'Ademir',
      TipoTransporte: TipoTransporte.CarroAlugado,
      Carona: false,
      Diarias: 2,
      ValorIngresso: 0,
      Destino: Destinos.SantaMaria,
      aluguelCarroExtra: false,
    },
    {
      mes: 1,
      pessoa: 'Marcirio',
      TipoTransporte: TipoTransporte.CarroAlugado,
      Carona: true,
      Diarias: 2,
      ValorIngresso: 0,
      Destino: Destinos.SantaMaria,
      aluguelCarroExtra: false,
    },
    {
      mes: 1,
      pessoa: 'Josiel',
      TipoTransporte: TipoTransporte.CarroAlugado,
      Carona: true,
      Diarias: 4,
      ValorIngresso: 0,
      Destino: Destinos.SantaMaria,
      aluguelCarroExtra: false,
    },
    {
      mes: 2,
      pessoa: 'Márcio Luiz Susin',
      TipoTransporte: TipoTransporte.Onibus,
      Carona: false,
      Diarias: 1,
      ValorIngresso: 0,
      Destino: Destinos.SantaMaria,
      aluguelCarroExtra: false,
    },
    {
      mes: 2,
      pessoa: 'Janjar',
      TipoTransporte: TipoTransporte.CarroAlugado,
      Carona: false,
      Diarias: 4,
      ValorIngresso: 0,
      Destino: Destinos.SantaMaria,
      aluguelCarroExtra: false,
    },
    {
      mes: 2,
      pessoa: 'Michael',
      TipoTransporte: TipoTransporte.CarroProprio,
      Carona: false,
      Diarias: 0,
      ValorIngresso: 0,
      Destino: Destinos.SantaMaria,
      aluguelCarroExtra: false,
    },
    {
      mes: 3,
      pessoa: 'Marcirio, Tânia,Lisi',
      TipoTransporte: TipoTransporte.Aviao,
      Carona: false,
      Diarias: 3,
      ValorIngresso: 0,
      Destino: Destinos.SantaMaria,
      aluguelCarroExtra: true,
    },
    {
      mes: 3,
      pessoa: 'Igor',
      TipoTransporte: TipoTransporte.CarroAlugado,
      Carona: false,
      Diarias: 3,
      ValorIngresso: 0,
      Destino: Destinos.SantaMaria,
      aluguelCarroExtra: false,
    },
    {
      mes: 3,
      pessoa: 'Cristiano Pessoa',
      TipoTransporte: TipoTransporte.CarroAlugado,
      Carona: true,
      Diarias: 3,
      ValorIngresso: 0,
      Destino: Destinos.SantaMaria,
      aluguelCarroExtra: false,
    },
    {
      mes: 3,
      pessoa: 'Igor',
      TipoTransporte: TipoTransporte.Aviao,
      Carona: false,
      Diarias: 3,
      ValorIngresso: 0,
      Destino: Destinos.Toledo,
      aluguelCarroExtra: true,
    },
    {
      mes: 3,
      pessoa: 'Cristiano Pessoa',
      TipoTransporte: TipoTransporte.CarroAlugado,
      Carona: true,
      Diarias: 3,
      ValorIngresso: 0,
      Destino: Destinos.Toledo,
      aluguelCarroExtra: false,
    },
    {
      mes: 3,
      pessoa: 'Sophia',
      TipoTransporte: TipoTransporte.CarroAlugado,
      Carona: true,
      Diarias: 3,
      ValorIngresso: 0,
      Destino: Destinos.Toledo,
      aluguelCarroExtra: false,
    },
    {
      mes: 3,
      pessoa: 'Márcio Luiz Susin',
      TipoTransporte: TipoTransporte.CarroAlugado,
      Carona: true,
      Diarias: 1,
      ValorIngresso: 0,
      Destino: Destinos.SantaMaria,
      aluguelCarroExtra: false,
    },
    {
      mes: 3,
      pessoa: 'Janjar',
      TipoTransporte: TipoTransporte.CarroAlugado,
      Carona: false,
      Diarias: 4,
      ValorIngresso: 0,
      Destino: Destinos.SantaMaria,
      aluguelCarroExtra: false,
    },
    {
      mes: 3,
      pessoa: 'Michael',
      TipoTransporte: TipoTransporte.CarroProprio,
      Carona: false,
      Diarias: 0,
      ValorIngresso: 0,
      Destino: Destinos.SantaMaria,
      aluguelCarroExtra: false,
    },
    {
      mes: 3,
      pessoa: 'Thiago',
      TipoTransporte: TipoTransporte.CarroProprio,
      Carona: false,
      Diarias: 4,
      ValorIngresso: 0,
      Destino: Destinos.SantaMaria,
      aluguelCarroExtra: false,
    },
    {
      mes: 4,
      pessoa: 'Janjar',
      TipoTransporte: TipoTransporte.Aviao,
      Carona: false,
      Diarias: 4,
      ValorIngresso: 0,
      Destino: Destinos.Toledo,
      aluguelCarroExtra: true,
    },
    {
      mes: 4,
      pessoa: 'Michael',
      TipoTransporte: TipoTransporte.Aviao,
      Carona: false,
      Diarias: 4,
      ValorIngresso: 0,
      Destino: Destinos.Toledo,
      aluguelCarroExtra: false,
    },
    {
      mes: 4,
      pessoa: 'Janjar',
      TipoTransporte: TipoTransporte.CarroAlugado,
      Carona: false,
      Diarias: 4,
      ValorIngresso: 0,
      Destino: Destinos.SantaMaria,
      aluguelCarroExtra: false,
    },
    {
      mes: 4,
      pessoa: 'Michael',
      TipoTransporte: TipoTransporte.CarroProprio,
      Carona: false,
      Diarias: 0,
      ValorIngresso: 0,
      Destino: Destinos.SantaMaria,
      aluguelCarroExtra: false,
    },
    {
      mes: 4,
      pessoa: 'Thiago',
      TipoTransporte: TipoTransporte.CarroProprio,
      Carona: false,
      Diarias: 4,
      ValorIngresso: 0,
      Destino: Destinos.SantaMaria,
      aluguelCarroExtra: false,
    },
    {
      mes: 4,
      pessoa: 'Josiel',
      TipoTransporte: TipoTransporte.CarroAlugado,
      Carona: true,
      Diarias: 4,
      ValorIngresso: 0,
      Destino: Destinos.SantaMaria,
      aluguelCarroExtra: false,
    },
    {
      mes: 5,
      pessoa: 'Marcirio, Tânia,Lisi',
      TipoTransporte: TipoTransporte.Aviao,
      Carona: false,
      Diarias: 3,
      ValorIngresso: 0,
      Destino: Destinos.Parana,
      aluguelCarroExtra: true,
    },
    {
      mes: 5,
      pessoa: 'Janjar',
      TipoTransporte: TipoTransporte.CarroAlugado,
      Carona: false,
      Diarias: 4,
      ValorIngresso: 0,
      Destino: Destinos.SantaMaria,
      aluguelCarroExtra: false,
    },
    {
      mes: 5,
      pessoa: 'Michael',
      TipoTransporte: TipoTransporte.CarroProprio,
      Carona: false,
      Diarias: 0,
      ValorIngresso: 0,
      Destino: Destinos.SantaMaria,
      aluguelCarroExtra: false,
    },
    {
      mes: 6,
      pessoa: 'Márcio Luiz Susin',
      TipoTransporte: TipoTransporte.Onibus,
      Carona: false,
      Diarias: 1,
      ValorIngresso: 0,
      Destino: Destinos.SantaMaria,
      aluguelCarroExtra: false,
    },
    {
      mes: 6,
      pessoa: 'Janjar',
      TipoTransporte: TipoTransporte.CarroAlugado,
      Carona: false,
      Diarias: 4,
      ValorIngresso: 0,
      Destino: Destinos.SantaMaria,
      aluguelCarroExtra: false,
    },
    {
      mes: 6,
      pessoa: 'Michael',
      TipoTransporte: TipoTransporte.CarroProprio,
      Carona: false,
      Diarias: 0,
      ValorIngresso: 0,
      Destino: Destinos.SantaMaria,
      aluguelCarroExtra: false,
    },
    {
      mes: 6,
      pessoa: 'Thiago',
      TipoTransporte: TipoTransporte.CarroProprio,
      Carona: false,
      Diarias: 4,
      ValorIngresso: 0,
      Destino: Destinos.SantaMaria,
      aluguelCarroExtra: false,
    },
    {
      mes: 7,
      pessoa: 'Márcio Luiz Susin',
      TipoTransporte: TipoTransporte.Aviao,
      Carona: false,
      Diarias: 2,
      ValorIngresso: 0,
      Destino: Destinos.Toledo,
      aluguelCarroExtra: true,
    },
    {
      mes: 7,
      pessoa: 'Janjar',
      TipoTransporte: TipoTransporte.CarroAlugado,
      Carona: false,
      Diarias: 4,
      ValorIngresso: 0,
      Destino: Destinos.SantaMaria,
      aluguelCarroExtra: false,
    },
    {
      mes: 7,
      pessoa: 'Michael',
      TipoTransporte: TipoTransporte.CarroProprio,
      Carona: false,
      Diarias: 0,
      ValorIngresso: 0,
      Destino: Destinos.SantaMaria,
      aluguelCarroExtra: false,
    },
    {
      mes: 8,
      pessoa: 'Janjar',
      TipoTransporte: TipoTransporte.Aviao,
      Carona: false,
      Diarias: 4,
      ValorIngresso: 0,
      Destino: Destinos.Toledo,
      aluguelCarroExtra: true,
    },
    {
      mes: 8,
      pessoa: 'Michael',
      TipoTransporte: TipoTransporte.Aviao,
      Carona: false,
      Diarias: 4,
      ValorIngresso: 0,
      Destino: Destinos.Toledo,
      aluguelCarroExtra: false,
    },
    {
      mes: 8,
      pessoa: 'Igor',
      TipoTransporte: TipoTransporte.CarroAlugado,
      Carona: false,
      Diarias: 3,
      ValorIngresso: 0,
      Destino: Destinos.SantaMaria,
      aluguelCarroExtra: false,
    },
    {
      mes: 8,
      pessoa: 'Cristiano Pessoa',
      TipoTransporte: TipoTransporte.CarroAlugado,
      Carona: true,
      Diarias: 3,
      ValorIngresso: 0,
      Destino: Destinos.SantaMaria,
      aluguelCarroExtra: false,
    },
    {
      mes: 8,
      pessoa: 'Igor',
      TipoTransporte: TipoTransporte.Aviao,
      Carona: false,
      Diarias: 3,
      ValorIngresso: 0,
      Destino: Destinos.Toledo,
      aluguelCarroExtra: true,
    },
    {
      mes: 8,
      pessoa: 'Cristiano Pessoa',
      TipoTransporte: TipoTransporte.CarroAlugado,
      Carona: true,
      Diarias: 3,
      ValorIngresso: 0,
      Destino: Destinos.Toledo,
      aluguelCarroExtra: false,
    },
    {
      mes: 8,
      pessoa: 'Janjar',
      TipoTransporte: TipoTransporte.CarroAlugado,
      Carona: false,
      Diarias: 4,
      ValorIngresso: 0,
      Destino: Destinos.SantaMaria,
      aluguelCarroExtra: false,
    },
    {
      mes: 8,
      pessoa: 'Michael',
      TipoTransporte: TipoTransporte.CarroProprio,
      Carona: false,
      Diarias: 0,
      ValorIngresso: 0,
      Destino: Destinos.SantaMaria,
      aluguelCarroExtra: false,
    },
    {
      mes: 8,
      pessoa: 'Thiago',
      TipoTransporte: TipoTransporte.CarroProprio,
      Carona: false,
      Diarias: 4,
      ValorIngresso: 0,
      Destino: Destinos.SantaMaria,
      aluguelCarroExtra: false,
    },
    {
      mes: 9,
      pessoa: 'Thiago',
      TipoTransporte: TipoTransporte.CarroProprio,
      Carona: false,
      Diarias: 4,
      ValorIngresso: 0,
      Destino: Destinos.SantaMaria,
      aluguelCarroExtra: false,
    },
    {
      mes: 9,
      pessoa: 'Márcio Luiz Susin',
      TipoTransporte: TipoTransporte.Onibus,
      Carona: false,
      Diarias: 1,
      ValorIngresso: 0,
      Destino: Destinos.SantaMaria,
      aluguelCarroExtra: false,
    },
    {
      mes: 9,
      pessoa: 'Janjar',
      TipoTransporte: TipoTransporte.CarroAlugado,
      Carona: false,
      Diarias: 4,
      ValorIngresso: 0,
      Destino: Destinos.SantaMaria,
      aluguelCarroExtra: false,
    },
    {
      mes: 9,
      pessoa: 'Michael',
      TipoTransporte: TipoTransporte.CarroProprio,
      Carona: false,
      Diarias: 0,
      ValorIngresso: 0,
      Destino: Destinos.SantaMaria,
      aluguelCarroExtra: false,
    },
    {
      mes: 9,
      pessoa: 'Marcirio, Tânia,Lisi',
      TipoTransporte: TipoTransporte.Aviao,
      Carona: false,
      Diarias: 2,
      ValorIngresso: 0,
      Destino: Destinos.RioDeJaneiro,
      aluguelCarroExtra: true,
    },
    {
      mes: 10,
      pessoa: 'Marcirio, Tânia,Lisi',
      TipoTransporte: TipoTransporte.Aviao,
      Carona: false,
      Diarias: 3,
      ValorIngresso: 0,
      Destino: Destinos.SaoPaulo,
      aluguelCarroExtra: true,
    },
    {
      mes: 10,
      pessoa: 'Janjar',
      TipoTransporte: TipoTransporte.Aviao,
      Carona: false,
      Diarias: 4,
      ValorIngresso: 0,
      Destino: Destinos.Toledo,
      aluguelCarroExtra: true,
    },
    {
      mes: 10,
      pessoa: 'Michael',
      TipoTransporte: TipoTransporte.Aviao,
      Carona: false,
      Diarias: 4,
      ValorIngresso: 0,
      Destino: Destinos.Toledo,
      aluguelCarroExtra: false,
    },
    {
      mes: 10,
      pessoa: 'Janjar',
      TipoTransporte: TipoTransporte.CarroAlugado,
      Carona: false,
      Diarias: 4,
      ValorIngresso: 0,
      Destino: Destinos.SantaMaria,
      aluguelCarroExtra: false,
    },
    {
      mes: 10,
      pessoa: 'Michael',
      TipoTransporte: TipoTransporte.CarroProprio,
      Carona: false,
      Diarias: 0,
      ValorIngresso: 0,
      Destino: Destinos.SantaMaria,
      aluguelCarroExtra: false,
    },
    {
      mes: 10,
      pessoa: 'Thiago',
      TipoTransporte: TipoTransporte.CarroProprio,
      Carona: false,
      Diarias: 4,
      ValorIngresso: 0,
      Destino: Destinos.SantaMaria,
      aluguelCarroExtra: false,
    },
    {
      mes: 11,
      pessoa: 'Márcio Luiz Susin',
      TipoTransporte: TipoTransporte.CarroAlugado,
      Carona: true,
      Diarias: 1,
      ValorIngresso: 0,
      Destino: Destinos.SantaMaria,
      aluguelCarroExtra: false,
    },
    {
      mes: 11,
      pessoa: 'Janjar',
      TipoTransporte: TipoTransporte.CarroAlugado,
      Carona: false,
      Diarias: 4,
      ValorIngresso: 0,
      Destino: Destinos.SantaMaria,
      aluguelCarroExtra: false,
    },
    {
      mes: 11,
      pessoa: 'Michael',
      TipoTransporte: TipoTransporte.CarroProprio,
      Carona: false,
      Diarias: 0,
      ValorIngresso: 0,
      Destino: Destinos.SantaMaria,
      aluguelCarroExtra: false,
    },
    {
      mes: 12,
      pessoa: 'Janjar',
      TipoTransporte: TipoTransporte.Aviao,
      Carona: false,
      Diarias: 4,
      ValorIngresso: 0,
      Destino: Destinos.Toledo,
      aluguelCarroExtra: true,
    },
    {
      mes: 12,
      pessoa: 'Michael',
      TipoTransporte: TipoTransporte.Aviao,
      Carona: false,
      Diarias: 4,
      ValorIngresso: 0,
      Destino: Destinos.Toledo,
      aluguelCarroExtra: false,
    },
    {
      mes: 12,
      pessoa: 'Janjar',
      TipoTransporte: TipoTransporte.CarroAlugado,
      Carona: false,
      Diarias: 4,
      ValorIngresso: 0,
      Destino: Destinos.SantaMaria,
      aluguelCarroExtra: false,
    },
    {
      mes: 12,
      pessoa: 'Michael',
      TipoTransporte: TipoTransporte.CarroProprio,
      Carona: false,
      Diarias: 0,
      ValorIngresso: 0,
      Destino: Destinos.SantaMaria,
      aluguelCarroExtra: false,
    },
  ],
  Destinos: [
    {
      Destino: Destinos.SantaMaria,
      ValorDiaria: 190,
      Distancia: 291,
      ValorPassagemOnibus: 130.15,
      ValorPassagemAerea: 0,
      ValorPedagios: 37.2,
    },
    {
      Destino: Destinos.Toledo,
      ValorDiaria: 175,
      Distancia: 856,
      ValorPassagemOnibus: 0,
      ValorPassagemAerea: 500,
      ValorPedagios: 33.6,
    },
    {
      Destino: Destinos.SantaCatarina,
      ValorDiaria: 215,
      Distancia: 461,
      ValorPassagemOnibus: 0,
      ValorPassagemAerea: 0,
      ValorPedagios: 33.6,
    },
    {
      Destino: Destinos.Parana,
      ValorDiaria: 220,
      Distancia: 860,
      ValorPassagemOnibus: 0,
      ValorPassagemAerea: 0,
      ValorPedagios: 500,
    },
    {
      Destino: Destinos.SaoPaulo,
      ValorDiaria: 250,
      Distancia: 0,
      ValorPassagemOnibus: 0,
      ValorPassagemAerea: 0,
      ValorPedagios: 400,
    },
    {
      Destino: Destinos.Padrao,
      ValorDiaria: 190,
      Distancia: 291,
      ValorPassagemOnibus: 130.15,
      ValorPassagemAerea: 0,
      ValorPedagios: 37.2,
    },
  ],
  ValorCombustivelEstado: [
    { mes: 1, estado: 'RS', valor: 4.508 },
    { mes: 1, estado: 'SC', valor: 4.384 },
    { mes: 1, estado: 'PR', valor: 4.3718 },
    { mes: 2, estado: 'RS', valor: 4.508 },
    { mes: 2, estado: 'SC', valor: 4.384 },
    { mes: 2, estado: 'PR', valor: 4.3718 },
    { mes: 3, estado: 'RS', valor: 4.508 },
    { mes: 3, estado: 'SC', valor: 4.384 },
    { mes: 3, estado: 'PR', valor: 4.3718 },
    { mes: 4, estado: 'RS', valor: 4.508 },
    { mes: 4, estado: 'SC', valor: 4.384 },
    { mes: 4, estado: 'PR', valor: 4.3718 },
    { mes: 5, estado: 'RS', valor: 4.508 },
    { mes: 5, estado: 'SC', valor: 4.384 },
    { mes: 5, estado: 'PR', valor: 4.3718 },
    { mes: 6, estado: 'RS', valor: 4.508 },
    { mes: 6, estado: 'SC', valor: 4.384 },
    { mes: 6, estado: 'PR', valor: 4.3718 },
    { mes: 7, estado: 'RS', valor: 4.508 },
    { mes: 7, estado: 'SC', valor: 4.384 },
    { mes: 7, estado: 'PR', valor: 4.3718 },
    { mes: 8, estado: 'RS', valor: 4.508 },
    { mes: 8, estado: 'SC', valor: 4.384 },
    { mes: 8, estado: 'PR', valor: 4.3718 },
    { mes: 9, estado: 'RS', valor: 4.508 },
    { mes: 9, estado: 'SC', valor: 4.384 },
    { mes: 9, estado: 'PR', valor: 4.3718 },
    { mes: 10, estado: 'RS', valor: 4.508 },
    { mes: 10, estado: 'SC', valor: 4.384 },
    { mes: 10, estado: 'PR', valor: 4.3718 },
    { mes: 11, estado: 'RS', valor: 4.508 },
    { mes: 11, estado: 'SC', valor: 4.384 },
    { mes: 11, estado: 'PR', valor: 4.3718 },
    { mes: 12, estado: 'RS', valor: 4.508 },
    { mes: 12, estado: 'SC', valor: 4.384 },
    { mes: 12, estado: 'PR', valor: 4.3718 },
  ],
  ValorDiariaAluguelCarro: 200,
};

export default function DespesasDeViagem(ano, mes) {
  // Despesas de viagem
  let ValorTransporte = 0;
  let ValorAlimentacao = 0;
  let ValorEstadia = 0;
  let ValorIngresso = 0;

  const viagens = variaveis.CalendarioViagem.filter(v => {
    return v.mes === mes;
  });

  viagens.forEach(viagem => {
    const destinoFiltro = variaveis.Destinos.filter(d => {
      return d.Destino === viagem.Destino;
    });

    // Tenta localizar o destino na tabela de destinos, caso não consiga,
    // pega o destino padrão
    const destino =
      destinoFiltro.length > 0
        ? destinoFiltro[0]
        : variaveis.Destinos.filter(d => {
            return d.Destino === Destinos.Padrao;
          })[0];

    // Considera o valor de combustivel do RS
    const valorCombustivelRS = Utils.SomaArray(
      variaveis.ValorCombustivelEstado.filter(
        c => c.estado === 'RS' && c.mes === mes
      ).map(c => c.valor)
    );

    // Calcula o valor da passagem

    if (!viagem.Carona) {
      if (viagem.TipoTransporte === TipoTransporte.Onibus) {
        if (viagem.aluguelCarroExtra) {
          ValorTransporte +=
            destino.ValorPassagemOnibus +
            viagem.Diarias * variaveis.ValorDiariaAluguelCarro;
        } else {
          ValorTransporte +=
            destino.ValorPassagemOnibus +
            viagem.Diarias * politicas.ValorDiarioUber;
        }
      } else if (viagem.TipoTransporte === TipoTransporte.CarroProprio) {
        ValorTransporte +=
          (destino.Distancia / politicas.CalculoLitroPorKmCarroProprio) *
            valorCombustivelRS +
          destino.ValorPedagios;
      } else if (viagem.TipoTransporte === TipoTransporte.CarroAlugado) {
        ValorTransporte +=
          destino.Distancia * politicas.valorReembolsoCombustivelCarroAlugado +
          destino.ValorPedagios +
          viagem.Diarias * variaveis.ValorDiariaAluguelCarro;
      } else if (viagem.TipoTransporte === TipoTransporte.Aviao) {
        if (viagem.aluguelCarroExtra) {
          ValorTransporte +=
            destino.ValorPassagemAerea +
            viagem.Diarias * variaveis.ValorDiariaAluguelCarro;
        } else {
          ValorTransporte +=
            destino.ValorPassagemAerea +
            viagem.Diarias * politicas.ValorDiarioUber;
        }
      }
    }
    ValorAlimentacao += viagem.Diarias * politicas.valorReembolsoRefeicao;
    ValorEstadia += viagem.Diarias * destino.ValorDiaria;
    ValorIngresso += viagem.ValorIngresso;
  });

  return {
    value: {
      Total: ValorTransporte + ValorAlimentacao + ValorEstadia + ValorIngresso,
      Descricao: {
        Transporte: ValorTransporte,
        Alimentacao: ValorAlimentacao,
        Estadia: ValorEstadia,
        Ingresso: ValorIngresso,
      },
      politicas,
      variaveis,
    },
  };
}
