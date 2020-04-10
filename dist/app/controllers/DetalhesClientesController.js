"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { newObj[key] = obj[key]; } } } newObj.default = obj; return newObj; } } function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _yup = require('yup'); var Yup = _interopRequireWildcard(_yup);
var _CadastrosClientes = require('../models/CadastrosClientes'); var _CadastrosClientes2 = _interopRequireDefault(_CadastrosClientes);
var _InfoCadastroClientes = require('../models/InfoCadastroClientes'); var _InfoCadastroClientes2 = _interopRequireDefault(_InfoCadastroClientes);
var _CondicoesPagto = require('../models/CondicoesPagto'); var _CondicoesPagto2 = _interopRequireDefault(_CondicoesPagto);
var _Segmento = require('../models/Segmento'); var _Segmento2 = _interopRequireDefault(_Segmento);
var _Responsabilidades = require('../models/Responsabilidades'); var _Responsabilidades2 = _interopRequireDefault(_Responsabilidades);
var _FormasPagto = require('../models/FormasPagto'); var _FormasPagto2 = _interopRequireDefault(_FormasPagto);
var _User = require('../models/User'); var _User2 = _interopRequireDefault(_User);
var _File = require('../models/File'); var _File2 = _interopRequireDefault(_File);

class DetalhesClientesController{

  async index(req, res){
    const schema = Yup.object().shape({
      id: Yup.number().required()
    });

    if(!(await schema.isValid(req.params))){
      return res.status(400).json({error: 'Insira um indíce válido para consultar.'});
    }

    const clientes = await _CadastrosClientes2.default.findOne({
      where: {id: req.params.id}
      ,
        include: [
          {
            model: _InfoCadastroClientes2.default, as: 'messages',
          }
        ]
    });

    const formaPagto = await _FormasPagto2.default.findOne({
      where:{
        cod_forma_pagto: clientes.forma_pagto
      },
      attributes:[['cod_forma_pagto', 'cod'], ['nome_forma_pagto', 'descricao']]
    });

    const condPagto = await _CondicoesPagto2.default.findOne({
      where:{
        cod_condicao_pagto: clientes.cond_pagto
      },
      attributes:[['cod_condicao_pagto', 'cod'], ['nome_condicao_pagto', 'descricao']]
    });
    const segmento = await _Segmento2.default.findOne({
      where:{
        cod_segmento:clientes.segmento
      },
      attributes:[['cod_segmento', 'cod'], ['nome_segmento', 'descricao']]
    });
    const Rota = await _Responsabilidades2.default.findOne({
      where:{
        cod_rota: clientes.rota
      },
      attributes:[['cod_rota', 'cod'], ['nome_rota', 'descricao']]
    });

    let mensagensAlteradas = [];

    for (const {id, id_usuario, id_cadastro, mensagem, createdAt, updatedAt } of clientes.messages) {

      const { nome, cargo, avatar } = await _User2.default.findByPk(id_usuario, {
        include: [
          {
            model: _File2.default,
            as: 'avatar',
            attributes: ['path', 'url'],
          },
        ],
      });

      mensagensAlteradas.push({
        id, id_usuario, nome, cargo, avatar, id_cadastro, mensagem, createdAt, updatedAt
      });
    }

    let {
      id: idEmpresa,
      id_usuario,
      cnpj_cpf,
      pessoa_juridica,
      data_nascimento,
      nome_fantasia,
      razao_social,
      cep,
      logradouro,
      numero,
      complemento,
      bairro,
      municipio,
      estado,
      pais,
      fone_principal,
      email_xml,
      fone_comprador,
      email_comprador,
      nome_comprador,
      fone_financeiro,
      email_financeiro,
      fone_fiscal,
      email_fiscal,
      status,
      valor_primeira_compra,
      obs_vendedor,
      createdAt,
      updatedAt,
      } = clientes;

    const retorno = {
      id: idEmpresa,
      id_usuario,
      cnpj_cpf,
      pessoa_juridica,
      data_nascimento,
      nome_fantasia,
      razao_social,
      cep,
      logradouro,
      numero,
      complemento,
      bairro,
      municipio,
      estado,
      pais,
      fone_principal,
      email_xml,
      fone_comprador,
      email_comprador,
      nome_comprador,
      fone_financeiro,
      email_financeiro,
      fone_fiscal,
      email_fiscal,
      rota: Rota,
      segmento: segmento,
      forma_pagto: formaPagto,
      cond_pagto: condPagto ,
      status,
      valor_primeira_compra,
      obs_vendedor,
      message: mensagensAlteradas,
      createdAt,
      updatedAt,
    };

    return res.json(retorno);
    }
}

exports. default = new DetalhesClientesController();
