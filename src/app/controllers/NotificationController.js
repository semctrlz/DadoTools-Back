import Notification from '../schemas/Notification';
import jwt from 'jsonwebtoken';
import {promisify} from 'util';


class NotificationController{
  async create(content, userId){
      const document = await Notification.create({
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
      const decoded = await promisify(jwt.verify)(token, process.env.JWT_KEY);
      const notifications = await Notification.find(
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
    const notification = await Notification.findByIdAndUpdate(
      req.params.id,
      {read: true},
      {new:true}
    );

    return res.json(notification);
  }

}

export default new NotificationController();
