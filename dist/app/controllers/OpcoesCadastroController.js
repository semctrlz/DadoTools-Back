"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _sequelize = require('sequelize');

var _CondicoesPagto = require('../models/CondicoesPagto'); var _CondicoesPagto2 = _interopRequireDefault(_CondicoesPagto);
var _FormasPagto = require('../models/FormasPagto'); var _FormasPagto2 = _interopRequireDefault(_FormasPagto);
var _Segmento = require('../models/Segmento'); var _Segmento2 = _interopRequireDefault(_Segmento);
var _Responsabilidades = require('../models/Responsabilidades'); var _Responsabilidades2 = _interopRequireDefault(_Responsabilidades);
var _User = require('../models/User'); var _User2 = _interopRequireDefault(_User);

class OpcoesCadastroController{
  async index(req, res){

    const condicoes_pagto = await _CondicoesPagto2.default.findAll({attributes: [['cod_condicao_pagto', 'cod'], ['nome_condicao_pagto', 'descricao']]});
    const formas_pagto = await _FormasPagto2.default.findAll({attributes: [['cod_forma_pagto', 'cod'], ['nome_forma_pagto', 'descricao']]});
    const segmentos = await _Segmento2.default.findAll({attributes: [['cod_segmento', 'cod'], ['nome_segmento', 'descricao']]});

    const {codigo_cigam} = await _User2.default.findByPk(req.idUsuario);

    const rotas = await _Responsabilidades2.default.findAll({
      where:{
        [_sequelize.Op.or]: [
          { gerente_geral: codigo_cigam},
          { gerente_comercial: codigo_cigam},
          { supervisor: codigo_cigam},
          { vendedor: codigo_cigam}
        ]
      },
      attributes: [['cod_rota', 'cod'], ['nome_rota', 'descricao']]
    });

    return res.json({
      condicoes_pagto,
      formas_pagto,
      segmentos,
      rotas
    });

    const CondicoesPacto = await CondPagto.findAll({});



    return res.json(apps);
  }
}

exports. default = new OpcoesCadastroController();
