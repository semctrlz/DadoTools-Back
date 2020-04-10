"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _User = require('../models/User'); var _User2 = _interopRequireDefault(_User);
var _File = require('../models/File'); var _File2 = _interopRequireDefault(_File);

class SalesController {
  async index(req, res){
    const sales = await _User2.default.findAll({
      where: {is_sales: true},
      attributes: [
          'id',
          'nome',
          'sobrenome',
          'email',
          'codigo_cigam'
        ],
        include: [
          {
            model: _File2.default, as: 'avatar',
            attributes: ['id','nome','path','url']

          }
        ]
      }
    )
    return res.json(sales);
  }

}

exports. default = new SalesController()
