"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { newObj[key] = obj[key]; } } } newObj.default = obj; return newObj; } } function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _yup = require('yup'); var Yup = _interopRequireWildcard(_yup);
var _jsonwebtoken = require('jsonwebtoken'); var _jsonwebtoken2 = _interopRequireDefault(_jsonwebtoken);
var _util = require('util');

var _CadastrosClientes = require('../models/CadastrosClientes'); var _CadastrosClientes2 = _interopRequireDefault(_CadastrosClientes);

class CadastroClientesController{
  async index(req, res){

    const schema = Yup.object().shape({
      id: Yup.number().required()
    });

    let idEmpresa = req.params.id;

    if(!(await schema.isValid(req.params))){
      idEmpresa = 0;
    }

    if(idEmpresa === 0){
      const cadastros = await _CadastrosClientes2.default.findAll({
        where: {
          id_usuario: req.idUsuario
        }
      });
      return res.json(cadastros);
    }else{
      const cadastros = await _CadastrosClientes2.default.findByPk(idEmpresa);
      return res.json(cadastros);
    }
  }

  async store(req, res){
    const schema = Yup.object().shape({
      cnpj_cpf: Yup.string().required()
      .when('pessoa_juridica', (pessoa_juridica, field)=>
      pessoa_juridica===true?field.length(14):field.length(11)),
      pessoa_juridica: Yup.boolean().required(),
      data_nascimento: Yup.string().when('pessoa_juridica', (pessoa_juridica, field)=>
      !pessoa_juridica?field.required():field),
      nome_fantasia: Yup.string().required().max(20),
      razao_social: Yup.string().required().max(60),
      cep: Yup.string().length(8).required(),
      logradouro: Yup.string().max(40),
      numero: Yup.string().max(10).required(),
      complemento: Yup.string().max(25),
      bairro: Yup.string().max(20),
      municipio: Yup.string().max(30),
      estado: Yup.string().max(2),
      pais: Yup.string().max(10),
      fone_principal: Yup.string().max(15).required(),
      email_xml: Yup.string().max(65).required(),
      fone_comprador: Yup.string().max(15),
      email_comprador: Yup.string().max(65),
      nome_comprador: Yup.string().max(65),
      fone_financeiro: Yup.string().max(15),
      email_financeiro: Yup.string().max(65),
      fone_fiscal: Yup.string().max(15),
      email_fiscal:  Yup.string().max(65),
      rota: Yup.string().max(2).required(),
      segmento: Yup.string().max(2).required(),
      forma_pagto:Yup.string().max(3).required(),
      cond_pagto: Yup.string().max(3).required(),
      status: Yup.string().default('P'),
      valor_primeira_compra:Yup.number(),
      obs_vendedor: Yup.string().max(255)
    });

    schema.validate(req.body)
    .catch(function(e) {
        console.log(e);
    });

    if(!(await schema.isValid(req.body))){
      return res.status(400).json({error: 'Validation fails'})
    }

    const cnpjExiste = await _CadastrosClientes2.default.findOne({
      where:
      {
        cnpj_cpf:req.body.cnpj_cpf
      }
    });

    if(cnpjExiste){
      return res.status(400).json({
        error: "Já existe solicitação de cadastro para esta empresa / pessoa. Verifique com o setor de cadastro.",
      });
    }

    try{
      //Colocar usuario atual como admin
      const data = {...req.body,...{id_usuario:req.idUsuario} };

      const resultado = await _CadastrosClientes2.default.create(data);
      return res.json(resultado);

    }catch(err){
      res.status(401).json({message: "Erro ao cadastrar cliente. Verifique os dados informados e tente novamente."});
    }
  }

  async delete(req, res){
    const schema = Yup.object().shape({
      id_app: Yup.number().required()
    });

    if(!(await schema.isValid(req.body))){
      return res.status(400).json({error: 'Validation fails'})
    }

    const authHeader = req.headers.authorization;

    if(!authHeader){
      return res.status(401).json ({error: 'token not provide.'});
    }

    const [, token] = authHeader.split(' ');


    try{
      const decoded = await _util.promisify.call(void 0, _jsonwebtoken2.default.verify)(token, process.env.JWT_KEY);


      const adminApp = await UserApp.findOne({
        where: {
          [Op.and]: [
            { id_usuario: decoded.id },
            { id_app: req.body.id_app},
            { is_admin: true}
          ]
        }
      });


      if(!adminApp){
        return res.status(401).json({message: "Você precisa de acesso de administrador para deletar um APP."});
      }

      App.destroy({
        where: {
          id: req.body.id_app
        }
      });
      res.json({message: "App deletado com sucesso!"});
    }catch(err){
      console.log(err)
      res.status(401).json({message: "Erro ao excluir App. Verifique os dados informados e tente novamente."});
    }

  }

  async update(req, res){
    const schema = Yup.object().shape({
      cnpj_cpf: Yup.string().required()
      .when('pessoa_juridica', (pessoa_juridica, field)=>
      pessoa_juridica===true?field.length(14):field.length(11)),
      pessoa_juridica: Yup.boolean().required(),
      data_nascimento: Yup.string().when('pessoa_juridica', (pessoa_juridica, field)=>
      !pessoa_juridica?field.required():field),
      nome_fantasia: Yup.string().required().max(20),
      razao_social: Yup.string().required().max(60),
      cep: Yup.string().length(8).required(),
      logradouro: Yup.string().max(40),
      numero: Yup.string().max(10).required(),
      complemento: Yup.string().max(25),
      bairro: Yup.string().max(20),
      municipio: Yup.string().max(30),
      estado: Yup.string().max(2),
      pais: Yup.string().max(10),
      fone_principal: Yup.string().max(15).required(),
      email_xml: Yup.string().max(65).required(),
      fone_comprador: Yup.string().max(15),
      email_comprador: Yup.string().max(65),
      nome_comprador: Yup.string().max(65),
      fone_financeiro: Yup.string().max(15),
      email_financeiro: Yup.string().max(65),
      fone_fiscal: Yup.string().max(15),
      email_fiscal:  Yup.string().max(65),
      rota: Yup.string().max(2).required(),
      segmento: Yup.string().max(2).required(),
      forma_pagto:Yup.string().max(3).required(),
      cond_pagto: Yup.string().max(3).required(),
      status: Yup.string().default('P'),
      valor_primeira_compra:Yup.number(),
      obs_vendedor: Yup.string().max(255),
      id: Yup.number().required(),
      id_usuario: Yup.number().required()
    });

    if(!(await schema.isValid(req.body))){
      return res.status(400).json({error: 'Validation fails'})
    }

    if((req.body.id_usuario !== req.idUsuario) || req.body.status !== 'P'){
      return res.status(401).json ({error: 'Você não tem permissão para alterar este cadastro.'});
    }

    const dadosAlterados = await _CadastrosClientes2.default.update(req.body, {
      where:{
      id: req.body.id
    }
  });
    return res.json(dadosAlterados);
  }
}

exports. default = new CadastroClientesController();
