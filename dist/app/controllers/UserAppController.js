"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { newObj[key] = obj[key]; } } } newObj.default = obj; return newObj; } } function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _yup = require('yup'); var Yup = _interopRequireWildcard(_yup);
var _sequelize = require('sequelize');
var _jsonwebtoken = require('jsonwebtoken'); var _jsonwebtoken2 = _interopRequireDefault(_jsonwebtoken);

var _util = require('util');

var _App = require('../models/App'); var _App2 = _interopRequireDefault(_App);
var _UserApp = require('../models/UserApp'); var _UserApp2 = _interopRequireDefault(_UserApp);

class UserAppController{
  async index(req, res){

    //Com o ID do usuário, listar os apps em que ele está

    const authHeader = req.headers.authorization;

    if(!authHeader){
      return res.status(401).json ({error: 'token not provide.'});
    }

    const [, token] = authHeader.split(' ');

    try
    {
      const decoded = await _util.promisify.call(void 0, _jsonwebtoken2.default.verify)(token, process.env.JWT_KEY);



      const retorno = await _UserApp2.default.findAll({
        where:{
          id_usuario: decoded.id
        },attributes: ['is_admin'],
        include: [
          {
            model: _App2.default, as: 'Apps',
            attributes: ['rota', 'nome', 'descricao'],
            required: false
          }
        ]
      });


    return res.json(retorno);
  } catch(err){
    return res.status(401).json({error:'Invalid Token.'});
  }
}

  async store(req, res){
    const schema = Yup.object().shape({
      id_usuario: Yup.number().required(),
      id_app: Yup.number().required(),
      is_admin: Yup.boolean().default(false)
    });

    if(!(await schema.isValid(req.body))){
      return res.status(400).json({error: 'Validation fails'})
    }

    const authHeader = req.headers.authorization;

    if(!authHeader){
      return res.status(401).json ({error: 'token not provide.'});
    }

    const [, token] = authHeader.split(' ');

    try
    {
      const decoded = await _util.promisify.call(void 0, _jsonwebtoken2.default.verify)(token, chaveToken.chave);

      // Verificar se o usuário que está fazendo a solicitação é admin do APP

      const userAdmin = await _UserApp2.default.findOne({
        where:
        {
          [_sequelize.Op.and]: [
            { id_usuario: decoded.id },
            { is_admin: true }
          ]
        }})


        if(!userAdmin){
          return res.status(401).json({error:'Você não tem permissão para cadastrar usuários.'});
        }



        //Verifica se o usuario já está cadastrado no sistema
        const userToAdd = await _UserApp2.default.findOne({
          where:
          {
            [_sequelize.Op.and]: [
              { id_usuario: req.body.id_usuario },
              { id_app: req.body.id_app }
            ]
          }})


          if(userToAdd && userToAdd.is_admin === req.body.is_admin)
          {
            return res.status(200).json({error:'Usuário Cadatrado.'});
          }

          if(!userToAdd){
            //Se não existir, cadastra

            //Verificar se o app e o usuarios são validos
            const existeUser = await _UserApp2.default.findOne(
              {
                where:
                {
                  id: req.body.id_usuario
                }
              }
            );

            if(!existeUser){
              return res.status(401).json({error:'Usuário informado não existe. Verifique.'});
            }

            const existeApp = await _App2.default.findOne(
              {
                where:
                {
                  id: req.body.id_app
                }
              });

              if(!existeApp){
                return res.status(401).json({error:'App informado não existe. Verifique.'});
              }

              const {id, id_usuario, id_app, is_admin} = _UserApp2.default.create(req.body);
              return res.json({
                id,
                id_usuario,
                id_app,
                is_admin
              });
          }
          else
          {
            //se existir altera administração
            const retorno = await _UserApp2.default.update(
              {
                is_admin: req.body.is_admin,
              },
              {
                where: {id_usuario: userToAdd.id}
              }

              );


              const {id_usuario,id_app, is_admin} = req.body;
            return res.json({
              id_usuario,
              id_app,
              is_admin
            });
          }
    }catch(err){
      console.log(err);
      return res.status(401).json({error:'Invalid Token.'});
    }

  }


}

exports. default = new UserAppController();
