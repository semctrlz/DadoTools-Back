"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { newObj[key] = obj[key]; } } } newObj.default = obj; return newObj; } } function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _yup = require('yup'); var Yup = _interopRequireWildcard(_yup);
var _jsonwebtoken = require('jsonwebtoken'); var _jsonwebtoken2 = _interopRequireDefault(_jsonwebtoken);
var _util = require('util');

var _App = require('../models/App'); var _App2 = _interopRequireDefault(_App);
var _UserApp = require('../models/UserApp'); var _UserApp2 = _interopRequireDefault(_UserApp);
var _sequelize = require('sequelize');


class AppController{
  async index(req, res){

    const apps = await _App2.default.findAll({});

    return res.json(apps);
  }

  async store(req, res){
    const schema = Yup.object().shape({
      nome: Yup.string().max(25).required(),
      descricao: Yup.string(255).required(),
      rota: Yup.string().min(3).max(15).required()
    });

    if(!(await schema.isValid(req.body))){
      return res.status(400).json({error: 'Validation fails'})
    }

    const rotaExiste = await _App2.default.findOne({
      where:
      {
        [_sequelize.Op.or]: [{nome: req.body.nome}, {rota: req.body.rota}]
      }})

    if(rotaExiste){
      return res.status(400).json({
        error: "Impossível criar esta rota. O nome da rota e o caminho da rota devem ser únicos.",
      });
    }

    const {id, nome, descricao, rota} = await _App2.default.create(req.body);

    const authHeader = req.headers.authorization;

    if(!authHeader){
      return res.status(401).json ({error: 'token not provide.'});
    }

    const [, token] = authHeader.split(' ');


    try{
      //Colocar usuario atual como admin
      const decoded = await _util.promisify.call(void 0, _jsonwebtoken2.default.verify)(token, process.env.JWT_KEY);

      await _UserApp2.default.create({
        id_usuario: decoded.id,
        id_app: id,
        is_admin: true
      })

      return res.json({
        id,
        nome,
        descricao,
        rota
      });
    }catch(err){

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
      const decoded = await _util.promisify.call(void 0, _jsonwebtoken2.default.verify)(token, chaveToken.chave);


      const adminApp = await _UserApp2.default.findOne({
        where: {
          [_sequelize.Op.and]: [
            { id_usuario: decoded.id },
            { id_app: req.body.id_app},
            { is_admin: true}
          ]
        }
      });


      if(!adminApp){
        return res.status(401).json({message: "Você precisa de acesso de administrador para deletar um APP."});
      }

      _App2.default.destroy({
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
      id_app: Yup.number().required(),
      nome: Yup.string().max(25).required(),
      descricao: Yup.string(255).required(),
      rota: Yup.string().min(3).max(15).required()
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
      const decoded = await _util.promisify.call(void 0, _jsonwebtoken2.default.verify)(token, chaveToken.chave);


      const adminApp = await _UserApp2.default.findOne({
        where: {
          [_sequelize.Op.and]: [
            { id_usuario: decoded.id },
            { id_app: req.body.id_app},
            { is_admin: true}
          ]
        }
      });


      if(!adminApp){
        return res.status(401).json({message: "Você precisa de acesso de administrador para alterar um APP."});
      }


      const retorno = await _App2.default.update(
        {
          nome: req.body.nome,
          descricao: req.body.descricao,
          rota: req.body.rota
        },
        {
          where: {id: req.body.id_app}
        }
      );

      res.json({
        id: req.body.id_app,
        nome: req.body.nome,
        descricao: req.body.descricao,
        rota: req.body.rota
      });
    }catch(err){
      console.log(err)
      res.status(401).json({message: "Erro ao alterar App. Verifique os dados informados e tente novamente."});
    }

  }
}

exports. default = new AppController();
