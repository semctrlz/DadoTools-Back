"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { newObj[key] = obj[key]; } } } newObj.default = obj; return newObj; } } function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _yup = require('yup'); var Yup = _interopRequireWildcard(_yup);
var _jsonwebtoken = require('jsonwebtoken'); var _jsonwebtoken2 = _interopRequireDefault(_jsonwebtoken);
var _util = require('util');

var _User = require('../models/User'); var _User2 = _interopRequireDefault(_User);
var _File = require('../models/File'); var _File2 = _interopRequireDefault(_File);

class SessionController{
  async store(req, res){
    const schema = Yup.object().shape({
      email: Yup.string().email().required(),
      password: Yup.string().required(),
    });

    if(!(await schema.isValid(req.body))){
      return res.status(400).json({error: 'Validation fails'})
    }

    const {email, password} = req.body;

    const user = await _User2.default.findOne({
      where:{email},
        include: [
          {
            model: _File2.default, as: 'avatar',
            attributes: ['id','nome','path','url'],
          }
        ]
    });

    const error = 'Combinação de usuário/senha inválida. Por favor, verifique.';

    if(!user){
      return res.status(401).json({error});
    }

    if(!(await user.checkPassword(password)))
    {
      return res.status(401).json({error});
    }

    const {id, nome, sobrenome, codigo_cigam, is_sales, cargo, is_adm, avatar} = user;

    return res.json({
      user:{
        id,
        nome,
        sobrenome,
        email,
        codigo_cigam,
        is_sales,
        cargo,
        is_adm,
        avatar

      },
      token: _jsonwebtoken2.default.sign({ id }, process.env.JWT_KEY, {
       expiresIn: process.env.JWT_EXPIRES,
    }),
  });
  }

  async verify(req, res){
    const authHeader = req.headers.authorization;
    if(!authHeader){
      return res.status(401).json ({error: 'token not provide.'});
    }

    const [, token] = authHeader.split(' ');
    try
    {
      const decoded = await _util.promisify.call(void 0, _jsonwebtoken2.default.verify)(token, process.env.JWT_KEY);
      req.idUsuario = decoded.id;
      res.status(200).json({message: "Valid Token"});

    }
    catch(err)
    {
      return res.status(401).json({error:'Invalid Token.'});
    }
  }
}

exports. default = new SessionController();
