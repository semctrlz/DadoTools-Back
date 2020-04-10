"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _Notification = require('../schemas/Notification'); var _Notification2 = _interopRequireDefault(_Notification);
var _jsonwebtoken = require('jsonwebtoken'); var _jsonwebtoken2 = _interopRequireDefault(_jsonwebtoken);
var _util = require('util');


class NotificationController{
  async create(content, userId){
      const document = await _Notification2.default.create({
        content: content,
        user: userId
      })

      return document;
  }

  async index(req, res){

    const authHeader = req.headers.authorization;
    if(!authHeader){
      return res.status(401).json ({error: 'token not provide.'});
    }

    const [, token] = authHeader.split(' ');
    try
    {
      const decoded = await _util.promisify.call(void 0, _jsonwebtoken2.default.verify)(token, process.env.JWT_KEY);
      const notifications = await _Notification2.default.find(
        {
          user: decoded.id,
        }
        ).sort({
          createdAt: 'desc'
        }).limit(20);

        return res.json(notifications);
      }
      catch(err)
      {
        console.log(err);
        return res.status(401).json({error:'Invalid Token.'});
      }

  }

  async update(req, res){
  // const notification = await Notification.findById(req.params.id);
    const notification = await _Notification2.default.findByIdAndUpdate(
      req.params.id,
      {read: true},
      {new:true}
    );

    return res.json(notification);
  }

}

exports. default = new NotificationController();
