"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { newObj[key] = obj[key]; } } } newObj.default = obj; return newObj; } } function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _yup = require('yup'); var Yup = _interopRequireWildcard(_yup);

var _InfoCadastroClientes = require('../models/InfoCadastroClientes'); var _InfoCadastroClientes2 = _interopRequireDefault(_InfoCadastroClientes);
var _CadastrosClientes = require('../models/CadastrosClientes'); var _CadastrosClientes2 = _interopRequireDefault(_CadastrosClientes);
var _User = require('../models/User'); var _User2 = _interopRequireDefault(_User);
var _File = require('../models/File'); var _File2 = _interopRequireDefault(_File);
var _Notification = require('../schemas/Notification'); var _Notification2 = _interopRequireDefault(_Notification);

class CadastroClienteMessagesController{
  async store(req, res){
    const schema = Yup.object().shape({
      id_cadastro: Yup.number().required(),
      mensagem: Yup.string().max(255).required()
    });

    if(!(await schema.isValid(req.body))){
      return res.status(400).json({error: 'Validation fails'})
    }

    const {id_cadastro, mensagem} = req.body;

    const retorno = await _InfoCadastroClientes2.default.create({
      id_usuario: req.idUsuario,
      id_cadastro,
      mensagem
    })

    const {id_usuario: donoCadastro, nome_fantasia, razao_social} = await _CadastrosClientes2.default.findByPk(id_cadastro);

    if(donoCadastro !== req.idUsuario){

      const mensagemNot = `Você recebeu uma mensagem no cadastro de ${nome_fantasia}`;
      const response = await _Notification2.default.create({
        content: mensagemNot,
        user: donoCadastro
      })

    }


    const usuario = await _User2.default.findByPk(req.idUsuario, {
      include: [
        {
          model: _File2.default,
          as: 'avatar',
          attributes: ['path', 'url'],
        },
      ],
      attributes: ['nome', 'cargo'],
    });

    return res.json({
      mensagem:retorno,
      usuario
    })
  }
}
exports. default = new CadastroClienteMessagesController();

