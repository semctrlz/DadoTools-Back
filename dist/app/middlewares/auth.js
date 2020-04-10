"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _jsonwebtoken = require('jsonwebtoken'); var _jsonwebtoken2 = _interopRequireDefault(_jsonwebtoken);
var _util = require('util');


exports. default = async (req, res, next)=>{
  const authHeader = req.headers.authorization;


  if(!authHeader){
    return res.status(401).json ({error: 'token not provide.'});
  }

  const [, token] = authHeader.split(' ');
  try
  {
    const decoded = await _util.promisify.call(void 0, _jsonwebtoken2.default.verify)(token, process.env.JWT_KEY);
    req.idUsuario = decoded.id;

    return next();
  }
  catch(err)
  {
    return res.status(401).json({error:'Invalid Token.'});
  }

};
